import { useState } from "react";
import { DocumentUpload } from "../components/DocumentUpload";
import { AnalysisResults } from "../components/AnalysisResults";
import { Divider, Card, Typography } from "antd";

const { Title } = Typography;

const mockAnalysis = {
  compliance: [
    { requirement: "State Registration", passed: true, message: "" },
    {
      requirement: "Required Certification",
      passed: false,
      message: "Missing XYZ Certification",
    },
    { requirement: "Past Performance", passed: true, message: "" },
  ],
  eligibility: [
    {
      criteria: "5+ years experience",
      met: true,
      description: "We have 7 years of relevant experience",
    },
    {
      criteria: "Security Clearance",
      met: false,
      description: "Need to apply for Level 2 clearance",
    },
  ],
  checklist: [
    "Proposal must not exceed 50 pages",
    "12pt Times New Roman font required",
    "Include Form XYZ as Appendix A",
  ],
  risks: [
    {
      title: "Unilateral Termination Clause",
      description:
        "Client can terminate contract without cause with only 7 days notice",
      suggestion: "Negotiate for 30-day notice period",
    },
  ],
};

const mockComments = [
  {
    author: "John Doe",
    content:
      "The security clearance requirement might be a deal breaker. Let's discuss alternatives.",
    datetime: "2023-05-01 14:30",
  },
  {
    author: "Jane Smith",
    content:
      "We can partner with Clearance Solutions Inc. to meet the requirement.",
    datetime: "2023-05-01 15:15",
  },
];

export const Documents = () => {
  const [analysis, setAnalysis] = useState(null);
  const [comments, setComments] = useState(mockComments);

  const handleUpload = (file) => {
    console.log("Uploading file:", file.name);
    setTimeout(() => setAnalysis(mockAnalysis), 1500);
  };

  const handleAddComment = (comment) => {
    setComments([
      ...comments,
      {
        author: "Current User",
        content: comment,
        datetime: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="documents-container">
      <Title level={2} style={{ color: "#fff", marginBottom: "24px" }}>
         RFP Document Analysis
      </Title>
      <Card className="upload-card">
        <DocumentUpload onUpload={handleUpload} />
      </Card>
      {analysis && (
        <>
          <Divider style={{ borderColor: "#303030" }} />
          <Card className="analysis-card">
            <AnalysisResults analysis={analysis} />
          </Card>
        </>
      )}
    </div>
  );
};
