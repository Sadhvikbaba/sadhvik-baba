import { FiGithub, FiLinkedin, FiMail, FiFileText, FiCode } from "react-icons/fi";

export const SOCIAL_LINKS = [
  {
    id: "github",
    title: "GitHub",
    description: "github.com/SadhvikBaba",
    icon: FiGithub,
    href: "https://github.com/Sadhvikbaba",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "linkedin.com/in/sadhvik-baba",
    icon: FiLinkedin,
    href: "https://www.linkedin.com/in/sadhvik-baba-patibandla-563964278",
  },
  {
    id: "leetcode",
    title: "LeetCode",
    description: "500+ Problems Solved",
    icon: FiCode,
    href: "https://leetcode.com/u/sadhvik_baba_patibandla",
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
    href: "https://drive.google.com/file/d/1aQM8IO26xb8tdmBR3IWiuUeY4fIat9XA/view?usp=sharing",
  },
];

export const INFO_ITEMS = [
  { label: "Location", value: "India", icon: "MapPin" },
  { label: "Response Time", value: "Usually within 24 Hours", icon: "Clock" },
  { label: "Open To", value: "Internships · Full-Time\nOpen Source", icon: "Briefcase" },
  { label: "Current Focus", value: "Distributed Systems & Cloud Architecture", icon: "Target" },
];
