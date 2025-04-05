import React from "react";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

export const statusIcons = {
  success: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
  warning: <WarningOutlined style={{ color: "#faad14" }} />,
  info: <ClockCircleOutlined style={{ color: "#1890ff" }} />,
};

export const projectStatus = {
  COMPLETED: "completed",
  PENDING: "pending",
  ISSUES: "issues",
};

export const severityLevels = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

export const colors = {
  success: "#52c41a",
  warning: "#faad14",
  error: "#ff4d4f",
  info: "#1890ff",
  primary: "#1890ff",
  secondary: "#722ed1",
};

export const statusConfig = {
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
