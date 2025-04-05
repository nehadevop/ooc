import { useState } from "react";
import { Upload, Button, message, Card, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { projectsService } from "../services/projectsService";
import { validateFile } from "../utils/fileUtils";

export const ProjectUploadForm = ({ onAnalysisComplete }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file) => {
    try {
      setUploading(true);
      validateFile(file);

      // Upload project file
      const uploadResult = await projectsService.uploadProject(file);

      // Get analysis
      const analysis = await projectsService.getAnalysis(
        uploadResult.projectId
      );

      message.success("Project uploaded and analyzed successfully");
      onAnalysisComplete(analysis);
    } catch (error) {
      message.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      handleUpload(file);
      return false;
    },
    showUploadList: false,
  };

  return (
    <Card title="Upload RFP File" style={{ marginBottom: "20px" }}>
      <Spin spinning={uploading}>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} disabled={uploading}>
            {uploading ? "Processing..." : "Select RFP File"}
          </Button>
        </Upload>
      </Spin>
    </Card>
  );
};
