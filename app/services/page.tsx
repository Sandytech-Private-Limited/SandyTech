import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Cloud,
  Cpu,
  Code,
  Zap,
  ArrowRight,
  CheckCircle,
  Database,
  Globe,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { PROFILE } from "@/config/profile";

export const metadata: Metadata = {
  title: "Services",
  description: `Serverless and cloud-native architecture, AI/LLM integration, enterprise platform engineering, legacy modernization, and distributed systems — by ${PROFILE.name}. Fixed-scope projects, staff augmentation, or advisory.`,
  keywords: ["Sandeep Kothapalli services", "Solution Architect services", "cloud architecture services", "LLM integration", "serverless architecture", "microservices consulting", "Azure architect for hire", "Technical Lead for hire"],
  alternates: { canonical: "https://kothapallisandeep.com/services" },
  openGraph: {
    title: "Services — Sandeep Kothapalli",
    description: "Serverless and cloud-native architecture, AI/LLM integration, enterprise platform engineering, and legacy modernization. Fixed-scope, staff augmentation, or advisory.",
    type: "website",
    url: "https://kothapallisandeep.com/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Sandeep Kothapalli",
    description: "Serverless and cloud-native architecture, AI/LLM integration, and enterprise platform engineering. Fixed-scope, staff augmentation, or advisory.",
    creator: "@sandeepattech",
  },
};

const services = [
  {
    icon: Cloud,
    title: "Cloud Architecture & Migration",
    tagline: "Azure · AWS · Kubernetes · Legacy Modernization",
    description:
      "End-to-end cloud-native architecture design, migration planning, and implementation. From lift-and-shift to full microservices re-architecture — assessed, scoped, and delivered with zero-downtime strategies.",
    deliverables: [
      "Cloud architecture design and review",
      "Azure / AWS infrastructure provisioning (Terraform/IaC)",
      "Kubernetes orchestration and Helm chart setup",
      "Legacy monolith to microservices migration",
      "Dapr integration for service mesh and pub/sub",
      "CI/CD pipeline setup with Azure DevOps or GitHub Actions",
      "Observability stack: logging, metrics, distributed tracing",
    ],
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Cpu,
    title: "AI / LLM Integration",
    tagline: "RAG Pipelines · Agent Workflows · Vector Search · Azure OpenAI",
    description:
      "Integrate AI capabilities into your existing systems or build AI-first products from scratch. Specialising in production-grade RAG systems, multi-agent orchestration, and LLM-powered automation.",
    deliverables: [
      "RAG pipeline design and implementation",
      "Vector database setup and embedding strategy",
      "Multi-agent orchestration (EMAOS framework)",
      "LLM integration into existing microservices",
      "Prompt engineering and output parsing",
      "AI cost optimisation (caching, batching, compression)",
      "Secure, auditable AI features for enterprise environments",
    ],
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Zap,
    title: "AI-Enabled Product Engineering",
    tagline: "Full-Stack · Serverless · Production-Ready",
    description:
      "End-to-end product engineering for startups and enterprises. Architecture, design, development, and deployment — production-grade cloud-native and AI-enabled platforms.",
    deliverables: [
      "Product scoping and technical architecture",
      "Full-stack development (React/Next.js + Node.js / .NET)",
      "Database design (SQL, Cosmos DB, MongoDB)",
      "Authentication, authorisation, and security",
      "Cloud deployment (Azure / AWS) with CI/CD",
      "Post-launch support and iteration",
      "Investor-ready technical documentation",
    ],
    color: "from-orange-500 to-amber-600",
    highlight: true,
  },
  {
    icon: Code,
    title: "Enterprise Platform Engineering",
    tagline: "Microservices · Dapr · Event-Driven · .NET",
    description:
      "Design and build enterprise-scale distributed systems — from domain modelling and clean architecture to event-driven systems and real-time data platforms.",
    deliverables: [
      "Domain-Driven Design (DDD) and bounded context mapping",
      "Microservices architecture with Dapr Actor Model",
      "Event-driven architecture with Azure Event Hubs / Kafka",
      "CQRS and event sourcing implementations",
      "Performance optimisation and reliability engineering",
      "High availability and fault tolerance patterns",
      "Code reviews, team mentoring, and architectural governance",
    ],
    color: "from-green-500 to-teal-600",
  },
  {
    icon: CreditCard,
    title: "Payment Integration",
    tagline: "Razorpay · Route & Split · Marketplace Payments",
    description:
      "End-to-end payment gateway integration for SaaS products and marketplaces, including complex routing, split payments, and reconciliation workflows.",
    deliverables: [
      "Razorpay payment gateway integration",
      "Route & Split for multi-vendor marketplace payouts",
      "Subscription and recurring billing setup",
      "Payment webhook handling and event processing",
      "QA test case design for payment flows",
      "PCI-DSS compliance review and implementation",
    ],
    color: "from-indigo-500 to-blue-600",
  },
  {
    icon: Globe,
    title: "Automation & Workflow Engineering",
    tagline: "n8n · Business Process Automation · Social Media Automation",
    description:
      "Design and build no-code/low-code automation workflows that reduce manual effort, connect disparate systems, and enable teams to scale without headcount.",
    deliverables: [
      "n8n workflow design and implementation",
      "CRM and lead pipeline automation",
      "Social media and content scheduling automation",
      "Cross-platform API orchestration",
      "Internal operations automation (HR, finance, support)",
    ],
    color: "from-rose-500 to-pink-600",
  },
];

const engagement = [
  {
    icon: ShieldCheck,
    title: "Fixed-Scope Projects",
    description: "Defined deliverables, timeline, and cost. Ideal for MVPs, migrations, and integrations.",
  },
  {
    icon: Code,
    title: "Staff Augmentation",
    description: "Embed as a senior architect or lead engineer in your existing team on a monthly basis.",
  },
  {
    icon: Cpu,
    title: "Advisory / Review",
    description: "Architecture review, code audit, or AI strategy sessions billed by the hour or day.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Available for new projects
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Services &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">
                Expertise
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              13+ years of enterprise engineering distilled into focused services — serverless and cloud-native architecture, AI-enabled platform integration, legacy modernization, and distributed systems delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/contact">
                  Discuss a Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
                <Link href="/projects">View Past Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">What I Build & Deliver</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 ${
                    service.highlight ? "ring-2 ring-orange-400 dark:ring-orange-500" : ""
                  }`}
                >
                  {service.highlight && (
                    <div className="absolute -top-3 left-8">
                      <Badge className="bg-orange-500 text-white border-0 text-xs px-3 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{service.title}</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-3">{service.tagline}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">{service.description}</p>
                  <div className="space-y-2">
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">Engagement Models</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              Flexible arrangements to match your project type and budget.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {engagement.map((model, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <model.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{model.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{model.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Drop me a message with your project brief and I'll get back within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/contact">
                Get In Touch
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-indigo-600">
              <Link href="/projects">View Past Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
