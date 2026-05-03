---
title: "Cutting LLM Costs by 70%: Caching, Batching, and Model Routing in Production"
slug: ai-cost-optimisation-llm-production
description: Practical strategies for reducing LLM API costs in production — semantic caching, prompt compression, GPT-4o vs GPT-4o-mini routing, batching, and Azure OpenAI reserved capacity. Real cost breakdowns from SandyTech client projects. By Sandeep Kothapalli.
imageUrl: https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
category: AI
date: 2026-02-05
readTime: 11 min read
keywords: ["kothapallisandeep", "sandeepkothapalli", "sandytech", "sandytech org", "LLM cost optimization", "GPT-4o", "semantic caching", "Azure OpenAI", "prompt compression", "model routing", "AI production", "LLM engineering"]
hashtags: ["#LLM", "#AIEngineering", "#GPT4o", "#AzureOpenAI", "#CostOptimization", "#SandyTech", "#KothapalliSandeep", "#GenerativeAI"]
---

# Cutting LLM Costs by 70%: Caching, Batching, and Model Routing in Production

LLM API costs have a way of sneaking up on you. A prototype that costs $30/month in development turns into an $800/month production bill as user count grows, and that's before you've added any sophisticated features. I went through this with a client last year — an enterprise knowledge base product that was billing almost $1,200/month on GPT-4o before we optimised it. After three weeks of targeted work, the bill was under $340/month with no degradation in answer quality. Here's exactly what we did.

## Starting Point: Understand Where the Tokens Are Going

Before optimising anything, instrument your costs. Azure OpenAI's token usage is logged per request. Group it by operation type:

```csharp
public class TokenUsageMiddleware
{
    private readonly IMetricsCollector _metrics;
    
    public async Task<ChatCompletion> CompleteAsync(
        string operation,
        ChatCompletionRequest request)
    {
        var response = await _openAiClient.GetChatCompletionAsync(request);
        
        _metrics.Record("llm.tokens.prompt", 
            response.Usage.PromptTokens,
            tags: new { operation });
        _metrics.Record("llm.tokens.completion", 
            response.Usage.CompletionTokens,
            tags: new { operation });
        _metrics.Record("llm.cost.estimated",
            EstimateCost(response.Usage, request.Model),
            tags: new { operation });
            
        return response;
    }
}
```

In the client's case, 60% of token spend was on three high-volume operations: document summarisation (called on every view), FAQ Q&A (same 200 questions asked thousands of times), and a "chat with document" feature with very long system prompts.

## Strategy 1: Semantic Caching

The FAQ Q&A pattern was the easiest win. Users were asking semantically identical questions with slightly different phrasing: "How do I reset my password?" and "What's the process to reset my password?" both hit GPT-4o and paid full price each time.

Semantic caching works by embedding the incoming query, checking for a similar cached query (by cosine similarity above a threshold), and returning the cached response if found:

```python
import numpy as np
from redis import Redis
import json

redis = Redis.from_url(os.environ["REDIS_URL"])
SIMILARITY_THRESHOLD = 0.92  # tune this — higher = stricter matching

async def semantic_cache_lookup(query: str, namespace: str) -> str | None:
    query_embedding = await get_embedding(query)
    
    # Fetch all cached entries for this namespace
    cached_keys = redis.keys(f"semantic:{namespace}:*")
    
    best_score = 0.0
    best_response = None
    
    for key in cached_keys:
        entry = json.loads(redis.get(key))
        cached_embedding = np.array(entry["embedding"])
        similarity = cosine_similarity(query_embedding, cached_embedding)
        
        if similarity > best_score:
            best_score = similarity
            best_response = entry["response"]
    
    if best_score >= SIMILARITY_THRESHOLD:
        return best_response
    return None

async def answer_with_cache(query: str) -> str:
    cached = await semantic_cache_lookup(query, namespace="faq")
    if cached:
        return cached
    
    response = await llm.complete(query)
    
    # Store for future lookups
    embedding = await get_embedding(query)
    redis.setex(
        f"semantic:faq:{hash(query)}",
        86400,  # 24 hour TTL
        json.dumps({"embedding": embedding.tolist(), "response": response})
    )
    
    return response
```

The 0.92 threshold was calibrated by manually reviewing 50 query pairs. Below 0.90 you start returning wrong cached answers; above 0.95 you miss too many semantically-identical queries. The right number depends on your domain and user population.

**Impact on the client project**: FAQ Q&A cost dropped 68%. About 74% of incoming queries were returning cached responses within two weeks.

## Strategy 2: Model Routing by Query Complexity

Not every query needs GPT-4o. A query asking "what is the return policy?" needs factual retrieval, not reasoning. A query asking "compare our enterprise plan to the competitor's offering and explain the pricing trade-offs for a startup" needs reasoning capability.

We built a lightweight complexity classifier that routes queries to GPT-4o-mini vs GPT-4o:

```python
ROUTING_PROMPT = """
Classify this query as SIMPLE or COMPLEX.

SIMPLE: factual lookups, yes/no questions, single-step retrievals, 
       definitions, date/number lookups
COMPLEX: multi-step reasoning, comparisons, synthesis across multiple 
         documents, strategic questions, ambiguous intent

Query: {query}

Respond with only: SIMPLE or COMPLEX
"""

async def route_query(query: str) -> str:
    # Use a very cheap model for the routing decision itself
    classification = await openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": ROUTING_PROMPT.format(query=query)}],
        max_tokens=5,
        temperature=0
    )
    
    label = classification.choices[0].message.content.strip()
    return "gpt-4o" if label == "COMPLEX" else "gpt-4o-mini"
```

The routing call itself costs ~$0.000015 (15 input tokens + 1 output token on mini). GPT-4o-mini is roughly 15x cheaper than GPT-4o on output tokens. If 65% of queries are correctly classified as SIMPLE, the blended cost drops significantly.

**Measured accuracy**: 89% routing accuracy on our test set. The 11% misclassification split roughly evenly between over-routing (mini handles it well anyway) and under-routing (GPT-4o handles it, just costs more). Acceptable in both directions.

## Strategy 3: Prompt Compression

The "chat with document" feature had a system prompt that included the full company context, product catalogue, and instructions — 3,200 tokens on every request. Most of it was boilerplate.

Two techniques work here:

**Remove redundancy**: Audit your prompts for repeated instructions and verbose examples that could be tightened. "You are a helpful assistant. Your job is to help users. Be helpful at all times." is 18 tokens of noise.

**Use `LLMLingua` or similar compression**: LLMLingua is an open-source prompt compression library from Microsoft Research. It uses a small language model to identify and remove low-perplexity tokens (tokens the large model can infer) while preserving semantic meaning:

```python
from llmlingua import PromptCompressor

compressor = PromptCompressor(
    model_name="microsoft/llmlingua-2-bert-base-multilingual-cased-meetingbank",
    device_map="cpu"
)

compressed = compressor.compress_prompt(
    context_list=[long_document_context],
    instruction="Answer questions about the provided document.",
    question=user_query,
    target_token=800,  # compress to ~800 tokens
    condition_compare=True
)

# compressed["compressed_prompt"] is ready to use
```

We compressed the document context from an average of 2,800 tokens to 900 tokens with less than 3% accuracy degradation on our Q&A test set.

## Strategy 4: Async Batching for Background Jobs

Document summarisation ran on every document view — synchronously, per user. This was completely unnecessary. Summaries are deterministic and change only when the document changes.

We moved summarisation to an async background job with deduplication:

```csharp
// Queue summarisation on document upload/update only
public async Task QueueDocumentSummarisation(string documentId)
{
    var jobId = $"summarise:{documentId}";
    
    // Idempotent — don't re-queue if already pending
    if (!await _jobQueue.ExistsAsync(jobId))
    {
        await _jobQueue.EnqueueAsync(new SummariseDocumentJob 
        { 
            DocumentId = documentId,
            JobId = jobId
        });
    }
}
```

Summaries are computed once, cached in the database, and served from there. Summarisation cost went from per-view to per-document-change — roughly a 95% reduction on that operation.

## Azure OpenAI Reserved Capacity

For stable, predictable workloads, Azure OpenAI's Provisioned Throughput Units (PTUs) offer significant savings. PTUs provide a committed tokens-per-minute throughput with no per-token billing.

At ~10 million tokens/month on GPT-4o, pay-as-you-go at $15/1M input tokens + $60/1M output tokens runs roughly $600-900/month depending on the input/output mix. A PTU commitment covers similar throughput for significantly less, typically 30-50% savings, with the trade-off of a committed spend even in low-traffic periods.

PTUs make sense once you've done all the caching and routing optimisation first — there's no point committing capacity to tokens you should be eliminating.

## Before and After

The client's cost breakdown before and after the three-week optimisation sprint:

| Component | Before | After |
|---|---|---|
| FAQ Q&A (semantic cache) | $420/month | $135/month |
| Document summarisation (async) | $280/month | $14/month |
| Chat with document (compression + routing) | $390/month | $155/month |
| **Total** | **$1,090/month** | **$304/month** |

72% reduction. Answer quality measured by user satisfaction rating stayed flat. The semantic cache hit rate was the biggest single lever.

## Monitoring in Production

Don't set this up and forget it. Cache hit rates drift as user query patterns change. Model routing accuracy should be spot-checked monthly. Set up Azure Monitor alerts on token spend per operation so cost spikes are visible immediately rather than at invoice time.

The tooling investment is a few hours. The return is a cloud bill that doesn't surprise you.
