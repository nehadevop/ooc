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
      {/* State Registration Section */}
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
            <Tag color="processing" style={{ margin: "4px", color: "#fff" }}>
              {state}
            </Tag>
          )}
        />
        <div style={{ marginTop: "8px" }}>
          <Text style={{ color: "rgba(255, 255, 255, 0.85)" }}>Status: </Text>
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

      {/* Certifications Section */}
      <Descriptions.Item
        label={
          <span style={{ color: "rgba(255, 255, 255, 0.85)" }}>
            Certifications
          </span>
        }
      >
        <div style={{ marginBottom: "16px" }}>
          <Text 
            strong 
            style={{ 
              color: "rgba(255, 255, 255, 0.85)", 
              display: "block", 
              marginBottom: "8px" 
            }}
          >
            Required Certifications:
          </Text>
          {analysis.legal_eligibility.certifications.required.map((cert) => (
            <Tag 
              key={cert} 
              style={{ 
                margin: "4px", 
                background: "rgba(255, 255, 255, 0.1)",
                color: "#fff",
                borderColor: "rgba(255, 255, 255, 0.15)"
              }}
            >
              {cert}
            </Tag>
          ))}
        </div>
        {analysis.legal_eligibility.certifications.missing.length > 0 && (
          <div style={{ marginBottom: "16px" }}>
            <Text 
              strong 
              style={{ 
                color: "rgba(255, 255, 255, 0.85)", 
                display: "block", 
                marginBottom: "8px" 
              }}
            >
              Missing Certifications:
            </Text>
            {analysis.legal_eligibility.certifications.missing.map((cert) => (
              <Tag 
                key={cert} 
                color="error" 
                style={{ margin: "4px" }}
              >
                {cert}
              </Tag>
            ))}
          </div>
        )}
        <Statistic
          title={
            <span style={{ color: "rgba(255, 255, 255, 0.85)" }}>
              Compliance Score
            </span>
          }
          value={analysis.legal_eligibility.certifications.compliance_score}
          suffix="%"
          valueStyle={{ 
            color: colors.primary,
            fontSize: "24px" 
          }}
        />
      </Descriptions.Item>
    </Descriptions>
  </Card>
);
