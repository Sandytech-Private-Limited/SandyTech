import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Award,
  Code,
  Cloud,
  Database,
  Cpu,
  Globe,
  Smartphone,
  Users,
  BookOpen,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Github,
  Linkedin,
  Mail
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Sandeep Kothapalli — Senior Architect & Founder of SandyTech Pvt Ltd. 13+ years building enterprise cloud platforms, AI/LLM systems, and production MVPs. Based in Hyderabad. Specialising in .NET, Azure, Dapr, Kubernetes, RAG pipelines, and real-time platforms.",
  keywords: ["Sandeep Kothapalli", "kothapallisandeep", "SandyTech", "Senior Architect", "SandyTech Founder", "Hyderabad architect", ".NET architect", "Azure architect", "AI MVP", "about"],
  alternates: { canonical: "https://kothapallisandeep.com/about" },
  openGraph: {
    title: "About Sandeep Kothapalli — Senior Architect & SandyTech Founder",
    description: "13+ years building cloud-native platforms, AI/LLM systems, and production MVPs via SandyTech Pvt Ltd. Expert in .NET, Azure, Kubernetes, Dapr, and RAG pipelines.",
    url: "https://kothapallisandeep.com/about",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Sandeep Kothapalli — Senior Architect & SandyTech Founder",
    description: "13+ years building cloud-native platforms, AI/LLM systems, and MVPs. Founder of SandyTech Pvt Ltd.",
    creator: "@sandeepattech",
  },
};

export default function About() {
  const skills = {
    "Architecture & Design": ["Domain-Driven Design (DDD)", "Clean Architecture", "Event-Driven Architecture", "System Design", "Distributed Systems", "Microservices Architecture", "Dapr Actor Model"],
    "AI & LLM": ["RAG Fundamentals", "Vector Search & Embeddings", "Agent-based Workflows", "Multi-Agent Orchestration", "Tool Invocation", "Prompt Engineering", "Structured Prompting", "Context Assembly & Ranking", "Token Usage Optimization", "Hybrid Retrieval"],
    "Programming & Frameworks": ["C#", ".NET", "ASP.NET Core", "JavaScript", "TypeScript", "Python"],
    "Frontend & Mobile": ["React", "React Native", "Next.js", "JavaScript", "TypeScript"],
    "Cloud & DevOps": ["Microsoft Azure", "Amazon Web Services (AWS)", "Kubernetes", "Docker", "CI/CD", "Azure DevOps", "Terraform", "Azure Pipelines", "Observability"],
    "Databases": ["SQL Server", "Azure Cosmos DB", "Azure PostgreSQL Flexible Server", "NoSQL", "Vector Stores"],
    "APIs & Services": ["REST", "gRPC", "API-First Design", "Dapr", "Microservices"],
    "Payment & Integrations": ["Razorpay (Payment Gateway, Route & Split)", "API-First Design", "Third-party Integrations"],
    "Automation": ["n8n Workflow Automation", "Social Media Automation", "Business Process Automation"],
    "Tools & Practices": ["Git", "Automated Testing", "Code Reviews", "Engineering Best Practices", "Sprint Planning & Estimation", "Supply Chain Security"]
  };

  const experience = [
    {
      title: "Founder & Director",
      company: "SandyTech Private Limited, Hyderabad",
      period: "Dec 2024 - Present",
      technologies: "Next.js, React, Node.js, AI/LLM, Azure, n8n, Automation",
      description: "Founded SandyTech Pvt Ltd (CIN: U62011TS2025PTC208019) to deliver AI-powered MVPs and automation solutions for startups and SMBs.",
      achievements: [
        "Building AI-powered product platforms and automation workflows delivered in 6-8 weeks.",
        "Architecting multi-agent orchestration systems and LLM-integrated products for client businesses.",
        "Developing full-stack SaaS products including EdTech platforms and B2B lead generation tools.",
        "Positioning SandyTech as a go-to partner for startups needing cloud-native MVPs with AI capabilities."
      ]
    },
    {
      title: "Technical Lead",
      company: "Progience Technologies, Hyderabad",
      period: "Jun 2023 - Present",
      technologies: "Next.js, Express.js, Amazon Web Services (AWS), Microsoft Azure, SQL, Entity Framework, Design Patterns",
      description: "Lead end-to-end architecture and delivery of mission-critical enterprise platforms across multiple domains.",
      achievements: [
        "Define and own the technical roadmap, guiding teams in adopting microservices, Dapr actor model, container orchestration, and cloud-native deployment.",
        "Design highly available distributed systems supporting horizontal scalability, fault tolerance, and independent deployability.",
        "Collaborate with product, UX, QA, and DevOps to translate business requirements into robust, maintainable solutions.",
        "Mentor and coach engineers across levels; conduct code reviews and enforce engineering best practices.",
        "Improved CI/CD pipelines and deployment automation, reducing release cycles by 30%.",
        "Reduced production incidents by 50% through improved observability and reliability patterns.",
        "Partnered with stakeholders to deliver user-centric features, increasing engagement by 60%.",
        "AI-Enabled Contributions: Contributed to design and implementation of LLM-based features integrated into existing microservices platforms.",
        "Assisted in building RAG pipelines for internal and client documentation use cases, focusing on chunking strategies, embeddings, and retrieval accuracy.",
        "Supported agent-driven workflows enabling tool-based automation within business processes.",
        "Worked on optimizing p95 latency and cost for AI-enabled endpoints through caching and prompt optimization.",
        "Ensured AI features followed enterprise standards for security, access control, and auditability."
      ]
    },
    {
      title: "Senior Web Developer / Senior Software Engineer",
      company: "Rollick, Hyderabad",
      period: "Nov 2020 - May 2023",
      technologies: "NEXT.js, React Native, Express.js, Amazon Web Services (AWS), SQL",
      description: "Designed and developed scalable web platforms using .NET, React, Next.js, AWS, and SQL.",
      achievements: [
        "Migrated legacy monolithic systems to service-oriented and microservices architectures.",
        "Improved performance and maintainability through Clean Architecture and systematic refactoring.",
        "Implemented secure authentication, logging, and error handling, reducing production defects by 90%.",
        "Established CI/CD pipelines and automated testing, saving 20+ engineering hours per week.",
        "Implemented fault tolerance and rollback mechanisms, reducing MTTR to under 15 minutes."
      ]
    },
    {
      title: "Senior Programmer Analyst",
      company: "Versaterm JusticeTrax, Hyderabad",
      period: "Jun 2017 - Nov 2020",
      technologies: "ASP.NET, C#, SQL, Entity Framework, Microsoft Azure",
      description: "Designed and maintained enterprise modules using ASP.NET, C#, SQL, Azure.",
      achievements: [
        "Optimized database models and queries, improving performance by 50%.",
        "Strengthened SDLC practices with unit testing and peer reviews, lowering defects by 30%.",
        "Improved delivery velocity by 50% through cross-team coordination."
      ]
    },
    {
      title: "Software Developer",
      company: "Pie Software Solutions, Vizag",
      period: "Jul 2014 - May 2017",
      technologies: "ASP.NET, C#, SQL, Entity Framework",
      description: "Developed end-to-end web and desktop applications using ASP.NET, C#, SQL.",
      achievements: [
        "Owned testing, deployment, and production support, reducing issue resolution time by 12 hours."
      ]
    },
    {
      title: "Software Engineer",
      company: "Welfare Group of Companies",
      period: "May 2013 - Jun 2014",
      technologies: "ASP.NET, C#, SQL",
      description: "Refactored components and built web application modules.",
      achievements: [
        "Refactored components to enhance maintainability, reducing defects by 10%.",
        "Collaborated on database design and maintenance, improving data integrity by 20%."
      ]
    },
    {
      title: "Software Engineer",
      company: "Ram Informatics",
      period: "Feb 2012 - May 2013",
      technologies: "ASP.NET, C#, SQL",
      description: "Delivered dynamic website development with ASP.NET and C#.",
      achievements: [
        "Executed coding, database design, and maintenance, boosting performance by 40%.",
        "Assisted deployments and root-cause analysis, reducing support backlog by 20%."
      ]
    }
  ];

  const projects = [
    {
      name: "CrimeTrax - Law Enforcement Analytics Platform",
      company: "Law Enforcement Agency",
      description: "Cloud-native microservices platform built with .NET, Dapr, and Kubernetes. Achieved 99.9% uptime, 40% throughput improvement, and serves 100K+ daily active users. Features real-time analytics, predictive policing, and resource optimization.",
      tech: [".NET 8", "Dapr", "Kubernetes", "Azure AKS", "CQRS", "Angular", "Azure Cosmos DB"]
    },
    {
      name: "JusticeTrax LIMS-plus - Laboratory Management System",
      company: "Versaterm JusticeTrax",
      description: "Modernized legacy system to microservices using Azure Functions and Blazor WASM. Reduced deployment time by 60%, infrastructure costs by 50%, and improved performance by 45%. Handles complex evidence processing workflows with real-time tracking.",
      tech: ["Azure Functions", "Blazor WASM", ".NET 6", "Azure Service Bus", "SQL Server"]
    },
    {
      name: "AI-Powered RAG Pipeline for Enterprise Documentation",
      company: "Internal Project",
      description: "Built enterprise-grade RAG system enabling intelligent search and Q&A from company knowledge bases. Achieved 85% query accuracy, 2s average response time, and 60% cost reduction. Uses vector embeddings, semantic search, and LLM integration.",
      tech: ["Python", "Azure OpenAI", "Azure Cognitive Search", "Vector Databases", "LangChain", "Next.js"]
    },
    {
      name: "Amphion Medical Solutions Web Platform",
      company: "Amphion Medical Solutions (U.S Company)",
      description: "HIPAA-compliant healthcare platform with role-based workflows and secure patient data management. Reduced defects by 30%, saved 10 hours/week, and improved efficiency by 20%. Features real-time scheduling, billing integration, and comprehensive audit trails.",
      tech: ["ASP.NET Core", "C#", "SQL Server", "Azure", "React", "SignalR"]
    },
    {
      name: "Customer Portal Platform (Rollick)",
      company: "Rollick",
      description: "Multi-tenant React-based customer portal with .NET microservices backend. Achieved 99.95% uptime, reduced defects by 90%, and saved 20+ hours/week. Features automated CI/CD, fault tolerance, and comprehensive analytics.",
      tech: ["React", "Next.js", ".NET Core", "Microservices", "AWS", "Docker", "GitHub Actions"]
    },
    {
      name: "ProSight Insurance Portal",
      company: "Prosight (Insurance domain)",
      description: "Insurance platform with policy management and claims processing. Increased user engagement by 10%, improved throughput by 20%, and reduced query latency by 1000ms. Features real-time notifications and mobile-responsive design.",
      tech: ["ASP.NET", "SQL Server", "Entity Framework", "Azure", "JavaScript", "Bootstrap"]
    },
    {
      name: "Microservices Migration Framework",
      company: "Internal Project",
      description: "Reusable framework and tooling for migrating monolithic applications to microservices. Reduced migration time by 50%, enabled 3 successful migrations, and achieved 40% code reusability. Includes code generators, patterns, and deployment automation.",
      tech: [".NET", "Dapr", "Kubernetes", "Helm", "Terraform", "Docker", "Azure DevOps"]
    },
    {
      name: "Event-Driven Analytics Platform",
      company: "Internal Project",
      description: "Real-time event processing platform handling 1M+ events daily with sub-500ms latency. Achieved 99.9% uptime using event sourcing, CQRS, and stream processing. Provides real-time dashboards, alerts, and comprehensive analytics.",
      tech: ["Azure Event Hubs", "Azure Stream Analytics", ".NET", "Kafka", "Redis", "Power BI"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  About{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">
                    Sandeep Kothapalli
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  I help startups and SMEs turn ideas into deployed AI products — typically in 6 to 8 weeks. After 13+ years as a .NET architect building enterprise systems across Azure, AWS, and DevOps, I started SandyTech to solve a problem I kept seeing: founders with strong ideas but no technical partner to ship them.
                </p>
                <div className="text-lg text-gray-600 dark:text-gray-300 mb-8 space-y-2">
                  <p>Specialising in:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>AI-Powered MVP Development (idea to shipped product in 6–8 weeks)</li>
                    <li>Cloud Architecture & Migration (legacy .NET to Azure — architecture, execution, handover)</li>
                    <li>Real-time platforms with WebRTC, Socket.io, and event-driven architecture</li>
                    <li>AI automation workflows (n8n, LangChain, GPT-4o, custom pipelines)</li>
                    <li>Enterprise .NET, microservices, Dapr, and Kubernetes systems</li>
                  </ul>
                </div>
                <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 border border-indigo-100 dark:border-slate-600">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Founder & Director, SandyTech Pvt Ltd</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">AI-Powered MVPs & Automation · Built in 6-8 Weeks · <Link href="https://sandytech.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">sandytech.org</Link></p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild size="lg">
                    <Link href="/contact">
                      <Mail className="mr-2 w-5 h-5" />
                      Get In Touch
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/blog">
                      <BookOpen className="mr-2 w-5 h-5" />
                      Read My Blog
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative w-full h-96 lg:h-[500px]">
                  <Image
                    src="/logo.jpg"
                    alt="Sandeep Kothapalli"
                    fill
                    className="rounded-2xl object-cover shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Summary */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Profile Summary
            </h2>
            <div className="bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                After 13+ years as a .NET architect building enterprise systems across Azure, AWS, and DevOps, I founded SandyTech Pvt Ltd to solve a recurring problem: founders with strong ideas but no technical partner to ship them. SandyTech specialises in AI-powered MVP development, cloud migration, automation workflows, and corporate AI training.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                This year: built <a href="https://nexused.net" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">NexusEd (nexused.net)</a> — a real-time EdTech platform with WebRTC live classrooms, AI tutor powered by GPT-4o Vision, tutor marketplace with smart matching, and full institutional module — from zero to production in 12 weeks. Also shipped <a href="https://www.360jobready.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">360JobReady (360jobready.com)</a> — an AI career platform for Indian freshers with ATS-optimised resume builder and skill-based job matching. Both are live, in production, and free to start.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Core Skills
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList], index) => (
                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    {category === "Programming & Frameworks" && <Code className="w-5 h-5 mr-2 text-blue-500" />}
                    {category === "Cloud & DevOps" && <Cloud className="w-5 h-5 mr-2 text-blue-500" />}
                    {category === "Microservices & Middleware" && <Cpu className="w-5 h-5 mr-2 text-blue-500" />}
                    {category === "Databases" && <Database className="w-5 h-5 mr-2 text-blue-500" />}
                    {category === "AI & ML" && <Cpu className="w-5 h-5 mr-2 text-purple-500" />}
                    {category === "Other Tools" && <Globe className="w-5 h-5 mr-2 text-green-500" />}
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Professional Experience
            </h2>
            <div className="space-y-8">
              {experience.map((job, index) => (
                <div key={index} className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                        {job.title}
                      </h3>
                      <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium mb-2">
                        {job.company}
                      </p>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        {job.period}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                    {job.description}
                  </p>
                  {job.technologies && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 italic">
                      <span className="font-semibold">Technologies:</span> {job.technologies}
                    </p>
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {job.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start text-gray-600 dark:text-gray-300">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Selected Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.name}
                  </h3>
                  {project.company && (
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-3">
                      {project.company}
                    </p>
                  )}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Education & Certifications
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <GraduationCap className="w-8 h-8 text-indigo-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Education</h3>
                </div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  MCA, Computer Science
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  VITAM, Vizag
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  2010
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <Award className="w-8 h-8 text-green-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Certifications</h3>
                </div>
                <ul className="space-y-2">
                  <li className="text-gray-600 dark:text-gray-300">
                    Microsoft Certified: C# Certified Developer
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Interests
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Regular speaker and mentor in internal technical forums and team workshops on microservices, cloud architecture, Dapr, Clean Architecture",
                "Strong problem-solving mindset, capable of bridging business requirements and technical execution",
                "Comfortable working with cross-functional and geographically distributed teams",
                "Self-driven continuous learner - keeping up with latest technology trends in cloud, containers, microservices, frontend/mobile frameworks"
              ].map((interest, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {interest}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}