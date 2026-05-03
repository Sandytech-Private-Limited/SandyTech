---
title: "5 RAG Pipeline Mistakes I Made in Production (And How to Fix Them)"
slug: rag-pipeline-production-mistakes
description: Real lessons from building RAG pipelines for enterprise clients — five production mistakes covering chunking, metadata filtering, embedding model mismatch, re-ranking, and LLM trust. By Sandeep Kothapalli, SandyTech.
imageUrl: https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
category: AI
date: 2026-02-18
readTime: 11 min read
keywords: ["kothapallisandeep", "sandeepkothapalli", "sandytech", "sandytech org", "RAG pipeline", "retrieval augmented generation", "LLM production", "vector search", "embeddings", "re-ranking", "AI engineering", "enterprise AI"]
hashtags: ["#RAG", "#LLM", "#AIEngineering", "#VectorSearch", "#ArtificialIntelligence", "#SandyTech", "#KothapalliSandeep", "#GenerativeAI"]
---

# 5 RAG Pipeline Mistakes I Made in Production (And How to Fix Them)

RAG looks simple in a tutorial. You chunk some documents, embed them, store them in a vector database, and at query time you retrieve the top-k chunks and stuff them into a prompt. The demo works. The investor is impressed. Then you put it in front of real users with real documents, and the cracks appear fast.

I've built RAG pipelines for several enterprise clients — internal knowledge bases, policy document Q&A, contract analysis tools. The same class of mistakes keeps showing up. Here are the five I've personally shipped into production, what went wrong, and how I fixed them.

## Mistake 1: Naive Chunking Destroying Context

**Symptom**: The retrieval looks right — the retrieved chunk contains words that match the query — but the generated answer is incomplete, misleading, or missing crucial qualifications.

**Root cause**: I chunked by a fixed token count (512 tokens, a common default) without regard for semantic boundaries. A legal clause would get split mid-sentence. A table would get fragmented across chunks. A bullet list referencing definitions from three paragraphs earlier would be retrieved without those definitions.

The retrieval metrics looked fine because the keyword overlap was high. The *answer quality* was the thing that was wrong, and that's harder to detect automatically.

**Fix**: Implement semantic chunking. Use a sentence splitter, then merge sentences into chunks respecting natural document structure — paragraphs, sections, list groups. For structured documents (PDFs with headings), chunk by section and include the section heading in every chunk as a prefix:

```python
def chunk_with_context(text: str, section_title: str, max_tokens: int = 400) -> list[str]:
    sentences = sent_tokenize(text)
    chunks = []
    current = f"[Section: {section_title}]\n"
    
    for sentence in sentences:
        if count_tokens(current + sentence) > max_tokens:
            if current.strip():
                chunks.append(current.strip())
            current = f"[Section: {section_title}]\n{sentence} "
        else:
            current += sentence + " "
    
    if current.strip():
        chunks.append(current.strip())
    
    return chunks
```

Also implement a "parent chunk" strategy: store small chunks for retrieval precision, but return the full parent section to the LLM. The child chunk finds the right place; the parent provides the full context.

## Mistake 2: Not Filtering by Metadata Before Vector Search

**Symptom**: Users searching for "Q3 2025 expense policy" get results from the 2022 policy. Users searching for UK-specific procedures get US procedures.

**Root cause**: I was doing pure vector search across the entire index. Vector similarity is good at topical relevance but oblivious to metadata like document date, jurisdiction, department, or access level.

**Fix**: Store rich metadata at index time and apply pre-filtering before the vector search. Every major vector database supports this:

```python
# Azure AI Search pre-filter example
results = search_client.search(
    search_text=None,
    vector_queries=[
        VectorizedQuery(
            vector=query_embedding,
            k_nearest_neighbors=10,
            fields="contentVector"
        )
    ],
    filter="jurisdiction eq 'UK' and year ge 2024 and department eq 'Finance'",
    top=5
)
```

The filter runs first, reducing the candidate set, then vector similarity ranks within that set. Pre-filtering on high-cardinality metadata (year, category, tenant ID in multi-tenant systems) can improve answer accuracy dramatically while also reducing cost — you're ranking fewer vectors.

## Mistake 3: Embedding Model Mismatch Between Index and Query

**Symptom**: Retrieval quality degrades suddenly after what seemed like an innocuous update. The right chunks are clearly in the index, but they're not being retrieved.

**Root cause**: I updated the embedding model for new ingestion without re-indexing existing documents. `text-embedding-ada-002` and `text-embedding-3-small` produce vectors in different dimensional spaces with different distance geometries. Comparing a query vector from model B against document vectors from model A produces meaningless similarity scores.

This is a silent failure. No error is thrown. Retrieval just gets worse.

**Fix**: Treat the embedding model as part of the index schema. When you change models, re-index everything. In practice:

```python
INDEX_METADATA_KEY = "embedding_model_version"
CURRENT_MODEL = "text-embedding-3-small"

# At index time, store which model was used
metadata = {
    "content": chunk_text,
    "embedding_model_version": CURRENT_MODEL,
    # ... other metadata
}

# At startup, validate the index model matches the query model
def validate_index_integrity(index_client):
    sample = index_client.get_document(key="metadata_doc")
    if sample.get(INDEX_METADATA_KEY) != CURRENT_MODEL:
        raise RuntimeError(
            f"Index uses {sample[INDEX_METADATA_KEY]}, "
            f"application configured for {CURRENT_MODEL}. Re-index required."
        )
```

Blue-green indexing (write to a new index, validate, then swap the alias) is the right operational pattern for model migrations.

## Mistake 4: Ignoring Re-Ranking

**Symptom**: The top retrieved chunk is often the second or third most relevant one. Users notice the answers frequently miss the most directly applicable passage even though it's somewhere in the retrieved set.

**Root cause**: Vector similarity captures semantic closeness but not query-specific relevance. A chunk about "expense approval limits" might score slightly lower than a chunk about "expense categories" for the query "what is the approval limit for travel expenses" — even though the approval limits chunk is clearly the right answer.

**Fix**: Add a cross-encoder re-ranker as a second retrieval stage. Retrieve a broader candidate set (top-20), then re-rank with a cross-encoder that scores each query-chunk pair jointly:

```python
from sentence_transformers import CrossEncoder

reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")

def retrieve_and_rerank(query: str, top_k: int = 5) -> list[dict]:
    # Stage 1: vector retrieval — broad candidate set
    candidates = vector_search(query, top_n=20)
    
    # Stage 2: cross-encoder re-ranking
    pairs = [(query, c["content"]) for c in candidates]
    scores = reranker.predict(pairs)
    
    ranked = sorted(
        zip(candidates, scores),
        key=lambda x: x[1],
        reverse=True
    )
    
    return [item for item, _ in ranked[:top_k]]
```

Cohere's Rerank API and Azure AI Search's semantic ranker are managed alternatives if you don't want to host the model. The quality improvement on enterprise document Q&A is consistently 15-30% on answer relevance scores.

## Mistake 5: Treating the LLM as Infallible

**Symptom**: The system confidently answers questions that are outside the retrieved context, fabricates specific numbers or names, or generates answers that contradict the source documents.

**Root cause**: I was trusting the LLM to stay grounded in the provided context without enforcement. A well-crafted system prompt reduces hallucination, but doesn't eliminate it — especially on vague or ambiguous queries where the retrieved context provides partial information.

**Fix**: Implement a grounding verification layer. After generation, check whether key claims in the answer can be traced back to the retrieved chunks:

```python
SYSTEM_PROMPT = """
You are a document Q&A assistant. Answer ONLY using the provided context.
If the context does not contain enough information to answer confidently,
say: "I don't have enough information in the provided documents to answer this."

At the end of your answer, cite the specific source chunks you used,
in the format [Source: <chunk_id>].
"""

def generate_with_grounding(query: str, chunks: list[dict]) -> dict:
    context = "\n\n---\n\n".join([
        f"[Chunk {i+1}]: {c['content']}" 
        for i, c in enumerate(chunks)
    ])
    
    response = llm.complete(
        system=SYSTEM_PROMPT,
        user=f"Context:\n{context}\n\nQuestion: {query}"
    )
    
    # Check if all cited chunk IDs exist in our retrieved set
    cited_ids = extract_citations(response.text)
    ungrounded = [cid for cid in cited_ids if cid not in valid_chunk_ids(chunks)]
    
    return {
        "answer": response.text,
        "grounded": len(ungrounded) == 0,
        "hallucinated_citations": ungrounded
    }
```

Beyond prompt engineering, set temperature to 0 or near-0 for factual Q&A tasks. Evaluate your pipeline with a held-out test set and track answer faithfulness scores using frameworks like RAGAS — not just user satisfaction.

## The Common Thread

All five mistakes share the same root: I optimised for getting the demo working quickly and didn't think hard enough about the failure modes at the edges. RAG is deceptively easy to build a prototype with and genuinely difficult to make reliable in production. Treat it like any other data pipeline — with schema validation, monitoring, fallback behaviour, and systematic evaluation.
