import { Card, Progress } from "antd";
import { Link } from "react-router-dom";

export const ProjectStatusOverview = ({ projects }) => (
  <Card
    title={<span style={{ color: "#fff" }}>Project Status Overview</span>}
    bordered={false}
    style={{ background: "rgba(255, 255, 255, 0.08)", borderRadius: "8px" }}
  >
    {projects.map((project) => (
      <div key={project._id} style={{ marginBottom: "16px" }}>
        <div style={{ color: "#fff", marginBottom: "4px" }}>
          <Link to={`/projects/${project._id}`} style={{ color: "#fff" }}>
            {project.name}
          </Link>
        </div>
        <Progress
          percent={
            project.compliance_analysis.legal_eligibility.certifications
              .compliance_score
          }
          status={
            project.status === "completed"
              ? "success"
              : project.status === "issues"
              ? "exception"
              : "active"
          }
          strokeColor={
            project.status === "completed"
              ? "#52c41a"
              : project.status === "issues"
              ? "#ff4d4f"
              : "#1890ff"
          }
          trailColor="rgba(255, 255, 255, 0.12)"
        />
      </div>
    ))}
  </Card>
);
