import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sandeep Kothapalli — Senior Architect. Available for MVP delivery, cloud architecture, AI/LLM integration, and staff augmentation. Based in Hyderabad, working globally.",
  keywords: ["contact Sandeep Kothapalli", "hire architect India", "AI MVP developer hire", "freelance architect India", "cloud architect for hire"],
  alternates: { canonical: "https://kothapallisandeep.com/contact" },
  openGraph: {
    title: "Contact Sandeep Kothapalli — Senior Architect",
    description: "Available for MVP delivery, cloud architecture, AI/LLM integration, and staff augmentation. Book a free 30-min consultation.",
    url: "https://kothapallisandeep.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Sandeep Kothapalli — Senior Architect",
    description: "Available for MVP delivery, cloud architecture, and AI/LLM integration. Book a free 30-min consultation.",
    creator: "@sandeepattech",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
