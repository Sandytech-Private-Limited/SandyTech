"use client"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Printer, Mail, Phone, MapPin, Calendar, Award, Code, Cloud, Database, Cpu, Globe, Briefcase } from "lucide-react";
import React, { useRef } from "react";

const ResumePage = () => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const skills = {
    "Architecture & Design": ["Domain-Driven Design (DDD)", "Clean Architecture", "Event-Driven Architecture", "System Design & Distributed Systems", "Microservices Architecture & Dapr Actor Model", "Performance Optimization & Reliability Engineering", "High Availability, Scalability & Resilience"],
    "AI & LLM": ["Agent-based Workflows & Tool Invocation", "Multi-Agent Orchestration", "AI Performance Considerations (latency, Cost, Accuracy)", "Secure AI Feature Integrations in Cloud Systems", "RAG Fundamentals", "Vector Search & Embeddings", "LLM integration in Enterprise Applications", "Prompt Engineering for Production workflows", "Structured Prompting & Output Parsing", "Context Assembly & Ranking for LLM inputs", "Token Usage Optimization & Prompt Compression", "Vector indexing & similarity search", "Hybrid Retrieval (Vector+keyword search)", "Applied Vector Stores (cloud-managed or open-source)"],
    "Programming & Frameworks": ["C#", ".NET", "ASP.NET Core", "JavaScript", "TypeScript", "Python"],
    "Frontend & Mobile": ["React", "React Native", "Next.js", "JavaScript", "TypeScript"],
    "Cloud & DevOps": ["Microsoft Azure", "Amazon Web Services (AWS)", "CI/CD", "DevOps & Observability", "Git", "Azure DevOps", "Azure Pipelines", "Terraform", "Automated Testing"],
    "Databases": ["SQL Server", "Azure Cosmos DB", "Azure PostgreSQL Flexible Server", "NoSQL"],
    "APIs & Services": ["API-First Design (REST, gRPC)", "Dapr", "Actor Model", "Microservices"],
    "Payment & Automation": ["Razorpay (Payment Gateway, Route & Split)", "n8n Workflow Automation", "Business Process Automation"],
    "Tools & Practices": ["Sprint planning & estimation", "Code Reviews & Engineering Best Practices", "Supply Chain Security", "npm Security Auditing"]
  };

  const getSkillIcon = (category: string) => {
    switch (category) {
      case "Cloud/Backend": return <Cloud className="w-4 h-4" />;
      case "Frontend": return <Globe className="w-4 h-4" />;
      case "DevOps": return <Cpu className="w-4 h-4" />;
      case "Databases": return <Database className="w-4 h-4" />;
      case "Architecture": return <Code className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <section className="py-10 print:py-0">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between mb-8 no-print">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Resume</h1>
            <div className="flex gap-3">
              <Button onClick={handlePrint} variant="secondary" size="lg">
                <Printer className="w-5 h-5 mr-2" /> Print / Download PDF
              </Button>
            </div>
          </div>

          <div
            ref={resumeRef}
            className="bg-white dark:bg-slate-950 rounded-2xl shadow-2xl p-10 print:shadow-none print:rounded-none print:p-8"
          >
            {/* Header */}
            <header className="text-center border-b-2 border-indigo-200 dark:border-indigo-800 pb-8 mb-8">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                SANDEEP KOTHAPALLI
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-emerald-600 mx-auto mb-4"></div>
              <p className="text-xl text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                SENIOR ARCHITECT | Cloud-Native Platforms · AI/LLM Systems · Idea-to-MVP
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                kothapallisandeep.com
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Hyderabad, India (Open to US / EU / Remote)
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +91-8019145771
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Sandeep.kothapalli1@hotmail.com
                </div>
              </div>
            </header>

            {/* Professional Summary */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Professional Summary</h3>
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  Senior Technical Lead and Solution Architect with <span className="font-semibold text-indigo-600 dark:text-indigo-400">13+ years</span> of experience
                  designing and delivering <span className="font-semibold">enterprise-scale, cloud-native platforms</span>. Strong expertise in 
                  <span className="font-semibold"> .NET, Azure, microservices, Dapr, Kubernetes, distributed systems, and system design</span>, 
                  with a proven track record of leading teams, defining technical roadmaps, and modernizing legacy systems.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Over the past year, expanded expertise into <span className="font-semibold">AI-enabled systems</span>, contributing to the design 
                  and integration of <span className="font-semibold">LLM-based features such as RAG pipelines and agent-driven workflows</span> within 
                  existing cloud and microservices architectures. Known for balancing <span className="font-semibold">scalability, reliability, 
                  security, and performance</span> while aligning technology with business outcomes.
                </p>
              </div>
            </section>

            {/* Technical Skills */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Technical Skills</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(skills).map(([category, skillList], index) => (
                  <div key={index} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      {getSkillIcon(category)}
                      <h4 className="font-semibold text-gray-900 dark:text-white">{category}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Professional Experience */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Professional Experience</h3>
              </div>
              <div className="space-y-6">
                <div className="border-l-4 border-indigo-500 pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-indigo-500 rounded-full"></div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Technical Lead</h4>
                      <p className="text-indigo-600 dark:text-indigo-400 font-semibold">Progience Technologies, Hyderabad</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Technologies: Next.js, Express.js, Amazon Web Services (AWS), Microsoft Azure, SQL, Entity Framework, Design Patterns</p>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      Jun 2023 - Present
                    </Badge>
                  </div>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Lead end-to-end architecture and delivery of mission-critical enterprise platforms across multiple domains.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Define and own the technical roadmap, guiding teams in adopting microservices, Dapr actor model, container orchestration, and cloud-native deployment.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Design highly available distributed systems supporting horizontal scalability, fault tolerance, and independent deployability.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Collaborate with product, UX, QA, and DevOps to translate business requirements into robust, maintainable solutions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Mentor and coach engineers across levels; conduct code reviews and enforce engineering best practices.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Improved CI/CD pipelines and deployment automation, reducing release cycles by <span className="font-semibold text-green-600">30%</span>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Reduced production incidents by <span className="font-semibold text-green-600">50%</span> through improved observability and reliability patterns.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Partnered with stakeholders to deliver user-centric features, increasing engagement by <span className="font-semibold text-green-600">60%</span>.</span>
                    </li>
                    <li className="flex items-start gap-2 mt-4">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><span className="font-semibold">AI-Enabled Contributions (Supporting Role):</span></span>
                    </li>
                    <li className="flex items-start gap-2 pl-6">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Contributed to the design and implementation of LLM-based features integrated into existing microservices platforms.</span>
                    </li>
                    <li className="flex items-start gap-2 pl-6">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Assisted in building RAG pipelines for internal and client documentation use cases, focusing on chunking strategies, embeddings, and retrieval accuracy.</span>
                    </li>
                    <li className="flex items-start gap-2 pl-6">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Supported agent-driven workflows enabling tool-based automation within business processes.</span>
                    </li>
                    <li className="flex items-start gap-2 pl-6">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Worked on optimizing p95 latency and cost for AI-enabled endpoints through caching and prompt optimization.</span>
                    </li>
                    <li className="flex items-start gap-2 pl-6">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Ensured AI features followed enterprise standards for security, access control, and auditability.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-green-500 rounded-full"></div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Senior Web Developer / Senior Software Engineer</h4>
                      <p className="text-green-600 dark:text-green-400 font-semibold">Rollick, Hyderabad</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Technologies: NEXT.js, React Native, Express.js, Amazon Web Services (AWS), SQL</p>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      Nov 2020 - May 2023
                    </Badge>
                  </div>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Designed and developed scalable web platforms using .NET, React, Next.js, AWS, and SQL.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Migrated legacy monolithic systems to service-oriented and microservices architectures.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Improved performance and maintainability through Clean Architecture and systematic refactoring.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Implemented secure authentication, logging, and error handling, reducing production defects by <span className="font-semibold text-green-600">90%</span>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Established CI/CD pipelines and automated testing, saving <span className="font-semibold text-green-600">20+ engineering hours per week</span>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Implemented fault tolerance and rollback mechanisms, reducing <span className="font-semibold text-green-600">MTTR to under 15 minutes</span>.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-orange-500 pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-orange-500 rounded-full"></div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Senior Programmer Analyst</h4>
                      <p className="text-orange-600 dark:text-orange-400 font-semibold">Versaterm JusticeTrax, Hyderabad</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Technologies: ASP.NET, C#, SQL, Entity Framework, Microsoft Azure</p>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      Jun 2017 - Nov 2020
                    </Badge>
                  </div>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Designed and maintained enterprise modules using ASP.NET, C#, SQL, Azure.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Optimized database models and queries, improving performance by <span className="font-semibold text-green-600">50%</span>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Strengthened SDLC practices with unit testing and peer reviews, lowering defects by <span className="font-semibold text-green-600">30%</span>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Improved delivery velocity by <span className="font-semibold text-green-600">50%</span> through cross-team coordination.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-yellow-500 pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Software Developer</h4>
                      <p className="text-yellow-600 dark:text-yellow-400 font-semibold">Pie Software Solutions, Vizag</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Technologies: ASP.NET, C#, SQL, Entity Framework</p>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      Jul 2014 - May 2017
                    </Badge>
                  </div>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Developed end-to-end web and desktop applications using ASP.NET, C#, SQL.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Owned testing, deployment, and production support, reducing issue resolution time by <span className="font-semibold text-green-600">12 hours</span>.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-pink-500 pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-pink-500 rounded-full"></div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Software Engineer</h4>
                      <p className="text-pink-600 dark:text-pink-400 font-semibold">Welfare Group of Companies</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Technologies: ASP.NET, C#, SQL</p>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      May 2013 - Jun 2014
                    </Badge>
                  </div>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Refactored components to enhance maintainability, reducing defects by <span className="font-semibold text-green-600">10%</span>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Collaborated on database design and maintenance, improving data integrity by <span className="font-semibold text-green-600">20%</span>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Built and supported web application modules, improving data integrity by <span className="font-semibold text-green-600">20%</span>.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-indigo-500 pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-indigo-500 rounded-full"></div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Software Engineer</h4>
                      <p className="text-indigo-600 dark:text-indigo-400 font-semibold">Ram Informatics</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Technologies: ASP.NET, C#, SQL</p>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      Feb 2012 - May 2013
                    </Badge>
                  </div>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Delivered dynamic website development with ASP.NET and C#, creating robust CRUD functionality.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Executed coding, database design, and maintenance, boosting performance by <span className="font-semibold text-green-600">40%</span>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Assisted deployments and root-cause analysis, reducing support backlog by <span className="font-semibold text-green-600">20%</span>.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h3>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">CrimeTrax - Law Enforcement Analytics Platform</h4>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-3">Law Enforcement Agency (2023 - Present)</p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Cloud-native microservices platform built with .NET, Dapr, and Kubernetes serving <span className="font-semibold text-green-600">100K+ daily active users</span>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Achieved <span className="font-semibold text-green-600">99.9% uptime</span> and <span className="font-semibold text-green-600">40% throughput improvement</span> using CQRS/Mediator pattern.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Features real-time analytics, predictive policing, and resource optimization with event-driven architecture.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">JusticeTrax LIMS-plus - Laboratory Management System</h4>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-3">Versaterm JusticeTrax (2021 - 2023)</p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Modernized legacy system to microservices using Azure Functions and Blazor WASM.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Reduced deployment time by <span className="font-semibold text-green-600">60%</span>, infrastructure costs by <span className="font-semibold text-green-600">50%</span>, and improved performance by <span className="font-semibold text-green-600">45%</span>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Handles complex evidence processing workflows with real-time tracking and compliance reporting.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">AI-Powered RAG Pipeline for Enterprise Documentation</h4>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-3">Internal Project (2024 - Present)</p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Enterprise-grade RAG system enabling intelligent search and Q&A from company knowledge bases.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Achieved <span className="font-semibold text-green-600">85% query accuracy</span>, <span className="font-semibold text-green-600">2s average response time</span>, and <span className="font-semibold text-green-600">60% cost reduction</span>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Uses vector embeddings, semantic search, and LLM integration with Azure OpenAI and Cognitive Search.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Amphion Medical Solutions Web Platform</h4>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-3">Amphion Medical Solutions (U.S Company) (2019 - 2020)</p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>HIPAA-compliant healthcare platform with role-based workflows and secure patient data management.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Reduced defects by <span className="font-semibold text-green-600">30%</span>, saved <span className="font-semibold text-green-600">10 hours/week</span>, and improved efficiency by <span className="font-semibold text-green-600">20%</span>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Features real-time scheduling, billing integration, and comprehensive audit trails.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Customer Portal Platform (Rollick)</h4>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-3">Rollick (2020 - 2023)</p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Multi-tenant React-based customer portal with .NET microservices backend.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Achieved <span className="font-semibold text-green-600">99.95% uptime</span>, reduced defects by <span className="font-semibold text-green-600">90%</span>, and saved <span className="font-semibold text-green-600">20+ hours/week</span>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Features automated CI/CD, fault tolerance, and comprehensive analytics with automated health checks.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">ProSight Insurance Portal</h4>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-3">Prosight (Insurance domain) (2018 - 2019)</p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Insurance platform with policy management and claims processing features.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Increased user engagement by <span className="font-semibold text-green-600">10%</span>, improved throughput by <span className="font-semibold text-green-600">20%</span>, and reduced query latency by <span className="font-semibold text-green-600">1000ms</span>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Features real-time notifications, mobile-responsive design, and payment processing integration.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Selected Achievements */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Selected Achievements</h3>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Architected and delivered <span className="font-semibold">cloud-native microservices platforms</span> using Dapr and Kubernetes, improving deployment frequency and scalability.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Led migration from monolithic systems to <span className="font-semibold">distributed architectures</span>, improving performance and reducing infrastructure costs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Introduced CI/CD pipelines and infrastructure automation, reducing critical defects and MTTR.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Integrated <span className="font-semibold">AI-assisted capabilities</span> into enterprise systems while maintaining reliability, security, and performance standards.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Education & Certifications */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Education & Certifications</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Education</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span>MCA, Computer Science - VITAM, Vizag (2010)</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Certifications</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                      <span>Microsoft Certified: C# Certified Developer</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Professional Development */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Professional Development</h3>
              </div>
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Regular speaker and mentor in internal technical forums and team workshops on microservices, cloud architecture, Dapr, Clean Architecture. 
                  Strong problem-solving mindset, capable of bridging business requirements and technical execution, comfortable working with cross-functional 
                  and geographically distributed teams. Self-driven continuous learner - keeping up with latest technology trends in cloud, containers, 
                  microservices, frontend/mobile frameworks.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .bg-gradient-to-br { background: white !important; }
          .dark\\:bg-slate-950 { background: white !important; }
          .dark\\:text-white { color: black !important; }
          .dark\\:text-gray-300 { color: #374151 !important; }
          .dark\\:text-gray-400 { color: #6b7280 !important; }
          .dark\\:text-indigo-400 { color: #4f46e5 !important; }
          .dark\\:text-green-400 { color: #16a34a !important; }
          .dark\\:bg-slate-800 { background: #f8fafc !important; }
          .dark\\:bg-slate-700 { background: #e2e8f0 !important; }
          .dark\\:border-indigo-800 { border-color: #3730a3 !important; }
        }
      `}</style>
    </div>
  );
};

export default ResumePage;
