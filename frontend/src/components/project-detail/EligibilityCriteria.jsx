import { Card, Alert, Statistic, List, Tag, Typography } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { colors } from "../../utils/constants";

const { Text } = Typography;

export const EligibilityCriteria = ({ criteria }) => (
  <Card
    title={
      <span style={{ color: "#fff" }}>
        <FileTextOutlined /> Eligibility Criteria
      </span>
    }
    bordered={false}
    className="dark-theme-card"
  >
    <Alert
      message={`Status: ${criteria.eligibility_status.toUpperCase()}`}
      type={criteria.eligibility_status === "eligible" ? "success" : "error"}
      showIcon
      style={{ 
        marginBottom: 16, 
        background: "rgba(255, 255, 255, 0.04)",
        color: "rgba(255, 255, 255, 0.85)"
      }}
    />
    <Statistic
      title={
        <span style={{ color: "rgba(255, 255, 255, 0.85)" }}>
          Eligibility Score
        </span>
      }
      value={criteria.score}
      suffix={`/${criteria.threshold}`}
      valueStyle={{
        color: criteria.score >= criteria.threshold ? colors.success : colors.error,
        fontSize: "24px",
      }}
      style={{ marginBottom: 16 }}
    />
    <List
      header={
        <Text strong style={{ color: "#fff" }}>
          Mandatory Requirements
        </Text>
      }
      dataSource={criteria.mandatory_requirements}
      renderItem={(req) => (
        <List.Item>
          <List.Item.Meta
            title={
              <span style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                {req.critical && (
                  <Tag color="error" style={{ marginRight: "8px" }}>
                    CRITICAL
                  </Tag>
                )}
                {req.description}
              </span>
            }
            description={
              <div style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                <div>Standard: {req.standard}</div>
                <Tag color={req.status === "met" ? "success" : "error"}>
                  {req.status.toUpperCase()}
                </Tag>
              </div>
            }
          />
        </List.Item>
      )}
      style={{ color: "rgba(255, 255, 255, 0.85)" }}
    />
  </Card>
);
