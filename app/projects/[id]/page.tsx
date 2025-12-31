import { notFound } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { 
  Code, 
  Cloud, 
  Database, 
  Cpu, 
  Globe, 
  ArrowLeft,
  TrendingUp,
  Shield,
  Zap,
  Layers,
  Calendar,
  Building2,
  Target,
  CheckCircle2,
  Lightbulb,
  Network,
  BookOpen,
  Users
} from "lucide-react";
import Link from "next/link";
import { getProjectById, projects } from "@/data/projects";

type Props = {
  params: { id: string }
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectById(Number(params.id));
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.name} | kothapallisandeep | SandyTech`,
    description: project.description,
    keywords: ['kothapallisandeep', 'sandeepkothapalli', 'sandytech', 'sandytech org', 'AI automation', 'Idea to MVP', project.category.toLowerCase(), ...project.technologies],
    openGraph: {
      title: `${project.name} | kothapallisandeep`,
      description: project.description,
      type: 'article',
    },
    alternates: {
      canonical: `https://kothapallisandeep.com/projects/${params.id}`,
    },
  };
}

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = getProjectById(Number(params.id));

  if (!project) {
    notFound();
  }

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
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (project.category) {
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
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
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
          <div className="max-w-5xl mx-auto">
            <Button asChild variant="ghost" className="mb-8">
              <Link href="/projects">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Link>
            </Button>

            {/* Project Header */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12 mb-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Project Name Card */}
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <div className="relative min-h-[250px] flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 rounded-xl p-8">
                    <div className="text-center z-10">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                        {getProjectInitials(project.name)}
                      </div>
                      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                        {project.name.split(' - ')[0]}
                      </h1>
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
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex-1">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <strong className="text-gray-700 dark:text-gray-300">Client:</strong> {project.client}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <strong className="text-gray-700 dark:text-gray-300">Period:</strong> {project.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {project.longDescription}
                  </p>

                  {/* Achievements */}
                  <div className="grid grid-cols-3 gap-4">
                    {project.achievements.map((achievement, index) => (
                      <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-lg border border-blue-100 dark:border-slate-600">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                          {achievement.metric}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {achievement.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Statement */}
            {project.problemStatement && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  Problem Statement
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.problemStatement}
                </p>
              </div>
            )}

            {/* Architecture */}
            {project.architecture && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Network className="w-6 h-6 text-blue-500" />
                  Architecture & Technical Approach
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.architecture}
                </p>
              </div>
            )}

            {/* Challenge, Solution, Impact */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl shadow-xl p-6 border border-red-100 dark:border-red-900/30">
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Challenge
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.challenges}
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl shadow-xl p-6 border border-blue-100 dark:border-blue-900/30">
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Solution
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl shadow-xl p-6 border border-green-100 dark:border-green-900/30">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Impact
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.impact}
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Code className="w-6 h-6 text-purple-500" />
                Technologies & Tools
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-sm px-4 py-2">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Lessons Learned */}
            {project.lessonsLearned && project.lessonsLearned.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-orange-500" />
                  Lessons Learned
                </h2>
                <div className="space-y-3">
                  {project.lessonsLearned.map((lesson, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-900/30">
                      <BookOpen className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{lesson}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6">
              <Button asChild variant="outline">
                <Link href="/projects">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  All Projects
                </Link>
              </Button>
              <Button asChild>
                <Link href="/contact">
                  Start a Similar Project
                  <Users className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

