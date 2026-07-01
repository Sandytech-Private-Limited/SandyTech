---
title: "WebRTC at Scale: Hard Lessons from Building NexusEd's Live Classroom Infrastructure"
slug: webrtc-scaling-lessons-nexused
description: Real lessons from building NexusEd's live classroom system — why P2P mesh fails, mediasoup SFU architecture, TURN server costs, simulcast, debugging black screens, and running 50-participant rooms in production. By Sandeep Kothapalli,.
imageUrl: https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
category: Architecture
date: 2026-01-25
readTime: 12 min read
keywords: ["kothapallisandeep", "sandeepkothapalli", "WebRTC", "mediasoup", "SFU", "NexusEd", "live classroom", "video streaming", "TURN server", "simulcast", "real-time video", "coturn"]
hashtags: ["#WebRTC", "#mediasoup", "#RealTime", "#NexusEd", "#VideoStreaming", "#KothapalliSandeep", "#LiveClassroom"]
---

# WebRTC at Scale: Hard Lessons from Building NexusEd's Live Classroom Infrastructure

When I started building NexusEd's live classroom feature, I made the same mistake most teams make: I started with the simplest WebRTC architecture and assumed I'd scale it later. P2P mesh worked beautifully in development with two browsers on my laptop. It worked acceptably in testing with four participants. It collapsed completely at eight. By the time we hit production load, I'd already spent three weeks rebuilding on a proper SFU architecture.

Here's everything I learned, in the order I learned it.

## Why P2P Mesh Fails at Scale

In a P2P mesh, every participant connects directly to every other participant. Each connection is a full-duplex video/audio stream. The bandwidth cost grows as O(n²):

- 2 participants: 2 streams per person (1 upload, 1 download)
- 4 participants: 6 streams per person (3 upload, 3 download)
- 8 participants: 28 streams total, 7 per person
- 20 participants: 380 streams total

At 4 participants on a typical 720p classroom stream (~1 Mbps per stream), each participant is uploading 3 Mbps and downloading 3 Mbps simultaneously. That's already at the ceiling of many home broadband upload connections.

At 8 participants, the upload requirement per person hits 7 Mbps. Connection quality becomes lottery-based — whoever has the worst upload connection degrades the experience for everyone else. CPU load from encoding/decoding multiple streams simultaneously spikes, especially on mobile. The UX falls apart.

Mesh is fine for exactly two participants (video calls). Beyond that, you need a media server.

## Mediasoup SFU Architecture

A Selective Forwarding Unit (SFU) is a server that receives media streams from participants and forwards them to other participants. Each participant uploads once to the server; the server handles distribution. Upload cost is O(1) per participant; download cost is O(n-1) per participant (you receive everyone else's stream from the server).

We chose mediasoup — an open-source Node.js/C++ SFU. It's the highest-performance open-source WebRTC server available, and it operates at the media packet level without transcoding (forwarding, not re-encoding), which keeps CPU requirements low.

The architecture for NexusEd:

```
Browser A ──publish──▶ mediasoup Router ──forward──▶ Browser B
Browser B ──publish──▶ mediasoup Router ──forward──▶ Browser A
Browser C ──publish──▶ mediasoup Router ──forward──▶ Browsers A, B
```

Each room is a mediasoup `Router`. Participants create `Producer` objects (their outbound streams) and `Consumer` objects (each inbound stream they want to receive). The signalling layer (we use Socket.io) coordinates the negotiation:

```typescript
// Server-side: create a consumer for a participant
async function createConsumer(
 router: Router,
 producerId: string,
 consumerTransport: WebRtcTransport,
 rtpCapabilities: RtpCapabilities
): Promise<Consumer> {
 if (!router.canConsume({ producerId, rtpCapabilities })) {
 throw new Error('Cannot consume this producer');
 }
 
 const consumer = await consumerTransport.consume({
 producerId,
 rtpCapabilities,
 paused: true // start paused, resume after client ACK
 });

 // Resume only after client confirms it's ready
 consumer.on('transportclose', () => consumer.close());
 
 return consumer;
}
```

Starting consumers paused and resuming only after client acknowledgement prevents packet loss during the initial negotiation phase — a subtle detail that eliminated a class of "black screen on join" bugs we were seeing.

## TURN Server Cost at Scale

WebRTC uses ICE (Interactive Connectivity Establishment) to negotiate the best network path between participants and the server. In most cases, a direct connection works. In corporate networks with strict firewalls, symmetric NAT environments, or mobile networks with CGNAT, a TURN (Traversal Using Relays around NAT) server is required — it relays the media packets through a publicly-accessible server.

TURN server traffic adds up fast. A 20-participant room with 50% of participants requiring TURN relay, at 1 Mbps per stream, is 10 Mbps of relayed traffic sustained for the duration of the session.

We run coturn on Azure VMs. An `F4s_v2` (4 vCPU, 8 GB RAM) handles our current peak load. The VM cost is ~$140/month. The bandwidth cost is the bigger variable — Azure's egress pricing applies to TURN relay traffic. At peak load we see roughly 200-400 GB of TURN-relayed data per month, adding $15-30 in bandwidth costs.

For early-stage deployment, a single coturn instance is sufficient. Configure it with long-term credentials (not shared secret mode) for better security:

```conf
# /etc/turnserver.conf
realm=nexused.net
server-name=turn.nexused.net

# Use SSL
cert=/etc/ssl/turn/cert.pem
pkey=/etc/ssl/turn/key.pem

# Long-term credentials
lt-cred-mech
user=turn-user:your-strong-password

# Limit relay to your media server's IP range
allowed-peer-ip=10.0.0.0-10.0.255.255

no-multicast-peers
fingerprint
```

One important operational detail: TURN credentials should be short-lived and generated per session. Permanent credentials that leak can turn your TURN server into a free relay for any traffic. We generate session-scoped credentials (15-minute TTL) on the signalling server and pass them to the client.

## ICE Candidate Trickling

Early implementations used the "complete ICE gathering" approach — wait for all ICE candidates to be gathered before starting connection negotiation. On mobile networks, this could add 2-4 seconds to join time.

Trickle ICE sends candidates as they're discovered, allowing connection attempts to start immediately:

```typescript
// Client-side: send candidates as they're discovered
peerConnection.onicecandidate = (event) => {
 if (event.candidate) {
 socket.emit('ice-candidate', {
 roomId,
 candidate: event.candidate.toJSON()
 });
 }
};

// Server-side: forward candidates to the transport
socket.on('ice-candidate', async ({ roomId, candidate }) => {
 const transport = getTransportForSocket(socket.id, roomId);
 await transport.addIceCandidate(candidate);
});
```

After enabling trickle ICE, our median time-to-first-video in new rooms dropped from 3.2s to 0.9s.

## Simulcast for Bandwidth Adaptation

Simulcast allows a participant to send multiple resolutions of their video simultaneously (e.g., 1080p, 360p, 180p). The SFU forwards the appropriate resolution to each consumer based on their available bandwidth and screen size.

This is critical for mixed-device rooms. A teacher's desktop should receive full-resolution video from other speakers. Students joining on mobile with limited bandwidth should receive the low-resolution layer automatically.

Mediasoup simulcast configuration on the client:

```typescript
const videoProducer = await sendTransport.produce({
 track: videoTrack,
 encodings: [
 { maxBitrate: 100_000, scaleResolutionDownBy: 4 }, // 180p
 { maxBitrate: 300_000, scaleResolutionDownBy: 2 }, // 360p 
 { maxBitrate: 900_000, scaleResolutionDownBy: 1 } // 720p
 ],
 codecOptions: {
 videoGoogleStartBitrate: 1000
 }
});
```

The SFU monitors consumer bandwidth (via REMB/Transport-CC feedback) and automatically selects which spatial layer to forward. No application logic required.

## Debugging Black Screens and Audio Dropouts

The hardest part of WebRTC isn't building it — it's debugging it.

**Black screens on join**: Almost always one of three causes. (1) Consumer created before the client's `rtpCapabilities` are validated — fix: always check `router.canConsume()` before creating consumers. (2) Consumer not resumed after client ACK — fix: explicit resume flow as described above. (3) Resolution negotiation failure — check the browser console for `RTCError`.

**Audio dropouts**: Usually a packet loss / NACK (Negative Acknowledgement) issue. Check for packet loss in the ICE connection statistics. Sudden dropouts on otherwise stable connections often indicate the ICE candidate pair being re-checked (especially after network changes on mobile). Set `iceRestartPolicy` to trigger ICE restarts on network change events.

**One-way audio**: Invariably an SDP direction mismatch. When one peer sets `sendrecv` and the other sets `recvonly`, the "wrong" direction peer won't send. Log the full SDP exchange during debugging.

## Monitoring with getStats()

The `RTCPeerConnection.getStats()` API exposes everything you need for real-time quality monitoring:

```typescript
async function collectWebRTCStats(pc: RTCPeerConnection): Promise<RoomQualityMetrics> {
 const stats = await pc.getStats();
 const metrics: RoomQualityMetrics = {};

 stats.forEach(report => {
 if (report.type === 'inbound-rtp' && report.kind === 'video') {
 metrics.videoPacketsLost = report.packetsLost;
 metrics.videoJitter = report.jitter;
 metrics.framesDecoded = report.framesDecoded;
 }
 
 if (report.type === 'candidate-pair' && report.state === 'succeeded') {
 metrics.roundTripTime = report.currentRoundTripTime;
 metrics.availableOutgoingBitrate = report.availableOutgoingBitrate;
 }
 });

 return metrics;
}

// Poll every 5 seconds and ship to your telemetry pipeline
setInterval(() => {
 collectWebRTCStats(pc).then(metrics => {
 analytics.track('webrtc.quality', metrics);
 });
}, 5000);
```

We alert when `packetsLost` rate exceeds 5% or `currentRoundTripTime` exceeds 300ms. These thresholds correlate strongly with user-reported quality issues.

## NexusEd's Current Setup

NexusEd currently supports 50-participant rooms: one presenter/teacher and up to 49 student streams visible in the grid. The mediasoup cluster runs on two Azure `F8s_v2` instances (8 vCPU, 16 GB) behind a load balancer, with room affinity ensuring all participants in a room hit the same mediasoup worker. TURN is handled by two coturn instances in active-passive configuration.

At peak, we run 80-100 concurrent rooms. The infrastructure cost for the media layer runs about $320/month. For what it provides — low-latency, high-quality live classroom video at scale — it's one of the better value components in the NexusEd stack.

The learning curve was steep. WebRTC has more sharp edges than most real-time technologies. But once you understand the model — ICE, DTLS, SRTP, simulcast, congestion control — it's extraordinarily powerful for building real-time communication products.
