import { Card, Collapse, Tag, Typography, List } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;
const { Title, Text } = Typography;

export const AnalysisResults = ({ analysis }) => {
  return (
    <Card title="Analysis Results">
      <Collapse defaultActiveKey={["1", "2", "3"]}>
        <Panel header="Bid Decision" key="1">
          <Title level={4}>
            Recommendation: {analysis.bid_decision.recommendation.toUpperCase()}
          </Title>
          <List
            dataSource={analysis.bid_decision.decision_factors}
            renderItem={(factor) => (
              <List.Item>
                <Text>{factor}</Text>
              </List.Item>
            )}
          />
        </Panel>

        <Panel header="Compliance Analysis" key="2">
          <List
            dataSource={[
              {
                name: "State Registration",
                status:
                  analysis.compliance_analysis.legal_eligibility
                    .state_registration.status,
              },
              {
                name: "Certifications",
                status:
                  analysis.compliance_analysis.legal_eligibility.certifications
                    .status,
                missing:
                  analysis.compliance_analysis.legal_eligibility.certifications
                    .missing,
              },
            ]}
            renderItem={(item) => (
              <List.Item>
                <Tag color={item.status === "compliant" ? "success" : "error"}>
                  {item.name}
                </Tag>
                {item.missing && (
                  <Text type="danger">Missing: {item.missing.join(", ")}</Text>
                )}
              </List.Item>
            )}
          />
        </Panel>

        <Panel header="Risk Assessment" key="3">
          <List
            dataSource={analysis.contract_risk_analysis.biased_clauses}
            renderItem={(risk) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <span>
                      <Tag
                        color={risk.risk_level === "high" ? "error" : "warning"}
                      >
                        {risk.risk_level.toUpperCase()}
                      </Tag>
                      {risk.clause_type}
                    </span>
                  }
                  description={risk.text}
                />
              </List.Item>
            )}
          />
        </Panel>
      </Collapse>
    </Card>
  );
};
