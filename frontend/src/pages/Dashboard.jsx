import { Card, Col, Row, Statistic, Table, Progress } from "antd";
import {
  FileTextOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sampleProjects } from "../utils/mockData";

// Calculate metrics from sample data
const calculateMetrics = (projects) => {
  return {
    activeProjects: projects.filter((p) => p.status === "pending").length,
    completedAnalyses: projects.filter((p) => p.status === "completed").length,
    pendingReviews: projects.filter((p) => p.status === "issues").length,
    teamMembers: Math.max(
      ...projects.map((p) => p.analysis.teamMetrics.participants)
    ),
    averageCompliance: Math.round(
      projects.reduce((acc, p) => acc + p.analysis.compliance.score, 0) /
        projects.length
    ),
  };
};

// Generate recent activities from projects
const generateRecentActivities = (projects) => {
  return projects.map((project) => ({
    key: project._id,
    project: project.name,
    action: getActionByStatus(project.status),
    time: new Date(project.uploadDate).toLocaleDateString(),
    status: getStatusType(project.status),
  }));
};

const getActionByStatus = (status) => {
  switch (status) {
    case "completed":
      return "Analysis Completed";
    case "pending":
      return "In Progress";
    case "issues":
      return "Issues Found";
    default:
      return "Status Unknown";
  }
};

const getStatusType = (status) => {
  switch (status) {
    case "completed":
      return "success";
    case "pending":
      return "info";
    case "issues":
      return "warning";
    default:
      return "info";
  }
};

const statusIcons = {
  success: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
  warning: <WarningOutlined style={{ color: "#faad14" }} />,
  info: <ClockCircleOutlined style={{ color: "#1890ff" }} />,
};

const columns = [
  {
    title: "Project",
    dataIndex: "project",
    key: "project",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <div>
        {statusIcons[record.status]} {text}
      </div>
    ),
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
];

const StatisticCard = ({ title, value, icon, color }) => (
  <Card
    bordered={false}
    style={{
      background: "rgba(255, 255, 255, 0.08)",
      borderRadius: "8px",
    }}
  >
    <Statistic
      title={
        <span style={{ color: "rgba(255, 255, 255, 0.65)" }}>{title}</span>
      }
      value={value}
      prefix={icon}
      valueStyle={{ color: "#fff" }}
    />
  </Card>
);

export const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Calculate metrics from sample data
    setMetrics(calculateMetrics(sampleProjects));
    setRecentActivities(generateRecentActivities(sampleProjects));
  }, []);

  if (!metrics) return null;

  return (
    <div style={{ padding: "24px", background: "#1f1f1f", minHeight: "100vh" }}>
      <h1 style={{ color: "#fff", marginBottom: "24px" }}>
        RFP Analysis Dashboard
      </h1>

      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} md={6}>
          <StatisticCard
            title="Active Projects"
            value={metrics.activeProjects}
            icon={<FileTextOutlined style={{ color: "#1890ff" }} />}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatisticCard
            title="Team Members"
            value={metrics.teamMembers}
            icon={<TeamOutlined style={{ color: "#722ed1" }} />}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatisticCard
            title="Completed Analyses"
            value={metrics.completedAnalyses}
            icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatisticCard
            title="Pending Reviews"
            value={metrics.pendingReviews}
            icon={<ClockCircleOutlined style={{ color: "#faad14" }} />}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <span style={{ color: "#fff" }}>Project Status Overview</span>
            }
            bordered={false}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              borderRadius: "8px",
            }}
          >
            {sampleProjects.map((project) => (
              <div key={project._id} style={{ marginBottom: "16px" }}>
                <div style={{ color: "#fff", marginBottom: "4px" }}>
                  <Link
                    to={`/projects/${project._id}`}
                    style={{ color: "#fff" }}
                  >
                    {project.name}
                  </Link>
                </div>
                <Progress
                  percent={project.analysis.compliance.score}
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
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title={<span style={{ color: "#fff" }}>Compliance Statistics</span>}
            bordered={false}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              borderRadius: "8px",
            }}
          >
            <Row
              justify="space-around"
              align="middle"
              style={{ height: "100%" }}
            >
              <Col>
                <Progress
                  type="circle"
                  percent={metrics.averageCompliance}
                  strokeColor="#1890ff"
                  trailColor="rgba(255, 255, 255, 0.12)"
                  format={(percent) => (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ color: "#fff", fontSize: "16px" }}>
                        Average Compliance
                      </div>
                      <div
                        style={{
                          color: "#1890ff",
                          fontSize: "24px",
                          fontWeight: "bold",
                        }}
                      >
                        {percent}%
                      </div>
                    </div>
                  )}
                />
              </Col>
              <Col>
                <Progress
                  type="circle"
                  percent={Math.round(
                    (metrics.completedAnalyses / sampleProjects.length) * 100
                  )}
                  strokeColor="#52c41a"
                  trailColor="rgba(255, 255, 255, 0.12)"
                  format={(percent) => (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ color: "#fff", fontSize: "16px" }}>
                        Completion Rate
                      </div>
                      <div
                        style={{
                          color: "#52c41a",
                          fontSize: "24px",
                          fontWeight: "bold",
                        }}
                      >
                        {percent}%
                      </div>
                    </div>
                  )}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Card
        title={<span style={{ color: "#fff" }}>Recent Activities</span>}
        bordered={false}
        style={{ background: "rgba(255, 255, 255, 0.08)", borderRadius: "8px" }}
      >
        <Table
          columns={columns}
          dataSource={recentActivities}
          pagination={false}
          size="small"
          rowClassName={() => "dark-table-row"}
        />
      </Card>
    </div>
  );
};
