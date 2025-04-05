import { useState, useEffect } from "react";
import { Card, Table, Tag, Typography, Button, message } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { projectsService } from "../services/projectsService";
import { sampleProjects } from "../utils/mockData";

const { Title } = Typography;

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      // Simulate API call with mock data
      setProjects(sampleProjects);
    } catch (error) {
      message.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to={`/projects/${record._id}`}>{text}</Link>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusConfig = {
          completed: {
            color: "success",
            icon: <CheckCircleOutlined />,
            text: "Completed",
          },
          pending: {
            color: "processing",
            icon: <ClockCircleOutlined />,
            text: "Pending",
          },
          issues: {
            color: "warning",
            icon: <WarningOutlined />,
            text: "Issues Found",
          },
        };
        const config = statusConfig[status] || statusConfig.pending;
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: "Upload Date",
      dataIndex: "uploadDate",
      key: "uploadDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className="projects-container" style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <Title level={2} style={{ color: "#fff", margin: 0 }}>
          Projects
        </Title>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => navigate("/projects/new")}
        >
          Upload New Project
        </Button>
      </div>
      <Card
        bordered={false}
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: "8px",
        }}
      >
        <Table
          columns={columns}
          dataSource={projects}
          rowKey="_id"
          loading={loading}
        />
      </Card>
    </div>
  );
};
