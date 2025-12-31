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

export default function About() {
  const skills = {
    "Architecture & Design": ["Domain-Driven Design (DDD)", "Clean Architecture", "Event-Driven Architecture", "System Design", "Distributed Systems", "Microservices Architecture", "Dapr Actor Model"],
    "AI & LLM": ["RAG Fundamentals", "Vector Search & Embeddings", "Agent-based Workflows", "Tool Invocation", "Prompt Engineering", "Structured Prompting", "Context Assembly & Ranking", "Token Usage Optimization", "Hybrid Retrieval"],
    "Programming & Frameworks": ["C#", ".NET", "ASP.NET Core", "JavaScript", "TypeScript", "Python"],
    "Frontend & Mobile": ["React", "React Native", "Next.js", "JavaScript", "TypeScript"],
    "Cloud & DevOps": ["Microsoft Azure", "Amazon Web Services (AWS)", "Kubernetes", "Docker", "CI/CD", "Azure DevOps", "Observability"],
    "Databases": ["SQL Server", "Azure Cosmos DB", "NoSQL", "Vector Stores"],
    "APIs & Services": ["REST", "gRPC", "API-First Design", "Dapr", "Microservices"],
    "Tools & Practices": ["Git", "Automated Testing", "Code Reviews", "Engineering Best Practices", "Sprint Planning & Estimation"]
  };

  const experience = [
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
      name: "Amphion Medical Solutions Web Platform",
      company: "Amphion Medical Solutions (U.S Company)",
      description: "ASP.NET and C# web application for medical solutions with role-based workflows and operational support. Implemented secure auth, CI/CD, and automated tests to enhance release reliability, reducing defects by 30% and saving 10 hours/week. Optimized application and database layers, improving workflow efficiency by 20% under peak usage.",
      tech: ["ASP.NET", "C#", "SQL", "CI/CD", "Automated Testing"]
    },
    {
      name: "ProSight Insurance Portal",
      company: "Prosight (Insurance domain)",
      description: "Insurance domain website delivering policy and claims features with performant UI and API integrations. Delivered responsive UI and ASP.NET APIs, increasing page load speed and boosting user engagement by 10%. Tuned SQL and indexing to raise throughput by 20% and reduce query latency by 1000ms.",
      tech: ["ASP.NET", "SQL", "Performance Optimization", "API Integration"]
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
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Sandeep Kothapalli
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Senior Technical Lead and Solution Architect with 12+ years of experience designing and delivering 
                  enterprise-scale, cloud-native platforms. Strong expertise in .NET, Azure, microservices, Dapr, 
                  Kubernetes, distributed systems, and system design.
                </p>
                <div className="text-lg text-gray-600 dark:text-gray-300 mb-8 space-y-2">
                  <p>Specialized in:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Domain-Driven Design (DDD) & Clean Architecture</li>
                    <li>Microservices Architecture & Dapr Actor Model</li>
                    <li>AI-Enabled Systems: RAG pipelines, agent-driven workflows, vector search</li>
                    <li>Event-Driven Architecture & Distributed Systems</li>
                    <li>Performance Optimization & Reliability Engineering</li>
                    <li>CI/CD, DevOps & Observability</li>
                  </ul>
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
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Senior Technical Lead and Solution Architect with 12+ years of experience designing and delivering 
                enterprise-scale, cloud-native platforms. Strong expertise in .NET, Azure, microservices, Dapr, 
                Kubernetes, distributed systems, and system design, with a proven track record of leading teams, 
                defining technical roadmaps, and modernizing legacy systems.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Over the past year, expanded expertise into AI-enabled systems, contributing to the design and 
                integration of LLM-based features such as RAG pipelines and agent-driven workflows within existing 
                cloud and microservices architectures. Known for balancing scalability, reliability, security, and 
                performance while aligning technology with business outcomes.
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
                      <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-2">
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
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
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
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
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
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <GraduationCap className="w-8 h-8 text-blue-500 mr-3" />
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