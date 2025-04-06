from fastapi import FastAPI, UploadFile, Depends
from services import ComplianceService, GenAIService, VectorStore, PDFProcessor
from models.schemas import ComplianceAnalysis

app = FastAPI()


# Dependency Setup
def get_services():
    return {
        "compliance": ComplianceService(),
        "genai": GenAIService(),
        "vector_store": VectorStore(),
        "pdf_processor": PDFProcessor(),
    }


@app.post("/analyze", response_model=ComplianceAnalysis)
async def analyze_rfp(file: UploadFile, services: dict = Depends(get_services)):
    # 1. Process Document
    pdf_content = await services["pdf_processor"].process(file)

    # 2. Extract Requirements
    requirements = services["genai"].extract_requirements(pdf_content)

    # 3. Run Compliance Checks
    analysis = services["compliance"].analyze_compliance(requirements)

    # 4. Generate Full Report
    return {
        "_id": "generated-uuid",
        "name": "Extracted RFP Name",
        "rfp_number": "RFP-123",
        "status": "compliant",
        "uploadDate": datetime.utcnow().isoformat(),
        **analysis,
    }
