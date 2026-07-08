export interface Certificate {
  id: string;
  title: string;
  shortName: string;
  issuer: string;
  issuerLogo?: string;
  issuedDate: string;
  credentialId?: string;
  description: string;
  skills: string[];
  previewImage: string;
  verifyUrl?: string;
  certificateUrl?: string;
}

export const CERTIFICATION_ILLUSTRATIONS = {
  light: "/certificates/light.png",
  dark: "/certificates/dark.png",
};

export const CERTIFICATES: Certificate[] = [
  {
    id: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    shortName: "AWS",
    issuer: "Amazon Web Services",
    issuedDate: "2025",
    credentialId: "b307d31850344602a7946c09a0bc0e96",
    description: "Validated cloud computing knowledge covering AWS core services, networking, security, deployment, and architectural best practices.",
    skills: ["AWS", "IAM", "EC2", "S3", "VPC", "Cloud"],
    previewImage: "/certificates/aws.png",
    verifyUrl: "https://www.credly.com/badges/a9189f7b-3c69-47fd-abe7-439bb1e37f85/public_url",
    certificateUrl: "https://www.credly.com/badges/a9189f7b-3c69-47fd-abe7-439bb1e37f85/public_url"
  },
  {
    id: "hackerrank-python",
    title: "HackerRank Python (Basic)",
    shortName: "Python",
    issuer: "HackerRank",
    issuedDate: "2024",
    credentialId: "EC2246DC7578",
    description: "Demonstrated proficiency in Python basics including data types, operators, and basic logic structures.",
    skills: ["Python", "Algorithms", "Data Structures"],
    previewImage: "/certificates/python.png",
    verifyUrl : "https://www.hackerrank.com/certificates/ec2246dc7578",
    certificateUrl: "https://www.hackerrank.com/certificates/ec2246dc7578"
  },
  {
    id: "hackerrank-problem-solving",
    title: "HackerRank Problem Solving (Intermediate)",
    shortName: "Problem Solving",
    issuer: "HackerRank",
    issuedDate: "2024",
    credentialId: "8E923B8EEDD2",
    description: "Validated intermediate problem-solving skills, focusing on advanced algorithms and optimal data structure usage.",
    skills: ["Algorithms", "Problem Solving", "Logic", "Optimization"],
    previewImage: "/certificates/problem.png",
    verifyUrl : "https://www.hackerrank.com/certificates/8e923b8fedd2",
    certificateUrl: "https://www.hackerrank.com/certificates/8e923b8fedd2"
  },
  {
    id: "postman-api",
    title: "Postman API Fundamentals Student Expert",
    shortName: "Postman API",
    issuer: "Postman",
    issuedDate: "2024",
    credentialId: "POSTMAN-API",
    description: "Demonstrated knowledge of API fundamentals, request methods, authorization, and using Postman for API testing.",
    skills: ["REST API", "Testing", "HTTP", "JSON"],
    previewImage: "/certificates/postman.png",
  },
  {
    id: "nptel-c",
    title: "NPTEL Introduction to Programming in C (Elite)",
    shortName: "NPTEL Elite",
    issuer: "NPTEL",
    issuedDate: "2023",
    credentialId: "NPTEL-C-ELITE",
    description: "Achieved elite status in C programming, covering pointers, arrays, memory management, and system-level concepts.",
    skills: ["C", "Pointers", "Memory Management", "Algorithms"],
    previewImage: "/certificates/nptel.png",
  }
];
