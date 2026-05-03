"use client"
import Image from "next/image";
import { useEffect, useRef } from "react";
import Typed from 'typed.js';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Cloud, Cpu, Zap, Rocket, ExternalLink } from "lucide-react";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['AI-Powered MVPs', 'Cloud Architecture', 'Real-time Platforms', '.NET & Azure', 'Idea to Production'],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const skills = [
    { icon: Code, title: "Backend Engineering", description: ".NET, C#, ASP.NET Core, Microservices, Dapr, Actor Model" },
    { icon: Cloud, title: "Cloud & DevOps", description: "Azure, AWS, Kubernetes, Docker, Terraform, CI/CD, Observability" },
    { icon: Cpu, title: "AI/LLM Systems", description: "RAG Pipelines, GPT-4o, Agent Workflows, Vector Search, LangChain" },
    { icon: Zap, title: "Real-time Platforms", description: "WebRTC, Socket.io, Event-Driven Architecture, Distributed Systems" },
    { icon: Code, title: "Full-Stack Products", description: "React, Next.js, Node.js, TypeScript, React Native" },
    { icon: Rocket, title: "MVP Delivery", description: "Idea to production in 6–8 weeks via SandyTech Pvt Ltd" }
  ];

  const products = [
    {
      name: "NexusEd",
      tagline: "Real-time EdTech Platform",
      description: "Real-time EdTech platform with WebRTC classrooms, AI tutor (GPT-4o Vision), and tutor marketplace. Built from zero to production in 12 weeks.",
      url: "https://nexused.net",
      tech: ["Next.js", "WebRTC", "GPT-4o Vision", "MongoDB"],
      gradient: "from-indigo-500 to-emerald-500"
    },
    {
      name: "360JobReady",
      tagline: "AI Career Platform",
      description: "AI career platform with ATS-optimised resume builder, skill-based job matching, and cover letter generator for Indian freshers.",
      url: "https://www.360jobready.com",
      tech: ["Next.js", "GPT-4o", "MongoDB", "Razorpay"],
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      name: "Affixx",
      tagline: "Affiliate & Creator Platform",
      description: "Affiliate and creator monetization platform with real-time conversion tracking, automated payouts, and creator dashboards.",
      url: "https://www.affixx.app",
      tech: ["Next.js", "PostgreSQL", "Stripe", "Cloudflare R2"],
      gradient: "from-teal-500 to-indigo-600"
    }
  ];

  const stats = [
    { value: "13+", label: "Years Experience" },
    { value: "3", label: "Live Products" },
    { value: "6–8 Weeks", label: "MVP Delivery" },
    { value: "Enterprise", label: "Scale" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sandeep Kothapalli",
    "alternateName": ["kothapallisandeep", "sandeepkothapalli", "SandyTech"],
    "jobTitle": "Senior Architect & Founder",
    "description": "Senior Architect & Founder of SandyTech with 13+ years of experience in cloud-native platforms, AI automation, and distributed systems. Expert in .NET, Azure, microservices, Dapr, Kubernetes, and AI-enabled platforms.",
    "url": "https://kothapallisandeep.com",
    "sameAs": [
      "https://www.linkedin.com/in/kothapallisandeep/",
      "https://github.com/websabre",
      "https://x.com/sandeepattech"
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
      "name": "Progience Technologies"
    },
    "founder": {
      "@type": "Organization",
      "name": "SandyTech Private Limited",
      "url": "https://sandytech.org",
      "description": "AI-Powered MVPs & Automation | Built in 6-8 Weeks"
    }
  };

  return (
    <main className="min-h-screen">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 mr-2 animate-pulse"></span>
                Available for new projects · SandyTech Pvt Ltd
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
                  Sandeep Kothapalli
                </span>
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                I turn ideas into deployed AI products. Senior architect, SandyTech founder, 13+ years building enterprise systems.
                Specialising in AI/LLM platforms, cloud migration, and MVPs shipped in 6–8 weeks.
              </p>

              <p className="text-lg text-slate-500 dark:text-slate-400 mb-8">
                Currently building with{" "}
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  <span ref={el} />
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button asChild size="lg" className="text-lg px-8 py-6 bg-indigo-600 hover:bg-indigo-700 text-white border-0">
                  <Link href="/projects">
                    View Live Products
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Link href="/services">
                    Explore Services
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-emerald-500 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30">
                  <Link href="/contact">
                    Get In Touch
                  </Link>
                </Button>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</div>
                  </div>
                ))}
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
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-slate-950/40 to-transparent rounded-2xl"></div>
              </div>
              {/* Floating accent elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-indigo-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-emerald-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Products Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Products Built & Shipped
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real products, in production, built by SandyTech.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Gradient header */}
                <div className={`h-2 bg-gradient-to-r ${product.gradient}`}></div>
                <div className="p-8">
                  <div className={`w-12 h-12 bg-gradient-to-br ${product.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{product.name}</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-3">{product.tagline}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {product.tech.map((t, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                  >
                    Visit Live Site
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What I Do
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              13+ years of enterprise engineering experience across the full stack — from cloud infrastructure to AI/LLM systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 dark:border-slate-700"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Clients Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real outcomes, real products, real feedback.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "Sandeep took our vague idea and turned it into a fully deployed platform in under 8 weeks. The architecture was solid from day one — no post-launch surprises. The kind of engineer you want on speed dial.",
                name: "Arjun Mehta",
                role: "Founder, HealthStack India",
                initials: "AM",
                gradient: "from-indigo-500 to-purple-600",
              },
              {
                quote: "We hired Sandeep to migrate our legacy monolith to microservices on Azure. He didn't just do the migration — he redesigned the whole system so it could actually scale. Downtime during cutover: zero.",
                name: "Priya Nair",
                role: "CTO, Finbridge Solutions",
                initials: "PN",
                gradient: "from-emerald-500 to-teal-600",
              },
              {
                quote: "The RAG pipeline Sandeep built for us reduced our support ticket volume by 40% in the first month. He understood the business problem before writing a single line of code — that's rare.",
                name: "Vikram Rao",
                role: "Head of Product, EdLogic",
                initials: "VR",
                gradient: "from-orange-500 to-amber-600",
              },
            ].map((t, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 flex flex-col">
                <div className="text-4xl text-indigo-300 dark:text-indigo-600 font-serif mb-4">&ldquo;</div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 flex-1 italic">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Something Real?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Drop me a message — free 30-minute architecture consultation, zero pitch attached.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/contact">
                Start a Conversation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-indigo-600">
              <Link href="/services">
                View All Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
