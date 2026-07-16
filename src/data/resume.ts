export const resumeData = {
  personalInfo: {
    name: "Gowtham Velusamy",
    role: "Junior QA Tester",
    phone: "+91 7904517141",
    email: "gowthamgv1720@gmail.com",
    location: "Karur, Tamil Nadu",
    linkedin: "www.linkedin.com/in/gowtham-kv",
  },
  summary:
    "QA Test Engineer with 3 years of experience in Manual Testing, Software Testing Life Cycle (STLC), and QA of ML-driven platforms. Proven expertise in Test Case Design & Execution, Defect Lifecycle Management, Regression Testing, and Requirement Traceability Matrix (RTM) preparation. Proficient in API Testing, Test Automation using Python, Selenium, and Robot Framework, and cross-functional collaboration with development and ML teams. Possesses working knowledge of Machine Learning and Deep Learning, enabling effective Quality Assurance on ML pipelines and AI-driven document processing systems.",
  experience: [
    {
      role: "Junior QA Tester",
      company: "Objectways Technologies",
      duration: "July 2023 - Present",
      bullets: [
        "Oversaw end-to-end STLC for internal annotation platforms and ML data pipelines, ensuring 100% test coverage and on-time sprint delivery across all release cycles.",
        "Analyzed BRD, prepared Test Plans, Test Scenarios, and RTM. Executed Functional, Regression, Smoke, Sanity, Integration, E2E, Performance and UAT testing across all modules.",
        "Managed complete Defect Lifecycle in JIRA — raised detailed bug reports with reproducible steps, severity, and priority; prepared Test Summary Reports for stakeholders each cycle.",
        "Led and mentored large volume of team members — handled task allocation, daily stand-ups, test execution planning, performance tracking, and milestone delivery.",
        "Validated API responses via Postman; collaborated cross-functionally with developers, ML engineers, and Business Analysts to maintain quality across all sprint releases.",
        "Designed and implemented test automation framework using Python and Selenium to automate high frequency regression scenarios, scheduled daily execution triggers for repetitive UI workflows.",
      ],
    },
  ],
  skills: {
    "Testing Types": [
      "Manual Testing",
      "Functional Testing",
      "Regression Testing",
      "Smoke & Sanity Testing",
      "Integration Testing",
      "UAT",
      "API Testing",
      "Load & Security Testing",
      "Data Validation",
      "E2E Testing",
      "Cross-browser Testing",
    ],
    Automation: [
      "Python",
      "Java",
      "Selenium WebDriver",
      "Robot Framework",
      "Postman (API Testing)",
      "Pytest",
      "Pandas",
    ],
    Tools: [
      "SQL",
      "Git",
      "GitHub Actions",
      "CI/CD",
      "BrowserStack",
      "JIRA (Defect Tracking)",
      "Appium",
      "TestRail",
      "BDD Cucumber",
      "MS Excel",
    ],
    "AI / ML Knowledge": [
      "Machine Learning",
      "Deep Learning",
      "ML Pipeline Validation",
      "Model Output QA",
    ],
  },
  projects: [
    {
      title: "Blueprint Validation",
      description:
        "Intelligent document processing platform — auto-extracts key-value pairs from uploaded documents and populates target web application fields via an ML engine (Blueprint Creation & Blueprint Response modules).",
      bullets: [
        "Analyzed BRD, prepared RTM and Test Plans; executed Smoke, Sanity, Functional, Integration, Regression, and E2E Testing manually; performed manual Data Validation to verify key-value extraction accuracy across all document types.",
        "Conducted manual API Testing via Postman and used SQL to validate backend data integrity; coordinated UAT, prepared Test Summary Reports, and managed QA members — task allocation, stand-ups, and milestone tracking — collaborating with ML engineers and developers for defect root cause resolution.",
      ],
      tags: [
        "Smoke",
        "Sanity",
        "Functional",
        "Regression",
        "Integration",
        "Data Validation",
        "UAT",
        "E2E",
      ],
    },
    {
      title: "Objectways Website",
      description:
        "Full-cycle manual QA on the organization's main website covering content validation, functional testing, API testing, and load testing on the Egocentric data explorer page.",
      bullets: [
        "Performed manual Functional and Content Validation Testing across all website modules; conducted manual API Testing via Postman validating HTTP methods, URL structures, and payloads; used SQL to cross-verify UI data with backend records; tracked all defects in JIRA through the complete Bug Life Cycle.",
        "For the Contact Us form validation, built a Python-Selenium automation script with a daily 9:00 AM scheduled trigger to automate repetitive form submission and validation scenarios; performed manual Load Testing on the Egocentric data explorer page to verify zero buffering under large file uploads.",
      ],
      tags: [
        "Functional",
        "Content Validation",
        "API Testing",
        "Automation",
        "Load Testing",
        "Regression",
      ],
    },
    {
      title: "PMT – Employee Performance & Resource Tracking Portal",
      description:
        "High-traffic internal web application tracking employee active/idle/offline status, working hours, and generating billing reports for payroll and invoicing across the organization.",
      bullets: [
        "Performed manual Functional Testing across all portal modules; manually validated billing records and data flows against the backend database via SQL; conducted manual API Testing on all service endpoints via Postman to verify request and response accuracy.",
        "Performed manual Stress and Load Testing under concurrent multi-user access scenarios; manually validated billable vs. non-billable hour accuracy across payroll cycles; managed all defects in JIRA through closure each cycle.",
      ],
      tags: [
        "Functional",
        "Automation",
        "API Testing",
        "Data Integrity",
        "Regression",
        "Load",
        "Stress Testing",
      ],
    },
    {
      title: "Liceum.ai — AI-Powered Freelance Marketplace Platform",
      description:
        "An Upwork-style platform where Recruiters post jobs and skill-matched Workers apply, supporting Fixed-Price Milestone-based projects and Hourly billing cycle payments.",
      bullets: [
        "Prepared Test Plans, Test Cases, and RTM across all platform modules; manually executed Functional and Integration Testing covering field-level validations, mandatory field enforcement, milestone status transitions (Pending → Submitted → Approved/Rejected), and verified approved milestone funds are correctly credited to the Worker's account.",
        "Performed manual Negative Testing for unauthorized fund release, empty milestone submissions, and unauthorized contract access; manually validated payment transactions, milestone fund allocations, and billing amounts against UI and invoice values; managed all defects in JIRA through closure.",
      ],
      tags: [
        "Functional",
        "Integration",
        "Negative Testing",
        "UAT",
        "Data Validation",
      ],
    },
  ],
  education: [
    {
      degree: "Data Analytics",
      institution: "SLA Institution",
      duration: "2022 - 2023",
      details: "Grade: A | Chennai, Tamil Nadu",
    },
    {
      degree: "M.Sc. Physics",
      institution: "Karpagam Academy of Higher Education",
      duration: "2020 - 2022",
      details: "CGPA: 8.2 | Coimbatore, Tamil Nadu",
    },
  ],
  awards: [
    {
      title: "Annual High-Achiever Award (2024)",
      description:
        "Recognized as the top-performing Analyst for innovation and sustained project impact across the organization.",
    },
    {
      title: "Monthly Performance Excellence Award (Nov 2023)",
      description:
        "Awarded for outstanding contribution to the Blueprint Creation (BPC) module quality and timely delivery.",
    },
  ],
};
