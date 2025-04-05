import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "antd";
import { sampleProjects } from "../utils/mockData";
import { ProjectHeader } from "../components/project-detail/ProjectHeader";
import { BidDecision } from "../components/project-detail/BidDecision";
import { ComplianceAnalysis } from "../components/project-detail/ComplianceAnalysis";
import { EligibilityCriteria } from "../components/project-detail/EligibilityCriteria";
import { SubmissionRequirements } from "../components/project-detail/SubmissionRequirements";
import { RiskAssessment } from "../components/project-detail/RiskAssessment";

export const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const projectData = sampleProjects.find((p) => p._id === id);
    setProject(projectData);
  }, [id]);

  if (!project) return null;

  return (
    <div className="project-detail-container" style={{ padding: "24px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProjectHeader
            name={project.name}
            rfpNumber={project.rfp_number}
            status={project.status}
          />
        </Col>

        <Col span={24}>
          <BidDecision bidDecision={project.bid_decision} />
        </Col>

        <Col span={12}>
          <ComplianceAnalysis analysis={project.compliance_analysis} />
        </Col>

        <Col span={12}>
          <EligibilityCriteria criteria={project.eligibility_criteria} />
        </Col>

        <Col span={12}>
          <SubmissionRequirements
            requirements={project.submission_requirements}
          />
        </Col>

        <Col span={12}>
          <RiskAssessment assessment={project.contract_risk_analysis} />
        </Col>
      </Row>
    </div>
  );
};
