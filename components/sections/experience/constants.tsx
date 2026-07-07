import { ReactNode } from "react";
import { FaUsers, FaChartLine, FaRocket, FaServer, FaCheckCircle, FaLaptopCode } from "react-icons/fa";

export interface ExperienceMetric {
  id: string;
  label: string;
  value: number | string;
  icon: ReactNode;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  metrics: ExperienceMetric[];
  highlights: string[];
  tech: string[];
  logo?: string;
  website?: string;
}

export const experiences: Experience[] = [
  {
    id: "infinitus",
    company: "Infinitus Fest",
    role: "Web Developer",
    duration: "February 2026",
    location: "SRM University, AP",
    description: "Built and deployed the official event website for one of the biggest technical and cultural fests at SRM AP, focusing on a responsive and modern user experience.",
    metrics: [
      {
        id: "inf-1",
        label: "Official Event Website",
        value: "Deployed",
        icon: <FaRocket className="w-4 h-4" />
      },
      {
        id: "inf-2",
        label: "Responsive Experience",
        value: "100%",
        icon: <FaLaptopCode className="w-4 h-4" />
      },
      {
        id: "inf-3",
        label: "Next.js 16 Powered",
        value: "Fast",
        icon: <FaServer className="w-4 h-4" />
      }
    ],
    highlights: [
      "Official Infinitus Fest Website"
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
  },
  {
    id: "ntl",
    company: "Next Tech Lab",
    role: "Software Developer",
    duration: "Nov 2023 – Jan 2026",
    location: "SRM University AP",
    description: "Developed impactful software solutions serving large student communities and collaborated closely with cross-functional teams to automate and optimize workflows.",
    metrics: [
      {
        id: "ntl-1",
        label: "Users Served",
        value: 10000,
        icon: <FaUsers className="w-4 h-4" />
      },
      {
        id: "ntl-2",
        label: "Higher Engagement",
        value: 30,
        icon: <FaChartLine className="w-4 h-4" />
      },
      {
        id: "ntl-3",
        label: "Faster Approval Workflow",
        value: 40,
        icon: <FaCheckCircle className="w-4 h-4" />
      }
    ],
    highlights: [
      "Social Media Platform",
      "Outpass Management System",
      "9 Hacks Hackathon (2nd Place)"
    ],
    tech: ["React", "Node.js", "Appwrite", "MongoDB", "Tailwind CSS", "TypeScript", "Docker", "AWS"],
  }
];
