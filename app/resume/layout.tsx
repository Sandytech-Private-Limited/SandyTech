import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Sandeep Kothapalli — Senior Architect with 13+ years in .NET, Azure, Kubernetes, Dapr, AI/LLM systems, RAG pipelines, and cloud-native microservices. Available for projects and staff augmentation.",
  keywords: ["Sandeep Kothapalli resume", "kothapallisandeep", "Senior Architect resume", ".NET architect", "Azure architect", "cloud architect India", "AI architect"],
  alternates: { canonical: "https://kothapallisandeep.com/resume" },
  openGraph: {
    title: "Resume — Sandeep Kothapalli, Senior Architect",
    description: "13+ years in .NET, Azure, Kubernetes, Dapr, AI/LLM, and cloud-native microservices.",
    url: "https://kothapallisandeep.com/resume",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume — Sandeep Kothapalli, Senior Architect",
    description: "13+ years in .NET, Azure, Kubernetes, Dapr, AI/LLM, and cloud-native microservices.",
    creator: "@sandeepattech",
  },
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
