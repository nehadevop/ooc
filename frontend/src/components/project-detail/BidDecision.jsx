import { Card, Row, Col, Alert, Statistic, List, Typography } from "antd";
import { SafetyCertificateOutlined } from "@ant-design/icons";
import { colors } from "../../utils/constants";

const { Text } = Typography;

export const BidDecision = ({ bidDecision }) => (
  <Card
    title={
      <span style={{ color: "#fff" }}>
        <SafetyCertificateOutlined /> Bid Decision
      </span>
    }
    bordered={false}
    className="dark-theme-card"
  >
    <Alert
      message={`Recommendation: ${bidDecision.recommendation.toUpperCase()}`}
      description={bidDecision.determination}
      type={bidDecision.recommendation === "yes" ? "success" : "error"}
      showIcon
      style={{ marginBottom: 16, background: "rgba(255, 255, 255, 0.04)" }}
    />
    <Row gutter={16}>
      <Col span={8}>
        <Statistic
          title={
            <span style={{ color: "rgba(255, 255, 255, 0.65)" }}>
              Decision Score
            </span>
          }
          value={bidDecision.decision_score}
          suffix="%"
          valueStyle={{
            color:
              bidDecision.decision_score >=
              bidDecision.decision_thresholds.min_eligibility_score
                ? colors.success
                : colors.error,
            fontSize: "24px",
          }}
        />
      </Col>
      <Col span={16}>
        <List
          header={
            <Text strong style={{ color: "#fff" }}>
              Decision Factors
            </Text>
          }
          dataSource={bidDecision.decision_factors}
          renderItem={(item) => (
            <List.Item>
              <Text style={{ color: colors.error }}>{item}</Text>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  </Card>
);
