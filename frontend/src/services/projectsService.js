import { apiClient } from "./api";

export const projectsService = {
  // Upload project
  async uploadProject(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await apiClient.post("/projects/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to upload project"
      );
    }
  },

  // Get analysis results
  async getAnalysis(projectId) {
    try {
      const response = await apiClient.get(`/projects/${projectId}/analysis`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get analysis"
      );
    }
  },

  // Get projects list
  async getProjects() {
    try {
      const response = await apiClient.get("/projects");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch projects"
      );
    }
  },

  // Get single project details
  async getProject(id) {
    try {
      const response = await apiClient.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch project details"
      );
    }
  },
};
