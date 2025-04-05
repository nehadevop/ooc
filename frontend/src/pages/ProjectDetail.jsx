import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Typography,
  Row,
  Col,
  Statistic,
  Progress,
  List,
  Tag,
} from "antd";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { sampleProjects } from "../utils/mockData";

const { Title, Text } = Typography;

export const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProjectAnalysis();
  }, [id]);

  const loadProjectAnalysis = async () => {
    try {
      setLoading(true);
      const projectData = sampleProjects.find((p) => p._id === id);
      setProject(projectData);
    } catch (error) {
      message.error("Failed to load project analysis");
    } finally {
      setLoading(false);
    }
  };

  const getTagColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "processing";
    }
  };

  if (!project) return null;

  return (
    <div className="project-detail-container" style={{ padding: "24px" }}>
      <Title level={2} style={{ color: "#fff", marginBottom: "24px" }}>
        {project.name} - Analysis
      </Title>

      <Row gutter={[16, 16]}>
        {/* Compliance Section */}
        <Col span={24}>
          <Card title="Compliance Analysis" bordered={false}>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title="Compliance Score"
                  value={project.analysis.compliance.score}
                  suffix="%"
                  prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
                />
              </Col>
              <Col span={16}>
                <List
                  size="small"
                  dataSource={project.analysis.compliance.checks}
                  renderItem={(item) => (
                    <List.Item>
                      <Tag
                        color={item.passed ? "success" : "error"}
                        style={{
                          minWidth: "120px",
                          textAlign: "center",
                          fontSize: "14px",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.requirement}
                      </Tag>
                      {!item.passed && (
                        <Text
                          type="danger"
                          style={{ marginLeft: "8px", fontSize: "14px" }}
                        >
                          {item.message}
                        </Text>
                      )}
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Eligibility Section */}
        <Col span={12}>
          <Card title="Eligibility Criteria" bordered={false}>
            {project.analysis.eligibility.criteria.map((criterion) => (
              <div key={criterion.title} style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <Text strong style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                    {criterion.title}
                  </Text>
                  <Text style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                    {criterion.met}%
                  </Text>
                </div>
                <Progress
                  percent={criterion.met}
                  strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068",
                  }}
                  trailColor="rgba(255, 255, 255, 0.08)"
                />
              </div>
            ))}
          </Card>
        </Col>

        {/* Risk Assessment */}
        <Col span={12}>
          <Card title="Risk Assessment" bordered={false}>
            <List
              dataSource={project.analysis.risks}
              renderItem={(risk) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <span>
                        <Tag color={getTagColor(risk.severity)}>
                          {risk.severity.toUpperCase()}
                        </Tag>
                        <Text
                          style={{
                            color: "rgba(255, 255, 255, 0.85)",
                            marginLeft: "8px",
                          }}
                        >
                          {risk.title}
                        </Text>
                      </span>
                    }
                    description={
                      <Text style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                        {risk.description}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Team Metrics */}
        <Col span={24}>
          <Card title="Team Collaboration" bordered={false}>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title="Comments"
                  value={project.analysis.teamMetrics.commentsCount}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Time Spent"
                  value={project.analysis.teamMetrics.timeSpent}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Team Members"
                  value={project.analysis.teamMetrics.participants}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
