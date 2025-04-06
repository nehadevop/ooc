from fastapi import APIRouter, UploadFile, File, HTTPException, status
from typing import Dict
from app.services.pdf_processor import PDFProcessor
from app.services.vector_store import VectorStore
from app.models.document import ProcessedDocument

router = APIRouter()
pdf_processor = PDFProcessor()
vector_store = VectorStore()


@router.post(
    "/upload-pdf", response_model=ProcessedDocument, status_code=status.HTTP_201_CREATED
)
async def upload_pdf(file: UploadFile = File(...)) -> Dict:
    """
    Upload and process an RFP PDF document.
    """
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted")

    try:
        # Process PDF and extract text
        text_chunks = await pdf_processor.process(file)

        # Store chunks in vector store with metadata
        document_id = await vector_store.store(
            chunks=text_chunks,
            metadata={
                "filename": file.filename,
                "upload_date": datetime.now().isoformat(),
                "status": "processed",
            },
        )

        return {
            "document_id": document_id,
            "filename": file.filename,
            "chunk_count": len(text_chunks),
            "status": "success",
        }

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error processing document: {str(e)}"
        )
