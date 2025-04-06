from fastapi import FastAPI, UploadFile, File, HTTPException
from models import PDFUpload, KnowledgeBaseResponse
from services.embedding import PDFProcessor
from services.storage import VectorStore
import os
import uuid
from datetime import datetime

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
    vectordb = Chroma(
        persist_directory="./chroma_db", embedding_function=HuggingFaceEmbeddings()
    )
    results = vectordb.similarity_search(query, k=k)
    return {
        "results": [{"text": r.page_content, "metadata": r.metadata} for r in results]
    }


@app.get("/test-api/")
async def test_api():
    """Test API to process a predefined PDF file."""
    test_file_path = "data/doc1.pdf"  # Ensure this file exists

    if not os.path.exists(test_file_path):
        raise HTTPException(404, f"Test file not found: {test_file_path}")

    try:
        # Process the PDF file
        documents = processor.process_pdf(test_file_path)

        # Await the coroutine to store documents
        chunks_processed = await vector_store.store_documents(documents)

        # Log the results to the console
        print("Processed Documents:", documents)  # Log raw dictionaries
        print("Chunks Processed:", chunks_processed)

        return {
            "document_id": str(uuid.uuid4()),
            "chunks_processed": chunks_processed,
            "timestamp": datetime.utcnow().isoformat(),
        }
    except Exception as e:
        raise HTTPException(500, f"Test processing failed: {str(e)}")
