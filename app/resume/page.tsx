"use client"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Printer, Mail, Phone, MapPin, Calendar, Award, Code, Cloud, Database, Cpu, Globe } from "lucide-react";
import React, { useRef } from "react";

const ResumePage = () => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const skills = {
    "Cloud/Backend": [".NET 6+", "ASP.NET Core", "Dapr", "Azure Functions", "Microservices"],
    "Frontend": ["Angular", "React", "JavaScript/TypeScript", "Blazor"],
    "DevOps": ["Docker", "Kubernetes", "Azure AKS", "Helm", "Terraform"],
    "Databases": ["SQL Server", "Cosmos DB", "PostgreSQL"],
    "Architecture": ["CQRS", "Event Sourcing", "Clean Architecture"]
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
            <header className="text-center border-b-2 border-blue-200 dark:border-blue-800 pb-8 mb-8">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                SANDEEP KOTHAPALLI
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-4">
                Senior Technical Lead | Cloud-Native .NET Architect | Full-Stack Developer
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Hyderabad, India
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (+91) 8019145771
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  sandeepdotnet@hotmail.com
                </div>
              </div>
            </header>

            {/* Professional Summary */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Professional Summary</h3>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Innovative Technical Lead with <span className="font-semibold text-blue-600 dark:text-blue-400">12+ years</span> of expertise in cloud-native .NET solutions and scalable architectures. 
                  Specialized in <span className="font-semibold">Microservices & Dapr</span> (event-driven architectures, service orchestration), 
                  <span className="font-semibold"> Containerization</span> (Docker, Kubernetes, Azure AKS), 
                  <span className="font-semibold"> Frontend</span> (Angular, React, Blazor), 
                  <span className="font-semibold"> DevOps</span> (CI/CD, IaC), and 
                  <span className="font-semibold"> Design Patterns</span> (CQRS, Mediator, Repository, DDD).
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
                <div className="border-l-4 border-blue-500 pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Technical Lead</h4>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold">Progience Technologies</p>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      06/2023 – Present
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 italic">
                    Leading cloud-native .NET solutions with microservices, Dapr, and Kubernetes on Azure.
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><span className="font-semibold">CrimeTrax:</span> Microservices with Dapr (pub/sub, state), Docker, AKS; 99.9% uptime.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>CQRS/Mediator for read/write separation; <span className="font-semibold text-green-600">+40% throughput</span>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Led Angular frontend integration with .NET backend APIs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><span className="font-semibold">JusticeTrax LIMS-plus:</span> Modernized monolith via Azure Functions + Blazor WASM.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Reduced deployment time <span className="font-semibold text-green-600">60%</span> using Helm; mentored team on Dapr.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-green-500 rounded-full"></div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">Senior Software Engineer</h4>
                      <p className="text-green-600 dark:text-green-400 font-semibold">Rollick</p>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      11/2020 – 05/2023
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 italic">
                    Built React-based customer portals with .NET microservices; automated CI/CD using GitHub Actions and Azure Container Registry.
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Delivered multiple microservices integrated with React frontends.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Implemented robust CI/CD pipelines across environments.</span>
                    </li>
                  </ul>
                </div>
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
                      <span>MCA – JNTU (2010)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span>B.Sc – Andhra University (2006)</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Certifications</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Microsoft Certified: C# (70-483)</span>
                    </li>
                  </ul>
                </div>
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
          .dark\\:text-blue-400 { color: #2563eb !important; }
          .dark\\:text-green-400 { color: #16a34a !important; }
          .dark\\:bg-slate-800 { background: #f8fafc !important; }
          .dark\\:bg-slate-700 { background: #e2e8f0 !important; }
          .dark\\:border-blue-800 { border-color: #1e40af !important; }
        }
      `}</style>
    </div>
  );
};

export default ResumePage;
