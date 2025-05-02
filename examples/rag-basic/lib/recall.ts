import { embed } from './embed';

export interface Document {
  id: string;
  content: string;
  embedding?: number[];
}

export class VectorStore {
  private documents: Document[] = [];

  async addDocuments(documents: Document[]) {
    this.documents = documents.map(doc => ({
      ...doc,
      embedding: embed(doc.content),
    }));
  }

  async search(query: string, topK: number = 3): Promise<Document[]> {
    const queryEmbedding = embed(query);
    
    // Calculate cosine similarity with all documents
    const similarities = this.documents.map(doc => ({
      document: doc,
      similarity: cosineSimilarity(queryEmbedding, doc.embedding!),
    }));
    
    // Sort by similarity and return top K
    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK)
      .map(result => result.document);
  }
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  return dotProduct; // Vectors are already normalized
}
