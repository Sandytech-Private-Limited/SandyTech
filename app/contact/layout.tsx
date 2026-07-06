import type { Metadata } from "next";
import { PROFILE } from "@/config/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${PROFILE.name} — ${PROFILE.shortTitle} & Solution Architect. Available for cloud architecture, AI/LLM integration, serverless platforms, and staff augmentation. Based in ${PROFILE.location}, working globally.`,
  keywords: ["contact Sandeep Kothapalli", "hire architect India", "Technical Lead hire", "Solution Architect hire", "freelance architect India", "cloud architect for hire"],
  alternates: { canonical: "https://kothapallisandeep.com/contact" },
  openGraph: {
    title: `Contact ${PROFILE.name} — Technical Lead & Solution Architect`,
    description: "Available for cloud architecture, AI/LLM integration, and enterprise platform engineering. Book a free 30-min consultation.",
    url: "https://kothapallisandeep.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact ${PROFILE.name} — Technical Lead & Solution Architect`,
    description: "Available for cloud architecture, AI/LLM integration, and enterprise platform engineering.",
    creator: "@sandeepattech",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
