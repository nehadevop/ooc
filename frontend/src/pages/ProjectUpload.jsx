import { useState, useEffect } from "react";
import { message } from "antd";
import { ProjectUploadForm } from "../components/ProjectUploadForm";
import { AnalysisResults } from "../components/AnalysisResults";
import { projectsService } from "../services/projectsService";
import { Divider, Card, Typography } from "antd";

const { Title } = Typography;

export const ProjectUpload = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalysisComplete = (analysisData) => {
    setAnalysis(analysisData);
  };

  return (
    <div className="project-container">
      <Title level={2} style={{ color: "#fff", marginBottom: "24px" }}>
        RFP Project Analysis
      </Title>
      <Card className="upload-card">
        <ProjectUploadForm onAnalysisComplete={handleAnalysisComplete} />
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
