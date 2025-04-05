import { Card, Descriptions, Tag, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const SubmissionRequirements = ({ requirements }) => (
  <Card
    title={
      <span style={{ color: "#fff" }}>
        <FormOutlined /> Submission Requirements
      </span>
    }
    bordered={false}
    className="dark-theme-card"
  >
    <Descriptions bordered column={1}>
      <Descriptions.Item
        label={
          <span style={{ color: "rgba(255, 255, 255, 0.85)" }}>
            Document Format
          </span>
        }
      >
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            color: "rgba(255, 255, 255, 0.65)",
          }}
        >
          <li>Page Limit: {requirements.document_specs.format.page_limit}</li>
          <li>
            Font: {requirements.document_specs.format.font.type},{" "}
            {requirements.document_specs.format.font.size}pt
          </li>
          <li>Spacing: {requirements.document_specs.format.line_spacing}</li>
          <li>Margins: {requirements.document_specs.format.margins}</li>
          <li>
            TOC Required:{" "}
            {requirements.document_specs.format.toc_required ? "Yes" : "No"}
          </li>
        </ul>
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <span style={{ color: "rgba(255, 255, 255, 0.85)" }}>
            Required Forms
          </span>
        }
      >
        {requirements.attachments.required_forms.map((form) => (
          <Tag key={form.form_id} color="processing" style={{ margin: "4px" }}>
            {form.form_id}: {form.description}
          </Tag>
        ))}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <span style={{ color: "rgba(255, 255, 255, 0.85)" }}>
            Missing Attachments
          </span>
        }
      >
        {requirements.attachments.missing_attachments.map((att) => (
          <div key={att.form_id} style={{ marginBottom: "8px" }}>
            <Tag color="error">{att.form_id}</Tag>
            <Text style={{ color: "rgba(255, 255, 255, 0.65)" }}>
              {" "}
              - {att.reason}
            </Text>
          </div>
        ))}
      </Descriptions.Item>
    </Descriptions>
  </Card>
);
