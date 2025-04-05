import { Row, Col } from "antd";
import {
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { sampleProjects } from "../utils/mockData";
import { StatisticCard } from "../components/dashboard/StatisticCard";
import { ProjectStatusOverview } from "../components/dashboard/ProjectStatusOverview";
import { ComplianceStatistics } from "../components/dashboard/ComplianceStatistics";
import { RecentActivities } from "../components/dashboard/RecentActivities";
import {
  calculateMetrics,
  generateRecentActivities,
} from "../utils/dashboardUtils";

export const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
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
        <Col xs={24} sm={12} md={8}>
          <StatisticCard
            title="Active Projects"
            value={metrics.activeProjects}
            icon={<FileTextOutlined style={{ color: "#1890ff" }} />}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <StatisticCard
            title="Completed Analyses"
            value={metrics.completedAnalyses}
            icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <StatisticCard
            title="Pending Reviews"
            value={metrics.pendingReviews}
            icon={<ClockCircleOutlined style={{ color: "#faad14" }} />}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} lg={12}>
          <ProjectStatusOverview projects={sampleProjects} />
        </Col>
        <Col xs={24} lg={12}>
          <ComplianceStatistics
            metrics={metrics}
            totalProjects={sampleProjects.length}
          />
        </Col>
      </Row>

      <RecentActivities activities={recentActivities} />
    </div>
  );
};
