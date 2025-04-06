from pydantic import BaseModel
from typing import List, Optional, Literal
from datetime import datetime


class ComplianceAnalysis(BaseModel):
    class StateRegistration(BaseModel):
        state: str
        registration_number: str
        expiry: str

    class CertificationAnalysis(BaseModel):
        required: List[str]
        status: Literal["compliant", "non-compliant"]
        missing: List[str]
        compliance_score: float

    class PastPerformance(BaseModel):
        similar_projects: int
        dollar_value: str
        timeframe: str

    class MandatoryRequirement(BaseModel):
        type: str
        description: str
        standard: Optional[str]
        status: Literal["met", "missing"]
        critical: bool

    class DocumentFormat(BaseModel):
        page_limit: int
        font: dict
        line_spacing: str
        margins: str
        toc_required: bool

    class RiskClause(BaseModel):
        clause_type: str
        reference: str
        text: str
        risk_level: Literal["low", "medium", "high"]
        mitigation_status: Literal["resolved", "unresolved"]

    # Main model structure
    _id: str
    name: str
    rfp_number: str
    status: Literal["compliant", "non-compliant", "partial"]
    uploadDate: str
    bid_decision: dict
    compliance_analysis: dict
    eligibility_criteria: dict
    submission_requirements: dict
    contract_risk_analysis: dict
