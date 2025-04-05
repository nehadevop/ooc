import { Card, Statistic } from "antd";

export const StatisticCard = ({ title, value, icon, color }) => (
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
