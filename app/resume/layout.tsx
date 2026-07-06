import type { Metadata } from "next";
import { PROFILE } from "@/config/profile";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${PROFILE.name} — ${PROFILE.title}. 13+ years in .NET, TypeScript, AWS, Azure, Kubernetes, Dapr, AI/LLM systems, RAG pipelines, and serverless cloud-native microservices.`,
  keywords: ["Sandeep Kothapalli resume", "kothapallisandeep", "Technical Lead resume", "Solution Architect resume", ".NET architect", "Azure architect", "cloud architect India", "AI architect"],
  alternates: { canonical: "https://kothapallisandeep.com/resume" },
  openGraph: {
    title: `Resume — ${PROFILE.name}, Technical Lead & Solution Architect`,
    description: PROFILE.summary[0],
    url: "https://kothapallisandeep.com/resume",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `Resume — ${PROFILE.name}, Technical Lead & Solution Architect`,
    description: PROFILE.summary[0],
    creator: "@sandeepattech",
  },
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
