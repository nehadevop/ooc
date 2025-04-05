import { Card, Alert, Statistic, List, Tag, Typography } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { colors } from "../../utils/constants";

const { Text, Paragraph } = Typography;

export const RiskAssessment = ({ assessment }) => (
  <Card
    title={
      <span style={{ color: "#fff" }}>
        <WarningOutlined /> Risk Assessment
      </span>
    }
    bordered={false}
    className="dark-theme-card"
  >
    <Alert
      message={`Risk Category: ${assessment.risk_assessment.risk_category.toUpperCase()}`}
      type={
        assessment.risk_assessment.score > assessment.risk_assessment.threshold
          ? "error"
          : "success"
      }
      showIcon
      style={{
        marginBottom: 16,
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    />
    <Statistic
      title={
        <span style={{ color: "rgba(255, 255, 255, 0.65)" }}>Risk Score</span>
      }
      value={assessment.risk_assessment.score}
      suffix="/10"
      valueStyle={{
        color:
          assessment.risk_assessment.score >
          assessment.risk_assessment.threshold
            ? colors.error
            : colors.success,
        fontSize: "24px",
      }}
      style={{ marginBottom: 16 }}
    />
    <List
      header={
        <Text strong style={{ color: "#fff" }}>
          Risk Factors
        </Text>
      }
      dataSource={assessment.biased_clauses}
      renderItem={(clause) => (
        <List.Item>
          <List.Item.Meta
            title={
              <span style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                <Tag color={clause.risk_level === "high" ? "error" : "warning"}>
                  {clause.risk_level.toUpperCase()}
                </Tag>
                <Text style={{ marginLeft: "8px" }}>{clause.clause_type}</Text>
              </span>
            }
            description={
              <div>
                <Paragraph style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                  {clause.text}
                </Paragraph>
                <Text style={{ color: "rgba(255, 255, 255, 0.45)" }}>
                  Reference: {clause.reference}
                </Text>
                <br />
                <Tag
                  color={
                    clause.mitigation_status === "resolved"
                      ? "success"
                      : "error"
                  }
                >
                  {clause.mitigation_status.toUpperCase()}
                </Tag>
              </div>
            }
          />
        </List.Item>
      )}
    />
  </Card>
);
