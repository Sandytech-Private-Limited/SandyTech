"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Twitter, 
  Calendar,
  Clock,
  MessageSquare,
  Code,
  Cloud,
  Cpu
} from 'lucide-react';
import Link from 'next/link';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can integrate with email services like EmailJS, Formspree, etc.
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "sandeepdotnet@hotmail.com",
      description: "Send me an email anytime",
      link: "mailto:sandeepdotnet@hotmail.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91-8019145771",
      description: "Call or WhatsApp me",
      link: "tel:+918019145771"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Hyderabad, India",
      description: "Available for remote work",
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      url: "https://github.com/sandeepkothapalli",
      description: "Check out my code repositories"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://linkedin.com/in/sandeepkothapalli",
      description: "Connect with me professionally"
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "https://twitter.com/sandeepkothapalli",
      description: "Follow for tech updates"
    }
  ];

  const services = [
    {
      icon: Code,
      title: "Backend Development",
      description: "ASP.NET Core, C#, Web APIs, Microservices"
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Azure, Kubernetes, Docker, CI/CD"
    },
    {
      icon: Cpu,
      title: "AI/ML Applications",
      description: "LLM fine-tuning, AI chatbots, Healthcare AI"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Let's{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Connect
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Ready to discuss your next project? Whether you need backend development, 
              cloud solutions, or AI/ML applications, I'm here to help bring your ideas to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                Available for Projects
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <MessageSquare className="w-4 h-4 mr-2" />
                Quick Response
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Calendar className="w-4 h-4 mr-2" />
                Flexible Schedule
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{info.title}</CardTitle>
                    <CardDescription>{info.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {info.link ? (
                      <Link 
                        href={info.link}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                      >
                        {info.value}
                      </Link>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300 font-medium">{info.value}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Contact Form */}
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send a Message</CardTitle>
                    <CardDescription>
                      Have a project in mind? Let's discuss how I can help you achieve your goals.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            className="w-full"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What's this about?"
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell me about your project, requirements, or any questions you have..."
                          className="w-full min-h-[120px]"
                        />
                      </div>
                      
                      <Button type="submit" size="lg" className="w-full">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                      
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        I typically respond within 24 hours. Your privacy is important to me.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                {/* Services */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Services I Offer</CardTitle>
                    <CardDescription>
                      Here's what I can help you with
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <service.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{service.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Connect on Social</CardTitle>
                    <CardDescription>
                      Follow me for updates and insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {socialLinks.map((social, index) => (
                      <Link
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <social.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{social.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{social.description}</p>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>

                {/* Availability */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Availability</CardTitle>
                    <CardDescription>
                      When you can reach me
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">Available for new projects</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 dark:text-gray-300">IST (UTC+5:30) Timezone</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 dark:text-gray-300">Response time: 24 hours</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;