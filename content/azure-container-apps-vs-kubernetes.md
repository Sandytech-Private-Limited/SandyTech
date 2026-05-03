---
title: "Azure Container Apps vs Kubernetes: When to Use Each for .NET Microservices"
slug: azure-container-apps-vs-kubernetes
description: A practical decision guide for choosing between Azure Container Apps and AKS for .NET microservices — covering cost, autoscaling, Dapr integration, and the trade-offs that actually matter. By Sandeep Kothapalli, SandyTech.
imageUrl: https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
category: Cloud
date: 2026-03-22
readTime: 11 min read
keywords: ["kothapallisandeep", "sandeepkothapalli", "sandytech", "sandytech org", "Azure Container Apps", "AKS", "Kubernetes", ".NET microservices", "KEDA", "autoscaling", "cloud-native", "Azure", "Dapr"]
hashtags: ["#Azure", "#Kubernetes", "#ContainerApps", "#AKS", "#DotNet", "#KEDA", "#SandyTech", "#KothapalliSandeep", "#CloudNative"]
---

# Azure Container Apps vs Kubernetes: When to Use Each for .NET Microservices

One of the most common questions I get from teams starting a new cloud-native project on Azure: "Should we use AKS or Container Apps?" The wrong answer costs real money and engineering time. The right answer depends on factors that most comparison articles gloss over. Let me give you the decision framework I actually use.

## What Azure Container Apps Actually Is

Container Apps is not a lightweight Kubernetes wrapper — it *runs on* Kubernetes under the hood (AKS + KEDA + Envoy + Dapr), but you never touch the cluster. Microsoft manages the control plane, node pools, upgrades, and scaling infrastructure. You deploy container apps. That's it.

This sounds like a step down from AKS, and in some dimensions it is. But for a large class of workloads, it removes 60-80% of the operational surface area that most product teams shouldn't be managing in the first place.

## Cost Comparison at Scale

AKS costs are dominated by the node VMs, not the Kubernetes management fee (which is free on Azure). A baseline three-node cluster with `Standard_D4s_v5` nodes (4 vCPU, 16 GB) runs roughly $500/month before any optional add-ons, load balancers, or storage.

Container Apps bills on actual consumption: vCPU-seconds and GiB-seconds, with a generous free tier (180,000 vCPU-seconds and 360,000 GiB-seconds per month). An app that receives moderate traffic and scales to zero overnight can cost under $50/month for the compute.

The reversal happens at sustained high load. When your containers are running 24/7 at high utilisation, the per-second billing accumulates and reserved VM pricing on AKS becomes cheaper. The crossover point on typical .NET workloads I've observed is around 8-12 containers running continuously — above that, AKS total cost of ownership starts to look attractive again.

## KEDA-Based Autoscaling in Container Apps

Container Apps surfaces KEDA scaling rules directly in the configuration. This is genuinely useful for message-driven architectures:

```yaml
scale:
  minReplicas: 0
  maxReplicas: 20
  rules:
    - name: azure-servicebus-rule
      custom:
        type: azure-servicebus
        metadata:
          queueName: order-processing
          messageCount: "5"
        auth:
          - secretRef: servicebus-connection-string
            triggerParameter: connection
```

This scales your order processor from zero up to 20 replicas based on Service Bus queue depth, with no KEDA installation or ScaledObject CRD management on your part. On AKS you'd configure the same thing, but you're also responsible for keeping KEDA updated and monitoring its health.

## Dapr Sidecar Support in Container Apps

Container Apps has first-class Dapr support — you enable it per-app with a few configuration fields, and Microsoft manages the sidecar injection and component configuration:

```json
{
  "dapr": {
    "enabled": true,
    "appId": "order-service",
    "appPort": 80,
    "components": [
      {
        "name": "statestore",
        "type": "state.azure.cosmosdb"
      }
    ]
  }
}
```

On AKS, you'd install the Dapr operator, manage Dapr component YAML manifests, handle upgrades, and monitor the sidecar separately. Container Apps removes all of that. For teams building Dapr-based architectures (as we often do at SandyTech), this is a meaningful time saving.

## Revision Management

Container Apps has a revision model built in. Every deployment creates a new revision, and you can split traffic between revisions:

```
az containerapp ingress traffic set \
  --name order-service \
  --resource-group my-rg \
  --revision-weight latest=20 order-service--old-revision=80
```

This makes canary deployments and blue-green rollouts trivial without any additional tooling. On AKS you'd reach for Flagger, Argo Rollouts, or manual service weight manipulation.

## When AKS Wins

There are legitimate reasons to choose AKS. Here's when I recommend it:

**Custom networking requirements.** If you need CNI plugins beyond Kubenet/Azure CNI, custom NetworkPolicies, or integration with on-premises networks via ExpressRoute with fine-grained routing — Container Apps doesn't expose that control.

**GPU workloads.** ML inference pipelines that need N-series GPU nodes require AKS. Container Apps has no GPU support.

**Privileged containers or DaemonSets.** Security tooling, log shippers with host access, or device plugins need direct node access. Not possible in Container Apps.

**Multi-tenant SaaS with strict isolation.** If you need namespace-level isolation between tenants with separate quotas and RBAC — the full Kubernetes object model gives you that. Container Apps environments provide some isolation but not the same depth.

**Long-running, high-throughput services where cost predictability matters.** Reserved instances on AKS can significantly reduce costs for predictable workloads.

## When Container Apps Wins

**Fast-moving product teams without dedicated platform engineers.** No one on the team should be debugging `kubelet` logs or managing etcd backups. Container Apps lets developers ship.

**Cost-first startups with spiky traffic.** Scale-to-zero means you pay nothing overnight. For early-stage products, this can cut cloud bills by 50-70%.

**Dapr-native architectures.** The first-class Dapr integration removes a full operational domain.

**Event-driven workers and background processors.** KEDA scaling rules make Container Apps a natural fit for queue consumers, webhook processors, and scheduled jobs.

## Decision Matrix

| Factor | Container Apps | AKS |
|---|---|---|
| Operational overhead | Low | High |
| Cost at low/spiky load | Lower | Higher |
| Cost at high sustained load | Higher | Lower |
| Dapr integration | First-class | Manual |
| KEDA autoscaling | Built-in | Manual install |
| Custom networking | Limited | Full |
| GPU support | No | Yes |
| Time to first deployment | Minutes | Hours/days |
| Canary deployments | Built-in revisions | External tooling |

## What We Use at SandyTech

For our own products and most client MVPs, Container Apps is the default. NexusEd's backend services run on Container Apps — the scale-to-zero behaviour handles off-peak hours automatically, and the Dapr integration aligns with our architecture. We move to AKS recommendations when a client has existing Kubernetes expertise on their team, or when the workload profile clearly crosses the cost crossover point.

The honest answer is: Container Apps is the right default for 70% of cloud-native .NET workloads today. The remaining 30% have specific requirements that justify the operational complexity of AKS.
