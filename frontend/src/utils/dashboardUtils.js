export const calculateMetrics = (projects) => {
  return {
    activeProjects: projects.filter((p) => p.status === "pending").length,
    completedAnalyses: projects.filter((p) => p.status === "completed").length,
    pendingReviews: projects.filter((p) => p.status === "issues").length,
    teamMembers: Math.max(
      ...projects.map((p) => p.analysis.teamMetrics.participants)
    ),
    averageCompliance: Math.round(
      projects.reduce((acc, p) => acc + p.analysis.compliance.score, 0) /
        projects.length
    ),
  };
};

export const generateRecentActivities = (projects) => {
  return projects.map((project) => ({
    key: project._id,
    project: project.name,
    action: getActionByStatus(project.status),
    time: new Date(project.uploadDate).toLocaleDateString(),
    status: getStatusType(project.status),
  }));
};

const getActionByStatus = (status) => {
  switch (status) {
    case "completed":
      return "Analysis Completed";
    case "pending":
      return "In Progress";
    case "issues":
      return "Issues Found";
    default:
      return "Status Unknown";
  }
};

const getStatusType = (status) => {
  switch (status) {
    case "completed":
      return "success";
    case "pending":
      return "info";
    case "issues":
      return "warning";
    default:
      return "info";
  }
};
