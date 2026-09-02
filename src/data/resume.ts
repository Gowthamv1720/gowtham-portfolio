export const resumeData = {
  personalInfo: {
    name: "Gowtham Velusamy",
    role: "Junior QA Engineer | QA Test Engineer",
    phone: "+91 7904517141",
    email: "gowthamkv1720@gmail.com",
    location: "Karur, Tamil Nadu, India",
    linkedin: "www.linkedin.com/in/gowtham-kv",
  },
  summary:
    "Results-driven QA Test Engineer with 3.1 years of experience specializing in Manual Testing, Software Testing Life Cycle (STLC), API Testing, and Quality Assurance for Machine Learning (ML)-driven platforms. Demonstrated expertise in Test Case design and execution, Requirement Traceability Matrix (RTM) preparation, and end-to-end Defect Lifecycle Management in JIRA. Proficient in web automation using Python, Selenium WebDriver, Pytest, and Robot Framework, backend database validation using SQL, and API testing with Postman. Proven track record of cross-functional collaboration with developers, ML engineers, and business analysts to deliver high-quality AI document processing systems and web applications.",
  experience: [
    {
      role: "Junior QA Tester / QA Engineer",
      company: "Objectways Technologies",
      location: "Tamil Nadu, India",
      duration: "July 2023 - Present",
      bullets: [
        "Oversaw end-to-end Software Testing Life Cycle (STLC) for internal annotation platforms and ML data pipelines, ensuring 100% test coverage and on-time sprint delivery across all release cycles.",
        "Analyzed Business Requirement Documents (BRD), prepared Test Plans, Test Scenarios, and Requirement Traceability Matrix (RTM). Executed Functional, Regression, Smoke, Sanity, Integration, E2E, Performance, and UAT testing across all platform modules.",
        "Managed complete Defect Lifecycle in JIRA — logged detailed bug reports with reproducible steps, severity, and priority; authored comprehensive Test Summary Reports for stakeholders after each sprint cycle.",
        "Led and mentored QA team members — handled task allocation, daily stand-up coordination, test execution planning, team performance tracking, and milestone delivery.",
        "Validated REST API responses and payloads via Postman; collaborated cross-functionally with software developers, ML engineers, and Business Analysts to maintain strict quality standards across all release builds.",
        "Designed and implemented a test automation framework using Python and Selenium WebDriver to automate high-frequency regression test scenarios, scheduling daily execution triggers for repetitive UI workflows.",
      ],
    },
  ],
  skills: {
    "Testing Types & Methodologies": [
      "Manual Testing",
      "Functional Testing",
      "Regression Testing",
      "Smoke & Sanity Testing",
      "Integration Testing",
      "User Acceptance Testing (UAT)",
      "REST API Testing",
      "End-to-End (E2E) Testing",
      "Load & Stress Testing",
      "Performance Testing",
      "Security Testing",
      "Data Validation",
      "Cross-Browser Testing",
      "Negative Testing",
      "Content Validation",
    ],
    "Automation & Programming": [
      "Python",
      "Java",
      "Selenium WebDriver",
      "Robot Framework",
      "Postman (API Testing)",
      "Pytest",
      "Pandas",
      "HTML",
      "CSS",
    ],
    "Tools & Infrastructure": [
      "JIRA (Defect Tracking)",
      "SQL",
      "Git",
      "GitHub Actions",
      "CI/CD Pipelines",
      "BrowserStack",
      "Chrome DevTools",
      "Appium",
      "TestRail",
      "BDD Cucumber",
      "MS Excel",
      "Figma",
      "WordPress",
    ],
    "AI / ML Knowledge": [
      "Machine Learning",
      "Deep Learning",
      "ML Pipeline Validation",
      "Model Output QA",
      "AI Document Processing QA",
      "On-Page SEO Validation",
    ],
  },
  projects: [
    {
      title: "Blueprint Validation (AI/ML Intelligent Document Processing Platform)",
      description:
        "Intelligent document processing platform that auto-extracts key-value pairs from uploaded documents and populates target web application fields via an ML engine (Blueprint Creation & Blueprint Response modules).",
      bullets: [
        "Analyzed BRD, prepared RTM and Test Plans; executed Smoke, Sanity, Functional, Integration, Regression, and E2E Testing manually; performed manual Data Validation to verify key-value extraction accuracy across all document types.",
        "Conducted manual API Testing via Postman and used SQL queries to validate backend database integrity; coordinated UAT, prepared Test Summary Reports, and managed QA team members (task allocation, stand-ups, milestone tracking), collaborating with ML engineers and developers for defect root cause resolution.",
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
        "SQL",
        "API Testing",
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
        "API Testing",
        "SQL Validation",
        "Regression",
        "Load & Stress Testing",
        "JIRA",
      ],
    },
    {
      title: "Website Testing & Data Explorer QA (Objectways Platform)",
      description:
        "Full-cycle manual QA, SEO audit, and test automation for corporate WordPress website and high-traffic data explorer modules.",
      bullets: [
        "Executed end-to-end manual QA on a WordPress website, validating responsive UI, layout consistency, and cross-browser functionality across desktop, tablet, and mobile devices.",
        "Conducted pixel-perfect design comparisons against Figma wireframes and audited on-page SEO elements (meta tags, image alt text, redirects).",
        "Built a Python-Selenium automation script to automate daily functional testing for the 'Contact Us' lead-capture form with a scheduled daily trigger.",
        "Tested REST API payloads using Postman, verified backend data integrity via SQL, executed load testing on high-traffic data explorer pages (verifying zero buffering under large file uploads), and managed defect lifecycles in JIRA.",
      ],
      tags: [
        "Functional",
        "Content Validation",
        "API Testing",
        "Python-Selenium",
        "Load Testing",
        "SEO Audit",
        "Figma",
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
        "JIRA",
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
