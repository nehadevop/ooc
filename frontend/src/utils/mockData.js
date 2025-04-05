export const sampleProjects = [
  {
    _id: "1",
    name: "Healthcare IT System RFP",
    status: "completed",
    uploadDate: "2024-04-01",
    analysis: {
      compliance: {
        score: 98,
        checks: [
          { requirement: "HIPAA Compliance", passed: true },
          { requirement: "Data Security", passed: true },
          {
            requirement: "System Availability",
            passed: false,
            message: "Needs 99.99% uptime specification",
          },
        ],
      },
      eligibility: {
        criteria: [
          { title: "Technical Requirements", met: 85 },
          { title: "Financial Requirements", met: 90 },
          { title: "Legal Requirements", met: 95 },
        ],
        missingRequirements: [
          "Disaster Recovery Plan",
          "Performance Metrics Documentation",
        ],
      },
      risks: [
        {
          severity: "high",
          title: "Data Privacy",
          description: "Additional encryption requirements needed",
        },
        {
          severity: "medium",
          title: "Integration Timeline",
          description: "Timeline might be too aggressive",
        },
      ],
      teamMetrics: {
        commentsCount: 24,
        timeSpent: "4.5 hours",
        participants: 5,
      },
    },
  },
  {
    _id: "2",
    name: "Cloud Infrastructure Migration",
    status: "pending",
    uploadDate: "2024-04-03",
    analysis: {
      compliance: {
        score: 92,
        checks: [
          { requirement: "Cloud Security", passed: true },
          {
            requirement: "Data Residency",
            passed: false,
            message: "Location requirements not specified",
          },
        ],
      },
      eligibility: {
        criteria: [
          { title: "Technical Capabilities", met: 75 },
          { title: "Service Level Agreements", met: 80 },
        ],
        missingRequirements: ["Detailed Migration Plan", "Cost Breakdown"],
      },
      risks: [
        {
          severity: "high",
          title: "Service Continuity",
          description: "Downtime mitigation needed",
        },
        {
          severity: "medium",
          title: "Cost Overruns",
          description: "Budget constraints identified",
        },
      ],
      teamMetrics: {
        commentsCount: 18,
        timeSpent: "3.2 hours",
        participants: 4,
      },
    },
  },
  {
    _id: "3",
    name: "Government Security Contract",
    status: "issues",
    uploadDate: "2024-04-05",
    analysis: {
      compliance: {
        score: 95,
        checks: [
          { requirement: "Security Clearance", passed: true },
          { requirement: "Documentation", passed: true },
          {
            requirement: "Certification",
            passed: false,
            message: "Missing ISO certification",
          },
        ],
      },
      eligibility: {
        criteria: [
          { title: "Security Standards", met: 90 },
          { title: "Personnel Requirements", met: 85 },
        ],
        missingRequirements: [
          "Personnel Training Plan",
          "Security Audit History",
        ],
      },
      risks: [
        {
          severity: "high",
          title: "Clearance Requirements",
          description: "Additional vetting needed",
        },
        {
          severity: "medium",
          title: "Documentation",
          description: "More detailed documentation required",
        },
      ],
      teamMetrics: {
        commentsCount: 32,
        timeSpent: "6.8 hours",
        participants: 7,
      },
    },
  },
];
