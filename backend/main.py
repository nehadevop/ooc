from fastapi import FastAPI, UploadFile, File, HTTPException
from models import PDFUpload, KnowledgeBaseResponse
from services.embedding import PDFProcessor
from services.storage import VectorStore
import os
import uuid
from datetime import datetime
from google import genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()
processor = PDFProcessor()
vector_store = VectorStore()


@app.post("/upload-pdf/", response_model=KnowledgeBaseResponse)
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(400, "Only PDF files accepted")

    # Save uploaded file
    os.makedirs("data/uploads", exist_ok=True)
    file_path = f"data/uploads/{uuid.uuid4()}.pdf"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Process and store
    try:
        documents = processor.process_pdf(file_path)
        chunks_processed = await vector_store.store_documents(documents)

        return {
            "document_id": str(uuid.uuid4()),
            "chunks_processed": chunks_processed,
            "timestamp": datetime.utcnow().isoformat(),
        }
    except Exception as e:
        raise HTTPException(500, f"Processing failed: {str(e)}")


@app.get("/search/")
async def search(query: str, k: int = 3):
    """Search the knowledge base"""
    try:
        results = await vector_store.search(query, k=k)
        return {
            "results": [
                {
                    "text": r["text"],
                    "metadata": r["metadata"],
                    "score": r["score"]
                } for r in results
            ]
        }
    except Exception as e:
        raise HTTPException(500, f"Search failed: {str(e)}")


@app.get("/test-api/")
async def test_api():
    test_file_path = "data/doc1.pdf"
    
    if not os.path.exists(test_file_path):
        raise HTTPException(404, f"Test file not found: {test_file_path}")

    try:
        # Add debugging
        print("Starting PDF processing...")
        documents = processor.process_pdf(test_file_path)
        print(f"Documents processed: {len(documents)}")
        print(f"First document structure: {documents[0] if documents else 'No documents'}")
        
        chunks_processed = await vector_store.store_documents(documents)
        print(f"Chunks processed: {chunks_processed}")
        
        return {
            "document_id": str(uuid.uuid4()),
            "chunks_processed": chunks_processed,
            "timestamp": datetime.utcnow().isoformat(),
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(500, f"Test processing failed: {str(e)}")


def use_google_genai(content):
    """Test Google GenAI API"""
    # Ensure you have set the GOOGLE_API_KEY environment variable
    if "GOOGLE_API_KEY" not in os.environ:
        raise HTTPException(500, "Google API key not set in environment variables")
   
    client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

    response = client.models.generate_content(
        model="gemini-2.0-flash", contents={content}
    )
    return response.text

@app.get("/test-rag/")
async def test_rag(query: str, k: int = 3):
    """Test RAG pipeline with a query"""
    try:
        # Step 1: Search for relevant chunks
        results = await vector_store.search(query, k=k)

        # Step 2: Extract text from results
        context = " ".join([result["text"] for result in results])

        # Step 3: Generate an answer using Gemini
        prompt = f"""Based on the following context, answer the question.
        
        Context: {context}
        
        Question: {query}
        
        Provide a detailed answer using only the information from the context. 
        If the context doesn't contain relevant information, say "I cannot answer this question based on the provided context."
        """
        answer = use_google_genai(prompt)

        return {
            "query": query,
            "context": context,
            "answer": answer,
            "sources": [{"text": r["text"], "score": r["score"]} for r in results]
        }
    except Exception as e:
        raise HTTPException(500, f"RAG pipeline failed: {str(e)}")
