import { Card, Col, Row, Statistic, Table, Progress } from "antd";
import {
  FileTextOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const recentActivities = [
  {
    key: "1",
    project: "DHS Cybersecurity RFP",
    action: "Analysis Completed",
    time: "2 hours ago",
    status: "success",
  },
  {
    key: "2",
    project: "VA Health Records",
    action: "Compliance Issues Found",
    time: "1 day ago",
    status: "warning",
  },
  {
    key: "3",
    project: "DoD Cloud Migration",
    action: "New Document Uploaded",
    time: "2 days ago",
    status: "info",
  },
];

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
  return (
    <div style={{ padding: "24px", background: "#1f1f1f", minHeight: "100vh" }}>
      <h1 style={{ color: "#fff", marginBottom: "24px" }}>
        RFP Analysis Dashboard
      </h1>

      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} md={6}>
          <StatisticCard
            title="Active Projects"
            value={5}
            icon={<FileTextOutlined style={{ color: "#1890ff" }} />}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatisticCard
            title="Team Members"
            value={8}
            icon={<TeamOutlined style={{ color: "#722ed1" }} />}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatisticCard
            title="Completed Analyses"
            value={12}
            icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatisticCard
            title="Pending Reviews"
            value={3}
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
            <div style={{ marginBottom: "16px" }}>
              <div style={{ color: "#fff", marginBottom: "4px" }}>
                DHS Cybersecurity RFP
              </div>
              <Progress
                percent={75}
                status="active"
                strokeColor="#1890ff"
                trailColor="rgba(255, 255, 255, 0.12)"
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ color: "#fff", marginBottom: "4px" }}>
                VA Health Records
              </div>
              <Progress
                percent={30}
                status="exception"
                strokeColor="#ff4d4f"
                trailColor="rgba(255, 255, 255, 0.12)"
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ color: "#fff", marginBottom: "4px" }}>
                DoD Cloud Migration
              </div>
              <Progress
                percent={90}
                status="success"
                strokeColor="#52c41a"
                trailColor="rgba(255, 255, 255, 0.12)"
              />
            </div>
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
                  percent={65}
                  strokeColor="#1890ff"
                  trailColor="rgba(255, 255, 255, 0.12)"
                  format={(percent) => (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ color: "#fff", fontSize: "16px" }}>
                        Compliance
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
                  percent={85}
                  strokeColor="#52c41a"
                  trailColor="rgba(255, 255, 255, 0.12)"
                  format={(percent) => (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ color: "#fff", fontSize: "16px" }}>
                        Eligibility
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
