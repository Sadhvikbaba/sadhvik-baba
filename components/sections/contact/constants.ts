import { FiGithub, FiLinkedin, FiMail, FiFileText, FiCode } from "react-icons/fi";

export const SOCIAL_LINKS = [
  {
    id: "github",
    title: "GitHub",
    description: "github.com/SadhvikBaba",
    icon: FiGithub,
    href: "https://github.com/SadhvikBaba",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "linkedin.com/in/sadhvik-baba",
    icon: FiLinkedin,
    href: "https://linkedin.com/in/sadhvik-baba",
  },
  {
    id: "leetcode",
    title: "LeetCode",
    description: "500+ Problems Solved",
    icon: FiCode,
    href: "https://leetcode.com/sadhvik-baba",
  },
  {
    id: "email",
    title: "Email",
    description: "psadhvik2006@gmail.com",
    icon: FiMail,
    href: "mailto:psadhvik2006@gmail.com",
  },
  {
    id: "resume",
    title: "Resume",
    description: "Download My Resume",
    icon: FiFileText,
    href: "/resume.pdf",
  },
];

export const INFO_ITEMS = [
  { label: "Location", value: "India", icon: "MapPin" },
  { label: "Response Time", value: "Usually within 24 Hours", icon: "Clock" },
  { label: "Open To", value: "Internships · Full-Time\nOpen Source", icon: "Briefcase" },
  { label: "Current Focus", value: "Real-Time Systems\nDistributed Systems\nCloud Infrastructure", icon: "Target" },
];
