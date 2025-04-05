export const sampleProjects = [
  {
    _id: "64a3b8c5f8a9d12e34567890",
    name: "Healthcare IT System RFP",
    rfp_number: "HSHQDC-23-R-00001",
    status: "issues", // Added for UI status display
    uploadDate: "2024-01-15", // Added for list view
    bid_decision: {
      recommendation: "no",
      decision_score: 62.5,
      decision_factors: [
        "Missing FedRAMP Moderate Authorization (dealbreaker)",
        "Below eligibility threshold (75/90)",
        "High-risk contract terms (8.5/10)",
      ],
      decision_thresholds: {
        min_eligibility_score: 70,
        max_risk_score: 7.0,
        allow_dealbreakers: false,
      },
      determination: "do_not_apply: failed dealbreakers_check",
    },
    compliance_analysis: {
      legal_eligibility: {
        state_registration: {
          required_states: ["VA", "MD", "DC"],
          status: "compliant",
          validation: [
            {
              state: "VA",
              registration_number: "SWD-2023-0456",
              expiry: "2025-12-31", // Changed from ISODate to string
            },
          ],
        },
        certifications: {
          required: ["CMMI-3", "ISO-27001", "FedRAMP Moderate"],
          status: "non-compliant",
          missing: ["FedRAMP Moderate"],
          compliance_score: 66.7,
        },
        past_performance: {
          required: {
            similar_projects: 3,
            dollar_value: "10M",
            timeframe: "5 years",
          },
          status: "compliant",
          compliance_score: 100,
        },
        dealbreakers: ["FedRAMP Moderate Authorization"],
      },
    },
    eligibility_criteria: {
      mandatory_requirements: [
        {
          type: "security_clearance",
          description: "Facility Clearance Level: Secret",
          standard: "NISPOM 32 CFR Part 117",
          status: "missing",
          critical: true,
        },
        {
          type: "experience",
          description: "Minimum 5 years in FedRAMP environments",
          status: "met",
          critical: false,
        },
      ],
      score: 75,
      threshold: 90,
      eligibility_status: "not_eligible",
    },
    submission_requirements: {
      document_specs: {
        format: {
          page_limit: 50,
          font: {
            type: "Times New Roman",
            size: 12,
          },
          line_spacing: "double",
          margins: "1-inch",
          toc_required: true,
        },
      },
      attachments: {
        required_forms: [
          {
            form_id: "SF-33",
            description: "Solicitation/Contract/Order for Commercial Products",
            status: "available",
          },
        ],
        missing_attachments: [
          {
            form_id: "OF-306",
            description: "Declaration for Federal Employment",
            reason: "Requires notarization",
          },
        ],
      },
    },
    contract_risk_analysis: {
      biased_clauses: [
        {
          clause_type: "termination",
          reference: "FAR 52.212-4(m)",
          text: "Government may terminate contract with 7 days notice without cause",
          risk_level: "high",
          mitigation_status: "unresolved",
        },
      ],
      risk_assessment: {
        score: 8.5,
        threshold: 7.0,
        risk_category: "high",
      },
    },
  },
];
