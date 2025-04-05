import { Card, Collapse, Tag, Typography } from "antd";
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
      <Collapse defaultActiveKey={["1", "2", "3", "4"]}>
        <Panel header="Compliance Check" key="1">
          {analysis.compliance.map((item, index) => (
            <div key={index} style={{ marginBottom: "8px" }}>
              {item.passed ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  {item.requirement}
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {item.requirement}
                </Tag>
              )}
              {!item.passed && <Text type="danger"> - {item.message}</Text>}
            </div>
          ))}
        </Panel>

        <Panel header="Eligibility Criteria" key="2">
          {analysis.eligibility.map((item, index) => (
            <div key={index} style={{ marginBottom: "8px" }}>
              {item.met ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  {item.criteria}
                </Tag>
              ) : (
                <Tag icon={<WarningOutlined />} color="warning">
                  {item.criteria}
                </Tag>
              )}
              <Text>{item.description}</Text>
            </div>
          ))}
        </Panel>

        <Panel header="Submission Checklist" key="3">
          <ul>
            {analysis.checklist.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Panel>

        <Panel header="Contract Risks" key="4">
          {analysis.risks.map((risk, index) => (
            <div key={index} style={{ marginBottom: "16px" }}>
              <Title level={5}>{risk.title}</Title>
              <Text>{risk.description}</Text>
              {risk.suggestion && (
                <div style={{ marginTop: "8px" }}>
                  <Text strong>Suggestion: </Text>
                  <Text type="secondary">{risk.suggestion}</Text>
                </div>
              )}
            </div>
          ))}
        </Panel>
      </Collapse>
    </Card>
  );
};
