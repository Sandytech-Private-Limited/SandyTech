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
    "Programming & Frameworks": ["C#", "ASP.NET Core", ".NET Framework", "WPF (MVVM)", "Angular", "React", "JavaScript/TypeScript", "Expo React Native"],
    "Cloud & DevOps": ["Microsoft Azure", "Kubernetes (AKS)", "Docker", "Terraform", "GitHub Actions", "CI/CD pipelines", "Azure DevOps"],
    "Microservices & Middleware": ["Dapr", "Service Bus", "SignalR", "REST APIs", "gRPC"],
    "Databases": ["SQL Server", "MongoDB", "LiteDB", "Redis", "Supabase", "Cosmos DB"],
    "AI & ML": ["LLM fine-tuning", "AI-powered chatbots", "AI healthcare triage", "Recommendation systems"],
    "Other Tools": ["Syncfusion", "Tailwind", "shadcn/ui", "Recharts", "Playwright", "SonarQube"]
  };

  const experience = [
    {
      title: "Senior .NET Developer / Architect",
      company: "Freelance & Independent Product Developer",
      period: "2018 – Present",
      description: "Designed and implemented multiple .NET Core Web APIs with MongoDB and Redis backends. Built real-time chat assistants with SignalR, integrating typing indicators, emojis, and chatbot personality customization.",
      achievements: [
        "Developed B2C Offer Platform (MVP) with scalable MongoDB schema and modern UI",
        "Architected microservices-based systems using Dapr Actors, Workflows, and Bindings",
        "Implemented cloud-native solutions with Azure (AKS, ACR, KeyVault, Functions) and GitHub Actions CI/CD",
        "Experimented with AI/LLM-powered applications including Educative.ai, MediAssist AI, and legal LLMs"
      ]
    },
    {
      title: "Software Engineer",
      company: "Multiple Enterprise Projects (Service & Product based)",
      period: "2012 – 2018",
      description: "Led backend development for enterprise-grade .NET applications with SQL Server. Migrated legacy .NET Framework systems to .NET Core and Azure Cloud.",
      achievements: [
        "Built WPF desktop apps using MVVM and Syncfusion controls",
        "Designed secure authentication systems with OpenID Connect and OAuth2",
        "Led team mentoring and architecture design for multiple enterprise projects"
      ]
    }
  ];

  const projects = [
    {
      name: "Educative.ai (MVP)",
      description: "AI-powered learning platform with chat/video-based learning, quizzes, and certificates",
      tech: ["AI/LLM", "React", "ASP.NET Core", "MongoDB"]
    },
    {
      name: "MediAssist AI",
      description: "AI healthcare triage and escalation system using Dapr Workflow & Agents",
      tech: ["AI/Healthcare", "Dapr", "Azure", "Microservices"]
    },
    {
      name: "B2C Offer Platform",
      description: "Vendor-user marketplace with scalable MongoDB schema, web app MVP, and roadmap for mobile",
      tech: ["React", "MongoDB", "ASP.NET Core", "Azure"]
    },
    {
      name: "Real-time Chat Assistant",
      description: "SignalR-based chat app with dark mode, typing indicators, voice input, and chat history",
      tech: ["SignalR", "ASP.NET Core", "React", "Real-time"]
    },
    {
      name: "Health Platform App (MVP)",
      description: "Built with React Native (Expo) + Supabase for lab test booking, teleconsultation, and health records",
      tech: ["React Native", "Expo", "Supabase", "Healthcare"]
    },
    {
      name: "NexusEd",
      description: "Teacher-student discovery platform with strong vetting, controlled contact, and trust-focused design",
      tech: ["React", "ASP.NET Core", "Education", "Trust Systems"]
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
                  Innovative and results-driven Senior Software Engineer with 12+ years of experience in designing, 
                  developing, and deploying scalable applications.
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
                  Currently transitioning towards AI/LLM-driven applications, combining strong backend expertise 
                  with modern cloud and AI technologies.
                </p>
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
                Skilled in building cloud-native microservices with Dapr, Kubernetes, and CI/CD pipelines, 
                and experienced in developing real-time chat apps, B2C platforms, health apps, and AI-powered 
                learning systems. Passionate about problem solving, architecture design, team mentoring, 
                and indie product building.
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
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {job.description}
                  </p>
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
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {project.name}
                  </h3>
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
                  Bachelor of Technology (B.Tech)
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Computer Science & Engineering
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  [University/College Name Placeholder]
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <Award className="w-8 h-8 text-green-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Certifications</h3>
                </div>
                <ul className="space-y-2">
                  <li className="text-gray-600 dark:text-gray-300">
                    Microsoft Certified: Azure Developer Associate
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    Kubernetes Fundamentals (CKAD/CKA)
                  </li>
                  <li className="text-gray-600 dark:text-gray-300">
                    AI/ML Fundamentals – Coursera/DeepLearning.ai
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
                "AI/LLM development (Legal AI, Healthcare AI, EdTech AI)",
                "Cloud-native architecture and DevOps",
                "Indie product development and startup ecosystems",
                "Reading existential, brainy, and scientific books"
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