export interface Project {
  id: number;
  name: string;
  category: string;
  client: string;
  period: string;
  url?: string;
  description: string;
  longDescription: string;
  technologies: string[];
  achievements: { metric: string; label: string }[];
  keyFeatures: string[];
  challenges: string;
  solution: string;
  impact: string;
  problemStatement?: string;
  architecture?: string;
  lessonsLearned?: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    name: "CrimeTrax - Law Enforcement Analytics Platform",
    category: "Enterprise Platform",
    client: "Law Enforcement Agency",
    period: "2023 - Present",
    description: "A comprehensive microservices-based analytics platform for law enforcement agencies, enabling real-time crime analysis, predictive policing, and resource optimization.",
    longDescription: "CrimeTrax is a cloud-native platform built using .NET microservices architecture with Dapr. It processes millions of data points daily, providing real-time analytics and insights to law enforcement agencies. The platform includes advanced features like predictive analytics, resource allocation optimization, and comprehensive reporting dashboards. The system handles complex workflows including incident reporting, case management, evidence tracking, and statistical analysis.",
    technologies: [".NET 8", "Dapr", "Kubernetes", "Azure AKS", "CQRS", "Event Sourcing", "Angular", "Azure Cosmos DB", "Redis", "Azure Service Bus"],
    achievements: [
      { metric: "99.9%", label: "Uptime" },
      { metric: "40%", label: "Throughput Improvement" },
      { metric: "100K+", label: "Daily Active Users" }
    ],
    keyFeatures: [
      "Microservices architecture with Dapr pub/sub and state management",
      "CQRS/Mediator pattern for read/write separation",
      "Real-time analytics dashboard with Angular",
      "Horizontal scalability with Kubernetes",
      "Event-driven architecture for real-time updates",
      "Comprehensive audit logging and compliance",
      "Predictive analytics using machine learning models",
      "Multi-tenant architecture supporting multiple agencies"
    ],
    challenges: "Migrating from monolithic legacy system while maintaining zero downtime and ensuring data integrity across millions of records",
    solution: "Implemented blue-green deployment strategy with gradual traffic migration, dual-write pattern for data consistency, and comprehensive rollback mechanisms",
    impact: "Reduced incident response time by 35%, improved resource allocation efficiency by 28%, and enabled real-time decision making for law enforcement operations",
    problemStatement: "Law enforcement agencies needed a modern, scalable platform to replace legacy systems that couldn't handle increasing data volumes and lacked real-time analytics capabilities.",
    architecture: "Built on microservices architecture with Dapr for service-to-service communication. Used CQRS pattern to separate read and write operations, improving query performance. Implemented event sourcing for audit trails and event-driven workflows for real-time updates.",
    lessonsLearned: [
      "CQRS pattern significantly improves read performance in high-traffic scenarios",
      "Dapr simplifies microservices communication and state management",
      "Gradual migration strategies reduce risk in enterprise deployments",
      "Event-driven architecture enables real-time capabilities effectively"
    ]
  },
  {
    id: 2,
    name: "JusticeTrax LIMS-plus - Laboratory Management System",
    category: "Enterprise Modernization",
    client: "Versaterm JusticeTrax",
    period: "2021 - 2023",
    description: "Modernized legacy laboratory information management system to microservices architecture using Azure Functions and Blazor WASM.",
    longDescription: "JusticeTrax LIMS-plus is a complete modernization of a legacy laboratory management system. The project involved breaking down a monolithic application into microservices, implementing Azure Functions for serverless processing, and building a modern Blazor WebAssembly frontend. The system handles complex workflows for evidence processing, chain of custody, and compliance reporting. It integrates with external lab equipment and provides real-time tracking of evidence through the entire lifecycle.",
    technologies: ["Azure Functions", "Blazor WASM", ".NET 6", "Azure Service Bus", "SQL Server", "Azure AD", "Azure Key Vault", "Azure Storage"],
    achievements: [
      { metric: "60%", label: "Deployment Time Reduction" },
      { metric: "50%", label: "Infrastructure Cost Savings" },
      { metric: "45%", label: "Performance Improvement" }
    ],
    keyFeatures: [
      "Serverless microservices with Azure Functions",
      "Modern Blazor WebAssembly frontend",
      "Real-time evidence tracking and chain of custody",
      "Automated compliance reporting",
      "Integration with external lab equipment",
      "Role-based access control with Azure AD",
      "Secure document storage with Azure Storage",
      "Automated workflow orchestration"
    ],
    challenges: "Maintaining data integrity during migration from legacy system while ensuring zero downtime and compliance with regulatory requirements",
    solution: "Implemented dual-write pattern with validation and rollback mechanisms, gradual feature migration, and comprehensive testing strategy",
    impact: "Improved processing time by 45%, reduced manual errors by 60%, and enabled faster feature delivery with modern architecture",
    problemStatement: "The legacy LIMS system was difficult to maintain, expensive to scale, and couldn't support modern requirements like real-time tracking and mobile access.",
    architecture: "Microservices architecture using Azure Functions for serverless compute. Blazor WASM provides a modern, responsive frontend. Azure Service Bus handles asynchronous communication between services. SQL Server stores transactional data with Azure Storage for documents.",
    lessonsLearned: [
      "Serverless architecture reduces infrastructure management overhead",
      "Blazor WASM provides excellent performance for complex UIs",
      "Gradual migration reduces risk and allows for learning",
      "Modern architecture enables faster feature development"
    ]
  },
  {
    id: 3,
    name: "AI-Powered RAG Pipeline for Enterprise Documentation",
    category: "AI/ML Platform",
    client: "Internal Project",
    period: "2024 - Present",
    description: "Built Retrieval-Augmented Generation (RAG) pipeline for enterprise documentation, enabling intelligent search and Q&A capabilities using LLMs.",
    longDescription: "An enterprise-grade RAG system that allows organizations to query their internal documentation using natural language. The system uses vector embeddings, semantic search, and LLM integration to provide accurate, context-aware answers from company knowledge bases. It supports multiple document types, maintains conversation context, and provides source citations for transparency. The system is optimized for latency and cost while maintaining high accuracy.",
    technologies: ["Python", "Azure OpenAI", "Azure Cognitive Search", "Vector Databases", "LangChain", "Next.js", "TypeScript", "Redis"],
    achievements: [
      { metric: "85%", label: "Query Accuracy" },
      { metric: "2s", label: "Average Response Time" },
      { metric: "60%", label: "Cost Reduction" }
    ],
    keyFeatures: [
      "Vector search with Azure Cognitive Search",
      "Multi-document chunking and embedding",
      "Context-aware LLM responses",
      "Hybrid search (vector + keyword)",
      "Token usage optimization",
      "Secure access control and audit logging",
      "Conversation history and context management",
      "Source citation and transparency"
    ],
    challenges: "Optimizing latency and cost for production use while maintaining high accuracy and handling large document collections",
    solution: "Implemented caching, prompt optimization, selective retrieval strategies, and hybrid search combining vector and keyword search",
    impact: "Reduced support ticket volume by 40%, improved employee productivity, and enabled self-service information access",
    problemStatement: "Employees spent significant time searching through documentation to find answers. Traditional keyword search was insufficient for complex queries.",
    architecture: "Document ingestion pipeline processes and chunks documents, generating embeddings stored in Azure Cognitive Search. Query pipeline retrieves relevant chunks, assembles context, and sends to LLM for generation. Redis caching reduces latency and costs.",
    lessonsLearned: [
      "Hybrid search (vector + keyword) improves accuracy",
      "Prompt engineering significantly impacts response quality",
      "Caching is crucial for cost optimization in LLM applications",
      "Chunking strategy directly affects retrieval accuracy"
    ]
  },
  {
    id: 4,
    name: "Amphion Medical Solutions Web Platform",
    category: "Healthcare Platform",
    client: "Amphion Medical Solutions (U.S)",
    period: "2019 - 2020",
    description: "Comprehensive medical solutions platform with role-based workflows, operational support, and secure patient data management.",
    longDescription: "A full-featured healthcare platform designed for medical facilities to manage patient records, appointments, billing, and operational workflows. The platform ensures HIPAA compliance, provides role-based access control, and integrates with various medical devices and third-party systems. It includes features for appointment scheduling, patient history tracking, billing and insurance processing, and comprehensive reporting.",
    technologies: ["ASP.NET Core", "C#", "SQL Server", "Entity Framework", "Azure", "React", "SignalR", "Azure AD"],
    achievements: [
      { metric: "30%", label: "Defect Reduction" },
      { metric: "10 hrs/week", label: "Time Saved" },
      { metric: "20%", label: "Efficiency Gain" }
    ],
    keyFeatures: [
      "HIPAA-compliant patient data management",
      "Role-based workflow automation",
      "Real-time appointment scheduling",
      "Integrated billing and insurance processing",
      "Secure document management",
      "Comprehensive audit trails",
      "Real-time notifications with SignalR",
      "Mobile-responsive design"
    ],
    challenges: "Ensuring HIPAA compliance while maintaining system performance and providing excellent user experience",
    solution: "Implemented encryption at rest and in transit, comprehensive audit logging, role-based access controls, and performance optimization",
    impact: "Reduced administrative overhead by 30%, improved patient satisfaction scores, and enabled better care coordination",
    problemStatement: "Medical facilities needed a modern platform to replace paper-based and legacy systems, ensuring HIPAA compliance while improving efficiency.",
    architecture: "ASP.NET Core backend with React frontend. SQL Server for transactional data. Azure AD for authentication. SignalR for real-time updates. Azure Storage for document management.",
    lessonsLearned: [
      "HIPAA compliance requires careful design from the start",
      "Real-time features significantly improve user experience",
      "Comprehensive audit trails are essential for healthcare",
      "Performance optimization is critical for healthcare workflows"
    ]
  },
  {
    id: 5,
    name: "Customer Portal Platform (Rollick)",
    category: "E-Commerce Platform",
    client: "Rollick",
    period: "2020 - 2023",
    description: "React-based customer portals backed by .NET microservices with automated CI/CD, serving thousands of customers with high availability.",
    longDescription: "A multi-tenant customer portal platform that enables businesses to manage their customer relationships, orders, and services. Built with React frontend and .NET microservices backend, the platform supports multiple brands and provides white-label capabilities. It includes features for order management, customer self-service, real-time tracking, and comprehensive analytics.",
    technologies: ["React", "Next.js", ".NET Core", "Microservices", "AWS", "Docker", "GitHub Actions", "PostgreSQL", "Redis"],
    achievements: [
      { metric: "90%", label: "Defect Reduction" },
      { metric: "20+ hrs/week", label: "Time Saved" },
      { metric: "15 min", label: "MTTR" }
    ],
    keyFeatures: [
      "Multi-tenant architecture",
      "Real-time order tracking",
      "Customer self-service portal",
      "Automated CI/CD pipelines",
      "Fault tolerance and auto-recovery",
      "Comprehensive analytics dashboard",
      "White-label capabilities",
      "Mobile-responsive design"
    ],
    challenges: "Ensuring zero downtime during deployments and maintaining high availability across multiple tenants",
    solution: "Implemented blue-green deployments with automated health checks and rollback, comprehensive monitoring, and fault tolerance patterns",
    impact: "Achieved 99.95% uptime, reduced deployment-related incidents by 90%, and enabled faster feature delivery",
    problemStatement: "Businesses needed a scalable, reliable platform to serve multiple brands with white-label capabilities while maintaining high availability.",
    architecture: "React/Next.js frontend with .NET Core microservices backend. PostgreSQL for data storage. Redis for caching. Docker containers deployed on AWS. GitHub Actions for CI/CD.",
    lessonsLearned: [
      "Blue-green deployments eliminate downtime",
      "Multi-tenant architecture requires careful data isolation",
      "Automated testing is crucial for microservices",
      "Comprehensive monitoring enables proactive issue resolution"
    ]
  },
  {
    id: 6,
    name: "ProSight Insurance Portal",
    category: "Insurance Platform",
    client: "Prosight Insurance",
    period: "2018 - 2019",
    description: "Insurance domain platform delivering policy management, claims processing, and customer portal with high-performance UI and API integrations.",
    longDescription: "A comprehensive insurance platform that enables customers to manage policies, file claims, track claim status, and access policy documents. The platform includes an admin portal for insurance agents and a customer-facing portal with responsive design and real-time updates. It integrates with payment processors, document management systems, and external insurance databases.",
    technologies: ["ASP.NET", "SQL Server", "Entity Framework", "Azure", "JavaScript", "jQuery", "Bootstrap", "Azure Blob Storage"],
    achievements: [
      { metric: "10%", label: "User Engagement Increase" },
      { metric: "20%", label: "Throughput Improvement" },
      { metric: "1000ms", label: "Latency Reduction" }
    ],
    keyFeatures: [
      "Policy management and renewal automation",
      "Claims filing and tracking system",
      "Document upload and management",
      "Payment processing integration",
      "Real-time notifications",
      "Mobile-responsive design",
      "Agent dashboard and analytics",
      "Compliance reporting"
    ],
    challenges: "Handling high concurrent user load during peak claim filing periods while maintaining fast response times",
    solution: "Implemented database indexing, query optimization, caching strategies, and asynchronous processing for heavy operations",
    impact: "Improved page load times by 40%, increased customer satisfaction, and reduced call center volume",
    problemStatement: "Insurance customers needed a modern, user-friendly platform to manage policies and file claims without calling customer service.",
    architecture: "ASP.NET MVC backend with JavaScript/jQuery frontend. SQL Server with optimized indexes. Azure Blob Storage for documents. Caching layer for frequently accessed data.",
    lessonsLearned: [
      "Database optimization is critical for high-traffic applications",
      "Caching significantly improves performance",
      "Asynchronous processing prevents blocking",
      "User experience directly impacts customer satisfaction"
    ]
  },
  {
    id: 7,
    name: "Microservices Migration Framework",
    category: "Architecture & Tools",
    client: "Internal Project",
    period: "2023 - Present",
    description: "Developed a comprehensive framework and tooling for migrating monolithic applications to microservices architecture using Dapr.",
    longDescription: "A reusable framework and set of tools that accelerates the migration of legacy monolithic applications to modern microservices architecture. The framework includes code generators, migration patterns, testing utilities, and deployment automation. It has been successfully used in multiple migration projects, reducing migration time and risk while ensuring best practices.",
    technologies: [".NET", "Dapr", "Kubernetes", "Helm", "Terraform", "Docker", "Azure DevOps", "PowerShell"],
    achievements: [
      { metric: "50%", label: "Migration Time Reduction" },
      { metric: "3", label: "Successful Migrations" },
      { metric: "40%", label: "Code Reusability" }
    ],
    keyFeatures: [
      "Automated service extraction tools",
      "Dapr integration templates",
      "Kubernetes deployment automation",
      "Migration testing framework",
      "Documentation and best practices",
      "Monitoring and observability setup",
      "Code generation utilities",
      "Migration pattern library"
    ],
    challenges: "Ensuring backward compatibility during migration while maintaining system functionality and minimizing risk",
    solution: "Implemented API gateway pattern with gradual service extraction, comprehensive testing, and rollback capabilities",
    impact: "Enabled faster time-to-market for new features, improved system scalability, and reduced technical debt",
    problemStatement: "Organizations needed a systematic approach to migrate legacy monoliths to microservices without disrupting business operations.",
    architecture: "Framework includes code generators, templates, and automation scripts. Uses Dapr for service communication. Kubernetes for orchestration. Terraform for infrastructure as code.",
    lessonsLearned: [
      "Gradual migration reduces risk",
      "API gateway pattern enables smooth transitions",
      "Comprehensive testing is essential",
      "Reusable frameworks accelerate future migrations"
    ]
  },
  {
    id: 8,
    name: "Event-Driven Analytics Platform",
    category: "Data Platform",
    client: "Internal Project",
    period: "2023 - Present",
    description: "Built a real-time event-driven analytics platform processing millions of events daily with sub-second latency.",
    longDescription: "A high-throughput event processing platform that ingests, processes, and analyzes millions of events in real-time. The platform uses event sourcing, CQRS, and stream processing to provide real-time analytics and insights. It supports multiple event sources, provides real-time dashboards, and enables complex event processing patterns. The system is designed for horizontal scalability and high availability.",
    technologies: ["Azure Event Hubs", "Azure Stream Analytics", ".NET", "Kafka", "Redis", "Power BI", "Azure Data Lake", "Azure Functions"],
    achievements: [
      { metric: "1M+", label: "Events/Day" },
      { metric: "<500ms", label: "Processing Latency" },
      { metric: "99.9%", label: "Uptime" }
    ],
    keyFeatures: [
      "Real-time event ingestion and processing",
      "Stream analytics and aggregations",
      "Event sourcing and replay capabilities",
      "Real-time dashboards and alerts",
      "Scalable architecture with auto-scaling",
      "Data retention and archival",
      "Complex event processing",
      "Multi-source event integration"
    ],
    challenges: "Handling event spikes and maintaining low latency while processing millions of events daily",
    solution: "Implemented auto-scaling, message batching, optimized processing pipelines, and efficient data storage strategies",
    impact: "Enabled real-time decision making, improved operational efficiency, and provided actionable insights from event data",
    problemStatement: "Organizations needed to process and analyze high volumes of events in real-time to enable data-driven decision making.",
    architecture: "Azure Event Hubs for ingestion. Azure Stream Analytics for processing. .NET services for custom processing. Redis for caching. Azure Data Lake for storage. Power BI for visualization.",
    lessonsLearned: [
      "Event-driven architecture enables real-time capabilities",
      "Auto-scaling is essential for variable workloads",
      "Batching improves throughput",
      "Event sourcing provides valuable audit capabilities"
    ]
  },
  {
    id: 9,
    name: "NexusEd — Collaborative EdTech Platform",
    category: "Product / SaaS",
    client: "SandyTech (Own Product)",
    period: "2024 - Present",
    url: "https://nexused.net",
    description: "Full-stack collaborative EdTech platform with WebRTC live classrooms, AI tutor powered by GPT-4o Vision, tutor marketplace with smart matching, and full institutional module. Built from zero to production in 12 weeks.",
    longDescription: "NexusEd is a comprehensive EdTech platform designed around three interconnected ecosystems — students, teachers, and institutions. Students get personalized dashboards, progress tracking, and certificate management. Teachers access template-based content tools, live class scheduling, and portfolio pages. Institutions manage cohorts, analytics, and branding. The platform features WebRTC-powered live classrooms, an AI tutor powered by GPT-4o Vision, and a tutor marketplace with smart matching.",
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "WebRTC", "Socket.io", "GPT-4o Vision", "Tailwind CSS", "TypeScript"],
    achievements: [
      { metric: "12 Weeks", label: "Zero to Production" },
      { metric: "Live", label: "In Production" },
      { metric: "3", label: "Ecosystem Roles" }
    ],
    keyFeatures: [
      "WebRTC-powered live classrooms with real-time video and chat",
      "AI tutor powered by GPT-4o Vision for intelligent assistance",
      "Tutor marketplace with smart matching algorithm",
      "Student dashboards with progress tracking and certificate management",
      "Institutional analytics with cohort and enrollment management",
      "Certificate verification via unique codes"
    ],
    challenges: "Building a multi-role platform with deeply different UX needs for students, teachers, and institutions while keeping the codebase maintainable and the UI cohesive.",
    solution: "Used role-based routing with shared component libraries, Tailwind CSS design tokens for consistent theming, and a modular Next.js app directory structure per role.",
    impact: "Enables end-to-end collaborative education management — from content creation to certification — in a single platform. Built and shipped from zero to production in 12 weeks.",
    problemStatement: "Existing EdTech tools are siloed: teachers use one platform, students another, and institutions have no unified view. NexusEd unifies all three under one product.",
    architecture: "Next.js frontend with React component library. Node.js/Express API layer. MongoDB for flexible schema across roles. WebRTC for live video. GPT-4o Vision for AI tutor.",
    lessonsLearned: [
      "Multi-role platforms require careful information architecture from day one",
      "WebRTC requires careful NAT traversal and fallback handling for production reliability",
      "AI tutors built on GPT-4o Vision need structured prompt engineering for educational context"
    ]
  },
  {
    id: 10,
    name: "Affixx — Smart Affiliate & Creator Platform",
    category: "Product / SaaS",
    client: "SandyTech (Own Product)",
    period: "2025 - Present",
    url: "https://www.affixx.app",
    description: "A modern affiliate and creator monetization platform that helps brands and creators track, manage, and scale their partnership programs with real-time analytics and automated payouts.",
    longDescription: "Affixx is a SandyTech-built SaaS platform designed for brands and content creators to manage affiliate partnerships at scale. The platform provides real-time conversion tracking, automated commission calculations, creator dashboards, and payout management. Built with a clean, mobile-first UI and deep analytics, Affixx solves the fragmentation problem in creator monetization — replacing spreadsheets and manual tracking with a single, real-time source of truth.",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Stripe", "Cloudflare R2"],
    achievements: [
      { metric: "Live", label: "In Production" },
      { metric: "Real-time", label: "Conversion Tracking" },
      { metric: "Automated", label: "Commission & Payouts" }
    ],
    keyFeatures: [
      "Real-time affiliate conversion tracking",
      "Creator dashboard with earnings analytics",
      "Automated commission calculation and payouts",
      "Brand portal for campaign management",
      "Mobile-first responsive design",
      "Deep analytics and performance reporting"
    ],
    challenges: "Building reliable real-time attribution across multiple traffic sources and devices while keeping the platform affordable for small brands and independent creators.",
    solution: "Used event-driven architecture with webhook-based conversion tracking, fingerprinting for cross-device attribution, and a tiered pricing model starting with a free plan.",
    impact: "Enables brands and creators to replace manual spreadsheet-based affiliate tracking with an automated, real-time platform — reducing admin overhead and increasing payout accuracy.",
    problemStatement: "Affiliate and creator programs are hard to manage at scale — existing tools are expensive, complex, or built for enterprise. Affixx targets the underserved mid-market.",
    architecture: "Next.js frontend with Node.js API layer. PostgreSQL for transactional data. Cloudflare R2 for asset storage. Stripe for payouts. Real-time event processing for conversion tracking.",
    lessonsLearned: [
      "Attribution accuracy is the core trust metric for affiliate platforms",
      "Free tier is essential for creator adoption in a competitive market",
      "Real-time dashboards significantly improve user engagement and retention"
    ]
  },
  {
    id: 11,
    name: "360JobReady — AI Career Platform",
    category: "Product / SaaS",
    client: "SandyTech (Own Product)",
    period: "2025 - Present",
    url: "https://www.360jobready.com",
    description: "AI-powered career platform with resume builder, ATS-optimised templates, skill-based job matching, and cover letter generator. Designed for Indian freshers and job seekers.",
    longDescription: "360JobReady is a comprehensive AI career platform built specifically for Indian freshers and job seekers navigating the competitive job market. The platform combines AI-powered resume building with ATS optimisation, intelligent skill-based job matching, and automated cover letter generation. Users can build interview-ready resumes, get matched with relevant opportunities, and prepare for interviews — all in one place. Built and shipped by SandyTech in production.",
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "OpenAI GPT-4o", "Tailwind CSS", "Razorpay"],
    achievements: [
      { metric: "Live", label: "In Production" },
      { metric: "AI-Powered", label: "Resume Builder" },
      { metric: "ATS", label: "Optimised Templates" }
    ],
    keyFeatures: [
      "AI-powered resume builder with ATS optimisation",
      "Skill-based intelligent job matching",
      "Automated cover letter generator",
      "Interview preparation tools",
      "Multiple professional resume templates",
      "Free to start, no credit card required"
    ],
    challenges: "Indian freshers face unique challenges: limited experience, ATS filters rejecting resumes, and generic career tools not designed for the Indian job market.",
    solution: "Built an AI-first platform using GPT-4o for content generation and ATS scoring, with templates and matching logic tuned specifically for Indian employers and job boards.",
    impact: "Helps Indian freshers and job seekers create ATS-ready resumes and find relevant jobs faster — addressing a gap in the market for affordable, AI-powered career tools.",
    problemStatement: "Generic resume builders and job boards are not optimised for Indian freshers who need ATS-specific guidance, skill-gap analysis, and localised job matching.",
    architecture: "Next.js frontend with Node.js/Express API. MongoDB for user data and resume storage. GPT-4o for AI content generation and ATS scoring. Razorpay for premium subscriptions.",
    lessonsLearned: [
      "ATS optimisation is the highest-value feature for job seekers — lead with it",
      "AI-generated content needs human-friendly editing UX to feel empowering, not robotic",
      "Indian job market has distinct requirements that global tools ignore"
    ]
  }
];

export function getProjectById(id: number): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(project => project.category === category);
}

