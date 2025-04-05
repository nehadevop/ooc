import { Card, Descriptions, List, Tag, Statistic, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { colors } from "../../utils/constants";

const { Text } = Typography;

export const ComplianceAnalysis = ({ analysis }) => (
  <Card
    title={
      <span style={{ color: "#fff" }}>
        <CheckCircleOutlined /> Compliance Analysis
      </span>
    }
    bordered={false}
    className="dark-theme-card"
  >
    <Descriptions column={1} bordered>
      <Descriptions.Item
        label={
          <span style={{ color: "rgba(255, 255, 255, 0.85)" }}>
            State Registration
          </span>
        }
      >
        <List
          dataSource={
            analysis.legal_eligibility.state_registration.required_states
          }
          renderItem={(state) => (
            <Tag color="processing" style={{ margin: "4px" }}>
              {state}
            </Tag>
          )}
        />
        <div style={{ marginTop: "8px" }}>
          <Text style={{ color: "rgba(255, 255, 255, 0.65)" }}>Status: </Text>
          <Tag
            color={
              analysis.legal_eligibility.state_registration.status ===
              "compliant"
                ? "success"
                : "error"
            }
          >
            {analysis.legal_eligibility.state_registration.status.toUpperCase()}
          </Tag>
        </div>
      </Descriptions.Item>

      <Descriptions.Item
        label={
          <span style={{ color: "rgba(255, 255, 255, 0.85)" }}>
            Certifications
          </span>
        }
      >
        <div style={{ marginBottom: "8px" }}>
          <Text style={{ color: "rgba(255, 255, 255, 0.65)" }}>Required:</Text>
          {analysis.legal_eligibility.certifications.required.map((cert) => (
            <Tag key={cert} style={{ margin: "4px" }}>
              {cert}
            </Tag>
          ))}
        </div>
        {analysis.legal_eligibility.certifications.missing.length > 0 && (
          <div style={{ marginBottom: "8px" }}>
            <Text style={{ color: "rgba(255, 255, 255, 0.65)" }}>Missing:</Text>
            {analysis.legal_eligibility.certifications.missing.map((cert) => (
              <Tag key={cert} color="error" style={{ margin: "4px" }}>
                {cert}
              </Tag>
            ))}
          </div>
        )}
        <Statistic
          title={
            <span style={{ color: "rgba(255, 255, 255, 0.65)" }}>
              Compliance Score
            </span>
          }
          value={analysis.legal_eligibility.certifications.compliance_score}
          suffix="%"
          valueStyle={{ color: colors.primary }}
        />
      </Descriptions.Item>
    </Descriptions>
  </Card>
);
