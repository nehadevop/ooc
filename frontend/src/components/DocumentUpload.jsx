import { Upload, Button, message, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const DocumentUpload = ({ onUpload }) => {
  const props = {
    beforeUpload: (file) => {
      if (file.type !== "application/pdf") {
        message.error("Only PDF files are allowed");
        return false;
      }
      onUpload(file);
      return false;
    },
    showUploadList: false,
  };

  return (
    <Card title="Upload RFP Document" style={{ marginBottom: "20px" }}>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select RFP File</Button>
      </Upload>
    </Card>
  );
};
