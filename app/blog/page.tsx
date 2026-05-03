import React from "react"; 
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import fs, { readFileSync } from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, Clock, ArrowRight, BookOpen, Code, Database, Cloud, Cpu, Mail } from "lucide-react";
import Image from "next/image";

interface BlogType {
  slug: string; 
  title: string;
  description: string; 
  imageUrl?: string;
  date?: string;
  category?: string;
  readTime?: string;
};

const dirContent = fs.readdirSync(`${process.cwd()}/content`, "utf-8");

const blogs: BlogType[] = dirContent.map(file => { 
  const fileContent = readFileSync(`content/${file}`, "utf-8");
  const { data } = matter(fileContent);
  const value: BlogType = {
    slug: data.slug,
    title: data.title,
    description: data.description,
    imageUrl: data?.imageUrl,
    date: data?.date || new Date().toISOString().split('T')[0],
    category: data?.category || "Technology",
    readTime: data?.readTime || "5 min read"
  };
  return value;
});

// Sort blogs by date (newest first)
blogs.sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime());

const getCategoryIcon = (category: string) => {
  switch (category?.toLowerCase()) {
    case 'programming':
    case 'development':
      return <Code className="w-4 h-4" />;
    case 'database':
      return <Database className="w-4 h-4" />;
    case 'cloud':
    case 'devops':
      return <Cloud className="w-4 h-4" />;
    case 'ai':
    case 'ml':
      return <Cpu className="w-4 h-4" />;
    default:
      return <BookOpen className="w-4 h-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category?.toLowerCase()) {
    case 'programming':
    case 'development':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'database':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'cloud':
    case 'devops':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'ai':
    case 'ml':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const BlogList = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Technical{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">
                Blog
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Insights, tutorials, and thoughts on modern software development, 
              AI/ML applications, cloud architecture, and emerging technologies.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Code className="w-4 h-4 mr-2" />
                Programming
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Cloud className="w-4 h-4 mr-2" />
                Cloud & DevOps
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Cpu className="w-4 h-4 mr-2" />
                AI/ML
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Database className="w-4 h-4 mr-2" />
                Databases
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog: BlogType, index: number) => (
                <article
                  key={index}
                  className="group bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.imageUrl || "/blogimg.jpg"}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getCategoryColor(blog.category || '')} flex items-center gap-1`}>
                        {getCategoryIcon(blog.category || '')}
                        {blog.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(blog.date || '').toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 mr-2" />
                      {blog.readTime}
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {blog.title}
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                      {blog.description}
                    </p>
                    
                    <Link
                      href={`/blogpost/${blog.slug}`}
                      className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors group"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stay Updated with Latest Insights
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Follow my journey in software development, AI/ML applications, and cloud architecture. 
            Get notified about new posts and technical insights.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Link href="/contact">
              <Mail className="mr-2 w-5 h-5" />
              Subscribe to Updates
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical blog by Sandeep Kothapalli — in-depth articles on .NET microservices, Azure cloud architecture, AI/LLM and RAG pipelines, Dapr, Kubernetes, WebRTC, n8n automation, and SandyTech MVP delivery. Real-world lessons from 13+ years of enterprise engineering.',
  keywords: ['Sandeep Kothapalli blog', 'kothapallisandeep', 'SandyTech blog', 'technical blog', '.NET blog', 'Azure blog', 'AI architecture blog', 'RAG pipeline', 'Dapr', 'Kubernetes', 'cloud-native blog'],
  alternates: { canonical: 'https://kothapallisandeep.com/blog' },
  openGraph: {
    title: 'Technical Blog — Sandeep Kothapalli & SandyTech',
    description: 'In-depth articles on .NET, Azure, AI/LLM, RAG pipelines, Dapr, Kubernetes, and MVP delivery from 13+ years of enterprise engineering.',
    type: 'website',
    url: 'https://kothapallisandeep.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Blog — Sandeep Kothapalli & SandyTech',
    description: 'In-depth articles on .NET, Azure, AI/LLM, RAG pipelines, Dapr, Kubernetes, and MVP delivery.',
    creator: '@sandeepattech',
  },
}

export default BlogList;
