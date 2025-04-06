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
  {
    _id: "56a3b8c5f8a9d12e34567891",
    name: "TEMPORARY STAFFING SERVICES",
    uploadDate: "2025-01-15", // Added for list view
    rfp_number: "RFP 25-008",
    status: "completed", // Initial status
    bid_decision: {
      recommendation: "yes",
      decision_score: 68.5, // (83*0.6) + ((10-6.8)*10)*0.4
      decision_factors: [
        "Meets experience requirements (7/3 years)",
        "Missing CARF accreditation (dealbreaker)",
        "Adequate insurance coverage",
        "High-risk termination clause",
      ],
      decision_thresholds: {
        min_eligibility_score: 70,
        max_risk_score: 7.0,
        allow_dealbreakers: false,
      },
      determination:
        "conditional_approval: requires CARF accreditation and risk mitigation",
    },
    compliance_analysis: {
      legal_eligibility: {
        state_registration: {
          required_states: ["TX"], // Implied by Tarrant County location
          status: "non-compliant", // Missing TX registration in company data
          validation: [], // No validation records provided
        },
        certifications: {
          required: ["CARF"], // From Page 5 (MHMR is CARF accredited)
          status: "non-compliant",
          missing: ["CARF"],
          compliance_score: 90,
        },
        past_performance: {
          required: {
            similar_projects: 3, // Page 8: "minimum 3 years of business"
            dollar_value: "10M", // Estimated from scope
            timeframe: "5 years", // Standard for gov contracts
          },
          status: "compliant", // 7 years experience (Page 8)
          compliance_score: 100,
        },
        dealbreakers: [
          "Missing Texas state registration",
          "Missing CARF accreditation",
        ],
      },
    },
    eligibility_criteria: {
      mandatory_requirements: [
        {
          type: "experience",
          description: "Minimum 3 years in Temporary Staffing Services",
          status: "met", // 7 years experience
          critical: true,
        },
        {
          type: "insurance",
          description: "Workers' Comp ($500k), Liability ($1M), Auto ($500k)",
          standard: "Page 20 requirements",
          status: "met", // Travelers policy covers amounts
          critical: true,
        },
        {
          type: "licensure",
          description: "Texas Employment Agency License",
          status: "met", // TXEA-34892
          critical: false,
        },
      ],
      score: 83, // Meets 5/6 key requirements
      threshold: 70,
      eligibility_status: "eligible",
    },
    submission_requirements: {
      document_specs: {
        format: {
          page_limit: 0, // No limit specified
          font: { type: "unspecified", size: 12 }, // Default assumed
          line_spacing: "unspecified",
          margins: "1-inch", // Standard for gov docs
          toc_required: true, // Page 13: "Table of Contents"
        },
      },
      attachments: {
        required_forms: [
          {
            form_id: "W-9",
            description: "Tax Identification Form",
            status: "available", // Provided in company data
          },
          {
            form_id: "HUB",
            description: "Historically Underutilized Business Form",
            status: "missing", // Not certified
            reason: "Company not HUB certified",
          },
        ],
        missing_attachments: ["Attachment A (HUB Form)"],
      },
    },
    contract_risk_analysis: {
      biased_clauses: [
        {
          clause_type: "termination",
          reference: "Section 10.3",
          text: "MHMR may terminate with 30 days notice without cause",
          risk_level: "high",
          mitigation_status: "unresolved",
        },
        {
          clause_type: "pricing",
          reference: "Page 10 item 24",
          text: "No rate increases allowed during contract term",
          risk_level: "medium",
          mitigation_status: "unresolved",
        },
      ],
      risk_assessment: {
        score: 6.8, // 0-10 scale
        threshold: 7.0,
        risk_category: "medium",
      },
    },
  },
  {
    _id: "56a3b8c5f8a9d12e34567867",
    name: "Website Development & Maintenance",
    rfp_number: "25-0037",
    status: "issues",
    uploadDate: "2025-02-18",
    bid_decision: {
      recommendation: "no",
      decision_score: 54.2,
      decision_factors: [
        "Missing Native/Mohawk business certification (dealbreaker)",
        "Insufficient tribal workforce engagement plan",
        "No proof of Craft CMS 3 experience",
        "Below evaluation threshold (75/102)",
      ],
      decision_thresholds: {
        min_eligibility_score: 70,
        max_risk_score: 7.0,
        allow_dealbreakers: false,
      },
      determination: "do_not_apply: failed mandatory preference requirements",
    },
    compliance_analysis: {
      legal_eligibility: {
        state_registration: {
          required_states: ["NY"],
          status: "compliant",
          validation: [
            {
              state: "NY",
              registration_number: "SRN-DE-0923847",
              expiry: "2025-12-31",
            },
          ],
        },
        certifications: {
          required: ["Native Owned Business Certification"],
          status: "non-compliant",
          missing: ["SRMT Native Business Certification"],
          compliance_score: 70,
        },
        past_performance: {
          required: {
            similar_projects: 3,
            dollar_value: "$500k",
            timeframe: "5 years",
          },
          status: "compliant",
          compliance_score: 100,
        },
        dealbreakers: [
          "Not Native/Mohawk certified business",
          "No tribal workforce engagement plan",
        ],
      },
    },
    eligibility_criteria: {
      mandatory_requirements: [
        {
          type: "preference_certification",
          description: "Native/Mohawk Business Certification",
          status: "missing",
          critical: true,
        },
        {
          type: "insurance",
          description: "$1M General Liability & Auto Coverage",
          status: "met",
          critical: false,
        },
        {
          type: "experience",
          description: "Craft CMS 3 Implementation",
          status: "undocumented",
          critical: true,
        },
      ],
      score: 62,
      threshold: 75,
      eligibility_status: "not_eligible",
    },
    submission_requirements: {
      document_specs: {
        format: {
          page_limit: "unspecified",
          font: {
            type: "unspecified",
            size: 12,
          },
          line_spacing: "unspecified",
          margins: "standard",
          toc_required: true,
        },
      },
      attachments: {
        required_forms: [
          {
            form_id: "SRMT-Combined-Certs",
            description: "Lobbying/Debarment/Drug-Free Certifications",
            status: "missing",
          },
          {
            form_id: "Attachment-A",
            description: "Native Preference Certification",
            status: "missing",
          },
        ],
        missing_attachments: [
          {
            form_id: "MWBE",
            description: "Minority/Women Business Certification",
            reason: "Not certified",
          },
        ],
      },
    },
    contract_risk_analysis: {
      biased_clauses: [
        {
          clause_type: "compliance",
          reference: "Section 4.II.C",
          text: "$250/day penalties for workforce non-compliance",
          risk_level: "high",
          mitigation_status: "unresolved",
        },
        {
          clause_type: "termination",
          reference: "Section 5.d",
          text: "Immediate termination for certification misrepresentation",
          risk_level: "critical",
          mitigation_status: "unresolved",
        },
      ],
      risk_assessment: {
        score: 8.9,
        threshold: 7.0,
        risk_category: "high",
      },
    },
  },
];
