import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import {
  Code,
  Cloud,
  Database,
  Cpu,
  Globe,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  Layers,
  Calendar,
  Building2,
  Target,
  CheckCircle2,
  Rocket,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { PROFILE } from "@/config/profile";

export const metadata: Metadata = {
  title: 'Projects',
  description: `Enterprise and product projects by ${PROFILE.name} — cloud-native platforms, serverless architecture, AI-enabled systems, and distributed microservices built with .NET, TypeScript, AWS, Azure, Kubernetes, and AI/LLM systems.`,
  keywords: ['Sandeep Kothapalli projects', 'kothapallisandeep', 'NexusEd', '360JobReady', 'Affixx', 'cloud-native projects', 'AI products', 'enterprise architecture', 'serverless architecture'],
  alternates: { canonical: 'https://kothapallisandeep.com/projects' },
  openGraph: {
    title: 'Projects — Sandeep Kothapalli',
    description: 'Live products and enterprise projects: NexusEd, 360JobReady, Affixx, and more. Cloud-native platforms, AI/LLM systems, and MVPs.',
    type: 'website',
    url: 'https://kothapallisandeep.com/projects',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects — Sandeep Kothapalli',
    description: 'Live products: NexusEd, 360JobReady, Affixx. Enterprise cloud-native and AI/LLM projects.',
    creator: '@sandeepattech',
  },
};

export default function Projects() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Enterprise Platform":
        return <Layers className="w-5 h-5" />;
      case "Enterprise Modernization":
        return <TrendingUp className="w-5 h-5" />;
      case "Healthcare Platform":
        return <Shield className="w-5 h-5" />;
      case "Insurance Platform":
        return <Shield className="w-5 h-5" />;
      case "AI/ML Platform":
        return <Cpu className="w-5 h-5" />;
      case "E-Commerce Platform":
        return <Globe className="w-5 h-5" />;
      case "Architecture & Tools":
        return <Code className="w-5 h-5" />;
      case "Data Platform":
        return <Database className="w-5 h-5" />;
      case "Product / SaaS":
        return <Rocket className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Enterprise Platform":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Enterprise Modernization":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Healthcare Platform":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Insurance Platform":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200";
      case "AI/ML Platform":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "E-Commerce Platform":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200";
      case "Architecture & Tools":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200";
      case "Data Platform":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200";
      case "Product / SaaS":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getProjectGradient = (category: string) => {
    if (category === "Product / SaaS") {
      return "from-indigo-500 via-emerald-500 to-teal-600 dark:from-indigo-600 dark:via-emerald-600 dark:to-teal-700";
    }
    return "from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600";
  };

  const getProjectInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .filter(char => /[A-Z]/.test(char))
      .slice(0, 2)
      .join('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">
                Projects
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Enterprise-scale platforms and production products showcasing serverless architecture, cloud-native microservices, AI-enabled systems, and modern distributed engineering.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Cloud className="w-4 h-4 mr-2" />
                Cloud-Native
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Cpu className="w-4 h-4 mr-2" />
                AI/ML Integration
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Layers className="w-4 h-4 mr-2" />
                Microservices
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                High Performance
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="md:flex">
                    {/* Project Name Card Section - Replaces Image */}
                    <div className={`md:w-1/3 relative min-h-[200px] md:min-h-[300px] flex items-center justify-center bg-gradient-to-br ${getProjectGradient(project.category)} p-8`}>
                      <div className="text-center z-10">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                          {getProjectInitials(project.name)}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                          {project.name.split(' - ')[0]}
                        </h2>
                        {project.name.includes(' - ') && (
                          <p className="text-white/90 text-sm md:text-base">
                            {project.name.split(' - ')[1]}
                          </p>
                        )}
                        <div className="mt-4 flex justify-center">
                          <Badge className={`${getCategoryColor(project.category)} border-white/20 flex items-center gap-1`}>
                            {getCategoryIcon(project.category)}
                            {project.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
                    </div>

                    {/* Content Section */}
                    <div className="md:w-2/3 p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                            <span className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {project.client}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {project.period}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Achievements */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {project.achievements.map((achievement, index) => (
                          <div key={index} className="text-center p-3 bg-gradient-to-br from-indigo-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-lg border border-indigo-100 dark:border-slate-600">
                            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                              {achievement.metric}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              {achievement.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                          <Code className="w-4 h-4" />
                          Technologies Used
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 6).map((tech, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 6 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 6} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Key Features Preview */}
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Key Features
                        </h3>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {project.keyFeatures.slice(0, 4).map((feature, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                              <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              <span className="line-clamp-2">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Challenge, Solution, Impact */}
                      <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
                          <h4 className="font-semibold text-red-700 dark:text-red-400 mb-1 flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            Challenge
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-3">{project.challenges}</p>
                        </div>
                        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                          <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-1 flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            Solution
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-3">{project.solution}</p>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/30">
                          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Impact
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-3">{project.impact}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button asChild variant="outline" className="flex-1 group/btn">
                          <Link href={`/projects/${project.id}`}>
                            View Full Project Details
                            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                        {project.url && (
                          <Button asChild variant="outline" className="flex-shrink-0 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                            <a href={project.url} target="_blank" rel="noopener noreferrer">
                              Visit Live Site
                              <ExternalLink className="ml-2 w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Next Project?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how I can help bring your ideas to life with modern architecture,
            AI integration, and scalable solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/contact">
                Start a Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-indigo-600">
              <Link href="/resume">
                View Resume
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
