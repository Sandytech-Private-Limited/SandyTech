---
title: Vector Search and Embeddings for LLM Applications
slug: vector-search-embeddings-llm
description: Deep dive into vector search, embeddings, and how they power modern LLM applications like RAG systems and semantic search. Expert guide from kothapallisandeep on AI automation and.
imageUrl: https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
category: AI
date: 2024-04-15
readTime: 16 min read
keywords: ["kothapallisandeep", "sandeepkothapalli", "AI automation", "Idea to MVP", "vector search", "embeddings", "LLM", "semantic search", "RAG", "vector databases", "Azure OpenAI", "Pinecone"]
hashtags: ["#VectorSearch", "#Embeddings", "#LLM", "#AIAutomation", "#RAG", "#SemanticSearch", "#KothapalliSandeep", "#IdeaToMVP"]
---

# Vector Search and Embeddings for LLM Applications

Vector search and embeddings are fundamental technologies powering modern LLM applications, enabling semantic search, RAG (Retrieval-Augmented Generation), and intelligent document retrieval. This guide explores how these technologies work and how to implement them effectively.

## What are Embeddings?

Embeddings are numerical representations of text (or other data) in a high-dimensional vector space. Similar concepts are positioned close together in this space, enabling semantic similarity search.

### Key Properties

- **Semantic Similarity**: Similar meanings have similar vectors
- **Dimensionality**: Typically 1536 dimensions (OpenAI) or 768 (BERT)
- **Fixed Size**: All embeddings have the same dimensionality
- **Dense Vectors**: Most values are non-zero

## How Embeddings Work

### Text to Vector

```python
from openai import OpenAI

client = OpenAI()

# Generate embedding
text = "Building microservices with .NET"
response = client.embeddings.create(
 model="text-embedding-ada-002",
 input=text
)

embedding = response.data[0].embedding
# Returns a list of 1536 float values
```

### Similarity Calculation

```python
import numpy as np
from numpy.linalg import norm

def cosine_similarity(vec1, vec2):
 """Calculate cosine similarity between two vectors"""
 return np.dot(vec1, vec2) / (norm(vec1) * norm(vec2))

# Example
text1_embedding = get_embedding("microservices architecture")
text2_embedding = get_embedding("distributed systems design")

similarity = cosine_similarity(text1_embedding, text2_embedding)
# High similarity (close to 1.0) indicates similar meaning
```

## Embedding Models

### OpenAI Embeddings

```python
from openai import OpenAI

client = OpenAI()

def get_embedding(text, model="text-embedding-ada-002"):
 text = text.replace("\n", " ")
 return client.embeddings.create(
 input=[text],
 model=model
 ).data[0].embedding
```

### Azure OpenAI Embeddings

```csharp
using Azure;
using Azure.AI.OpenAI;

var client = new OpenAIClient(
 new Uri("https://your-endpoint.openai.azure.com/"),
 new AzureKeyCredential("your-key")
);

var embeddingOptions = new EmbeddingsOptions(new[] { "Your text here" })
{
 DeploymentName = "text-embedding-ada-002"
};

var response = await client.GetEmbeddingsAsync(embeddingOptions);
var embedding = response.Value.Data[0].Embedding;
```

### Sentence Transformers (Open Source)

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

# Generate embeddings
sentences = [
 "Building microservices with .NET",
 "Distributed systems architecture"
]
embeddings = model.encode(sentences)

# Find similar sentences
similarity = cosine_similarity(embeddings[0], embeddings[1])
```

## Vector Databases

### Azure Cognitive Search

```csharp
using Azure.Search.Documents;
using Azure.Search.Documents.Indexes;
using Azure.Search.Documents.Models;

// Create index
var indexClient = new SearchIndexClient(
 new Uri("https://your-search.search.windows.net"),
 new AzureKeyCredential("your-key")
);

var index = new SearchIndex("documents")
{
 Fields = new FieldBuilder().Build(typeof(Document));
};

await indexClient.CreateIndexAsync(index);

// Add documents with embeddings
var documents = new List<SearchDocument>
{
 new SearchDocument
 {
 ["id"] = "1",
 ["content"] = "Document content",
 ["contentVector"] = embedding // 1536-dimensional vector
 }
};

var searchClient = indexClient.GetSearchClient("documents");
await searchClient.UploadDocumentsAsync(documents);
```

### Pinecone

```python
import pinecone
from pinecone import Pinecone, ServerlessSpec

# Initialize
pc = Pinecone(api_key="your-api-key")

# Create index
pc.create_index(
 name="documents",
 dimension=1536,
 metric="cosine",
 spec=ServerlessSpec(
 cloud="aws",
 region="us-east-1"
 )
)

# Upsert vectors
index = pc.Index("documents")
index.upsert(vectors=[
 ("doc-1", embedding, {"text": "Document content"})
])

# Query
results = index.query(
 vector=query_embedding,
 top_k=5,
 include_metadata=True
)
```

### Qdrant

```python
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

# Connect
client = QdrantClient("localhost", port=6333)

# Create collection
client.create_collection(
 collection_name="documents",
 vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
)

# Insert vectors
client.upsert(
 collection_name="documents",
 points=[
 {
 "id": 1,
 "vector": embedding,
 "payload": {"text": "Document content"}
 }
 ]
)

# Search
results = client.search(
 collection_name="documents",
 query_vector=query_embedding,
 limit=5
)
```

## Implementing Vector Search

### Chunking Documents

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

def chunk_documents(documents, chunk_size=1000, chunk_overlap=200):
 text_splitter = RecursiveCharacterTextSplitter(
 chunk_size=chunk_size,
 chunk_overlap=chunk_overlap,
 length_function=len,
 )
 
 chunks = text_splitter.split_documents(documents)
 return chunks
```

### Indexing Documents

```python
def index_documents(documents, vector_store):
 # Generate embeddings for each chunk
 embeddings = []
 for doc in documents:
 embedding = get_embedding(doc.page_content)
 embeddings.append(embedding)
 
 # Store in vector database
 vector_store.add_documents(
 documents=documents,
 embeddings=embeddings
 )
```

### Semantic Search

```python
def semantic_search(query, vector_store, top_k=5):
 # Generate query embedding
 query_embedding = get_embedding(query)
 
 # Search similar documents
 results = vector_store.similarity_search_with_score(
 query_embedding,
 k=top_k
 )
 
 return results
```

## Hybrid Search

Combine vector search with keyword search for better results:

```csharp
// Azure Cognitive Search hybrid query
var searchOptions = new SearchOptions
{
 VectorSearch = new VectorSearchOptions
 {
 Queries = { new VectorizedQuery(queryEmbedding)
 {
 KNearestNeighborsCount = 5,
 Fields = { "contentVector" }
 }}
 },
 QueryType = SearchQueryType.Semantic,
 SemanticSearch = new SemanticSearchOptions
 {
 SemanticConfigurationName = "default",
 QueryCaption = new QueryCaption(QueryCaptionType.Extractive),
 QueryAnswer = new QueryAnswer(QueryAnswerType.Extractive)
 }
};

var results = await searchClient.SearchAsync<Document>(
 query,
 searchOptions
);
```

## Performance Optimization

### Batch Processing

```python
def batch_embed(texts, batch_size=100):
 """Process embeddings in batches"""
 embeddings = []
 for i in range(0, len(texts), batch_size):
 batch = texts[i:i + batch_size]
 batch_embeddings = get_embeddings_batch(batch)
 embeddings.extend(batch_embeddings)
 return embeddings
```

### Caching

```csharp
// Cache embeddings to avoid recomputation
public class EmbeddingCache
{
 private readonly IMemoryCache _cache;
 
 public async Task<float[]> GetOrCreateEmbeddingAsync(string text)
 {
 var cacheKey = $"embedding:{ComputeHash(text)}";
 
 if (_cache.TryGetValue(cacheKey, out float[] cached))
 return cached;
 
 var embedding = await GenerateEmbeddingAsync(text);
 _cache.Set(cacheKey, embedding, TimeSpan.FromDays(7));
 
 return embedding;
 }
}
```

### Pre-filtering

```python
# Filter before vector search to reduce search space
def filtered_search(query, vector_store, filters):
 # Apply filters first
 filtered_docs = apply_filters(filters)
 
 # Then perform vector search on filtered set
 results = vector_store.similarity_search(
 query,
 filter={"ids": filtered_docs},
 k=5
 )
 
 return results
```

## Use Cases

### 1. RAG (Retrieval-Augmented Generation)

```python
def rag_pipeline(query, vector_store, llm):
 # Retrieve relevant documents
 relevant_docs = semantic_search(query, vector_store, top_k=5)
 
 # Build context
 context = "\n\n".join([doc.page_content for doc in relevant_docs])
 
 # Generate response with context
 prompt = f"""Context: {context}
 
Question: {query}

Answer:"""
 
 response = llm.generate(prompt)
 return response
```

### 2. Semantic Search

```python
def semantic_search_engine(query, vector_store):
 results = semantic_search(query, vector_store, top_k=10)
 
 return [
 {
 "document": result[0].page_content,
 "score": result[1],
 "metadata": result[0].metadata
 }
 for result in results
 ]
```

### 3. Document Clustering

```python
from sklearn.cluster import KMeans
import numpy as np

def cluster_documents(documents, n_clusters=5):
 # Generate embeddings
 embeddings = [get_embedding(doc) for doc in documents]
 
 # Cluster
 kmeans = KMeans(n_clusters=n_clusters)
 clusters = kmeans.fit_predict(embeddings)
 
 return clusters
```

## Best Practices

1. **Chunk Size**: 500-1000 tokens typically work well
2. **Overlap**: 10-20% overlap preserves context
3. **Embedding Model**: Choose based on your domain and language
4. **Indexing**: Pre-compute embeddings for static documents
5. **Filtering**: Use metadata filters to narrow search space
6. **Monitoring**: Track search latency and accuracy

## Conclusion

Vector search and embeddings are powerful technologies that enable semantic understanding in LLM applications. By properly implementing embedding generation, vector storage, and similarity search, you can build sophisticated applications that understand context and meaning, not just keywords.

