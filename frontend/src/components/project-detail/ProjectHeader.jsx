import { Card, Row, Col, Typography, Tag } from "antd";
import { statusConfig } from "../../utils/constants";

const { Title, Text } = Typography;

export const ProjectHeader = ({ name, rfpNumber, status }) => (
  <Card bordered={false}>
    <Row justify="space-between" align="middle">
      <Col>
        <Title level={2} style={{ margin: 0, color: "#fff" }}>
          {name}
        </Title>
        <Text style={{ color: "rgba(255, 255, 255, 0.65)" }}>
          RFP Number: {rfpNumber}
        </Text>
      </Col>
      <Col>
        <Tag
          color={statusConfig[status].color}
          icon={statusConfig[status].icon}
        >
          {statusConfig[status].text}
        </Tag>
      </Col>
    </Row>
  </Card>
);
