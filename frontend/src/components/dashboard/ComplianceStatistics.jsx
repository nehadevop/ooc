import { Card, Progress, Row, Col } from "antd";

export const ComplianceStatistics = ({ metrics, totalProjects }) => (
  <Card
    title={<span style={{ color: "#fff" }}>Compliance Statistics</span>}
    bordered={false}
    style={{ background: "rgba(255, 255, 255, 0.08)", borderRadius: "8px" }}
  >
    <Row justify="space-around" align="middle" style={{ height: "100%" }}>
      <Col>
        <Progress
          type="circle"
          percent={metrics.averageCompliance}
          strokeColor="#1890ff"
          trailColor="rgba(255, 255, 255, 0.12)"
          format={(percent) => (
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#fff", fontSize: "16px" }}>
                Average Compliance
              </div>
              <div
                style={{
                  color: "#1890ff",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {percent}%
              </div>
            </div>
          )}
        />
      </Col>
      <Col>
        <Progress
          type="circle"
          percent={Math.round(
            (metrics.completedAnalyses / totalProjects) * 100
          )}
          strokeColor="#52c41a"
          trailColor="rgba(255, 255, 255, 0.12)"
          format={(percent) => (
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#fff", fontSize: "16px" }}>
                Completion Rate
              </div>
              <div
                style={{
                  color: "#52c41a",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {percent}%
              </div>
            </div>
          )}
        />
      </Col>
    </Row>
  </Card>
);
