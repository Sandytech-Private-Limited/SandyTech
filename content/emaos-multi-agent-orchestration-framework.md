---
title: "EMAOS: Building a Multi-Agent Orchestration System for Enterprise AI"
slug: emaos-multi-agent-orchestration-framework
description: kothapallisandeep introduces EMAOS — the Event-driven Multi-Agent Orchestration System built for enterprise AI workloads. Learn how agent roles (planner, executor, critic, memory), Azure Event Hubs messaging, and per-agent state management solve problems that single-LLM approaches cannot handle at scale. My AI products are powered by EMAOS.
imageUrl: https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
category: AI
date: 2025-01-20
readTime: 13 min read
keywords: ["kothapallisandeep", "sandeepkothapalli", "EMAOS", "multi-agent AI", "LLM orchestration", "Azure Event Hubs", "agent framework", "AutoGen", "CrewAI", "enterprise AI", "AI automation", "planner executor critic", "agentic systems"]
hashtags: ["#MultiAgentAI", "#LLM", "#EMAOS", "#AzureEventHubs", "#AIOrchestration", "#KothapalliSandeep", "#AutoGen", "#CrewAI", "#EnterpriseAI"]
---

# EMAOS: Building a Multi-Agent Orchestration System for Enterprise AI

Single-agent LLM systems hit a ceiling fast. I found this out the hard way while building an AI-powered document processing pipeline for a financial services client. The task: ingest unstructured documents, extract structured data, validate it against business rules, flag anomalies, and produce a final report — all autonomously. A single GPT-4o prompt with a complex system message worked in demos. It collapsed at scale.

EMAOS — the **Event-driven Multi-Agent Orchestration System** — is the framework I built to solve this class of problem. It now powers several of my products.

---

## Why Single-LLM Falls Apart at Scale

Before getting into the architecture, it is worth understanding the specific failure modes:

**Context window exhaustion.** A complex workflow accumulates context fast. By step 8 of a 12-step pipeline, you are feeding the LLM thousands of tokens of history. Quality degrades, costs spike, and you start losing early context due to attention dilution.

**Monolithic failure.** A single agent either completes the task or it does not. There is no opportunity for specialisation, retry, or partial recovery. One bad tool call can derail the entire workflow.

**No separation of concerns.** Asking one LLM to simultaneously plan, execute, critique, and remember is like asking a single employee to be simultaneously your strategist, analyst, QA team, and institutional memory. People do not work that way. Neither do LLMs.

**Cost control is impossible.** With a single agent, you use your most capable (expensive) model for everything, including tasks that a GPT-3.5-tier model could handle perfectly well.

---

## EMAOS Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ EMAOS Orchestrator │
│ │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│ │ Planner │ │ Executor │ │ Critic │ │ Memory │ │
│ │ Agent │ │ Agent │ │ Agent │ │ Agent │ │
│ └────┬─────┘ └────┬─────┘ └────┬─────┘ └───┬────┘ │
│ │ │ │ │ │
│ ─────┴───────────────┴───────────────┴─────────────┴────── │
│ Azure Event Hubs (Message Bus) │
└─────────────────────────────────────────────────────────────┘
 │
 ┌─────────┴─────────┐
 │ State Store │
 │ (Redis / CosmosDB)│
 └───────────────────┘
```

Each agent is a stateless, independently deployable process. They communicate exclusively through the message bus. No agent calls another agent directly.

---

## Agent Roles

### Planner Agent

The Planner is the only agent that sees the high-level task description. It uses a capable model (GPT-4o) to decompose the task into a **Directed Acyclic Graph (DAG)** of subtasks:

```json
{
 "task_id": "task-abc123",
 "steps": [
 { "step_id": "s1", "type": "extract", "depends_on": [], "input": "raw_document" },
 { "step_id": "s2", "type": "validate", "depends_on": ["s1"], "input": "s1.output" },
 { "step_id": "s3", "type": "enrich", "depends_on": ["s2"], "input": "s2.output" },
 { "step_id": "s4", "type": "critique", "depends_on": ["s3"], "input": "s3.output" },
 { "step_id": "s5", "type": "report", "depends_on": ["s4"], "input": "s4.output" }
 ]
}
```

The Planner publishes this plan to the `task.planned` topic on Event Hubs and terminates. It does not supervise execution.

### Executor Agent

The Executor subscribes to `task.planned` and `step.ready` events. It picks up executable steps (those whose dependencies are all resolved), runs them using a tool-calling LLM, and publishes results to `step.completed` or `step.failed`.

The Executor uses lighter-weight models where possible. For a "validate structured data against schema" step, GPT-4o-mini is sufficient. The model selection is specified in the plan by the Planner.

```python
class ExecutorAgent:
 async def handle_step_ready(self, event: StepReadyEvent):
 step = await self.state_store.get_step(event.step_id)
 model = step.metadata.get("model", "gpt-4o-mini")

 result = await self.llm_client.complete(
 model=model,
 messages=self.build_messages(step),
 tools=self.get_tools_for_step_type(step.type),
 )

 if result.finish_reason == "tool_calls":
 tool_result = await self.execute_tool_calls(result.tool_calls)
 await self.publish("step.completed", {
 "step_id": step.id,
 "output": tool_result,
 })
 else:
 await self.publish("step.failed", {
 "step_id": step.id,
 "error": "unexpected_finish_reason",
 })
```

### Critic Agent

After each Executor output, the Critic Agent evaluates quality. This is the step most frameworks skip, and it is the one that makes EMAOS reliable in production.

The Critic uses a rubric defined at task-creation time. For a document extraction task, the rubric might check: "Are all required fields present? Are numeric fields within expected ranges? Does the extracted data match the source document?"

If the Critic scores the output below threshold, it publishes a `step.rejected` event with specific feedback. The Executor picks this up and retries with the feedback appended as context — a targeted self-correction loop rather than a full task restart.

```python
class CriticAgent:
 async def handle_step_completed(self, event: StepCompletedEvent):
 step = await self.state_store.get_step(event.step_id)
 rubric = await self.state_store.get_rubric(step.task_id, step.type)

 evaluation = await self.evaluate(step.output, rubric)

 if evaluation.score >= rubric.threshold:
 await self.publish("step.approved", {"step_id": step.id})
 else:
 await self.publish("step.rejected", {
 "step_id": step.id,
 "feedback": evaluation.feedback,
 "retry_count": step.retry_count + 1,
 })
```

The Critic is the most expensive agent to run because it needs a capable model — you cannot have a weak model assess a strong one effectively. We accept this cost because it dramatically reduces the failure rate at the task level.

### Memory Agent

The Memory Agent maintains a persistent, task-scoped context store. Rather than passing growing context arrays between agents (which is what AutoGen and CrewAI do by default), agents query the Memory Agent for relevant context.

Memory is structured in three tiers:
- **Working memory**: current task state and step outputs (Redis, TTL 24h)
- **Episodic memory**: summaries of past task runs for similar task types (Cosmos DB, vector indexed)
- **Semantic memory**: domain knowledge injected at workflow start (e.g., validation rules, business logic)

When the Executor starts a step, it queries Memory for "what do I need to know to complete this step type?" rather than being fed the full history. This keeps token counts predictable.

---

## Azure Event Hubs as the Message Bus

We chose Azure Event Hubs over Service Bus for EMAOS for several reasons:
- **Consumer groups**: each agent type has its own consumer group — they all see all events but process the ones relevant to them
- **Event replay**: failed agents can rewind and reprocess without the source re-publishing
- **Throughput**: Event Hubs handles 1M+ events/sec; even the most complex workflows are nowhere near this limit
- **Capture**: native integration to Azure Blob Storage for audit logs

```python
# Publishing an event
producer = EventHubProducerClient.from_connection_string(
 conn_str=os.environ["EVENT_HUB_CONNECTION_STRING"],
 eventhub_name="emaos-events"
)

async def publish(event_type: str, payload: dict):
 event_data = EventData(json.dumps({
 "type": event_type,
 "timestamp": datetime.utcnow().isoformat(),
 "payload": payload,
 }))
 event_data.properties = {"event_type": event_type}

 async with producer:
 batch = await producer.create_batch()
 batch.add(event_data)
 await producer.send_batch(batch)
```

---

## EMAOS vs. AutoGen and CrewAI

| Aspect | EMAOS | AutoGen | CrewAI |
|---|---|---|---|
| Agent communication | Event bus (async) | Direct function calls (sync) | Sequential/hierarchical (sync) |
| State management | External store, per-agent | In-memory, shared | In-memory, shared |
| Failure isolation | Per-step retry, critic | Agent-level | Task-level |
| Model selection | Per-step in plan | Per-agent | Per-agent |
| Scalability | Horizontally scalable | Single process | Single process |
| Observability | Event log is the audit trail | Conversation log | Conversation log |

AutoGen and CrewAI are excellent for prototype-scale agentic tasks. EMAOS is designed for production workloads where you need audit trails, cost control, horizontal scaling, and graceful degradation.

---

## Where EMAOS Is Used Today

EMAOS powers:

- **360JobReady**: resume analysis, job matching, gap analysis, and personalised coaching plan generation — all as an EMAOS workflow triggered per candidate
- **Affixx**: multi-step affiliate campaign creation — Planner decomposes campaign brief, Executor agents generate copy/creatives/targeting parameters, Critic validates against brand guidelines

If you are building an AI product where a single ChatCompletion call is no longer enough, EMAOS-style thinking is the path forward.
