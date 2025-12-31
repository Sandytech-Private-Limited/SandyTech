"use client"
import Image from "next/image";
import { useEffect, useRef } from "react";
import Typed from 'typed.js';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Cloud, Cpu, Database, Globe, Smartphone, Zap } from "lucide-react";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['.NET & Azure', 'Microservices & Dapr', 'AI-Enabled Platforms', 'Kubernetes', 'Distributed Systems'],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const skills = [
    { icon: Code, title: "Backend Development", description: "C#, .NET, ASP.NET Core, Microservices, Dapr, Actor Model" },
    { icon: Cloud, title: "Cloud & DevOps", description: "Azure, Kubernetes, Docker, CI/CD, Observability" },
    { icon: Cpu, title: "AI/LLM & Architecture", description: "RAG Pipelines, Agent Workflows, Vector Search, DDD, Clean Architecture" },
    { icon: Database, title: "Databases", description: "SQL Server, Azure Cosmos DB, NoSQL, Vector Stores" },
    { icon: Globe, title: "Frontend", description: "React, Next.js, React Native, JavaScript, TypeScript" },
    { icon: Zap, title: "System Design", description: "Event-Driven Architecture, Distributed Systems, Performance Optimization" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sandeep Kothapalli",
    "alternateName": ["kothapallisandeep", "sandeepkothapalli", "SandyTech"],
    "jobTitle": "Technical Lead | Solution Architect",
    "description": "Technical Lead and Solution Architect with 12+ years of experience in cloud-native platforms, AI automation, and distributed systems. Expert in .NET, Azure, microservices, Dapr, Kubernetes, and AI-enabled platforms.",
    "url": "https://kothapallisandeep.com",
    "sameAs": [
      "https://www.linkedin.com/in/kothapallisandeep/",
      "https://github.com/websabre",
      "https://x.com/websabre1"
    ],
    "knowsAbout": [
      ".NET",
      "Azure",
      "Microservices",
      "Dapr",
      "Kubernetes",
      "AI Automation",
      "RAG Pipelines",
      "Distributed Systems",
      "System Design",
      "Domain Driven Design",
      "Clean Architecture"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "SandyTech"
    }
  };

  return (
    <main className="min-h-screen">
      <StructuredData data={structuredData} />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Technical Lead | Solution Architect | Cloud & Distributed Systems
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Sandeep Kothapalli
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Senior Technical Lead and Solution Architect with{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">12+ years</span> of experience
                designing and delivering enterprise-scale, cloud-native platforms with{" "}
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  <span ref={el} />
                </span>
              </p>
              
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
                Strong expertise in .NET, Azure, microservices, Dapr, Kubernetes, distributed systems, and system design. 
                Recently expanded into AI-enabled systems, contributing to LLM-based features such as RAG pipelines and 
                agent-driven workflows within cloud and microservices architectures.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link href="/projects">
                    View Projects
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                  <Link href="/resume">
                    View Resume
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Link href="/contact">
                    Get In Touch
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
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Core Expertise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A comprehensive skill set spanning backend development, cloud architecture, 
              AI/ML applications, and modern frontend technologies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <skill.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {skill.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how my expertise in modern software development can help bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/contact">
                Start a Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/blog">
                Read My Blog
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
