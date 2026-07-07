// ─────────────────────────────────────────────────────────────────────────────
// Featured Projects — Data Layer
// All project data lives here. Never hardcode inside components.
// ─────────────────────────────────────────────────────────────────────────────

export interface EngineeringHighlight {
  /** Key that maps to an icon in ProjectCard's ICON_MAP */
  icon: string;
  label: string;
}

export interface Metric {
  /**
   * Generic string value — supports any format:
   * "50+", "<120ms", "99.9%", "$50K+", "1M+", "40ms"
   */
  value: string;
  label: string;
}

export type ButtonType = "demo" | "github" | "casestudy" | "architecture";

export interface ProjectButtonData {
  type: ButtonType;
  label: string;
  href: string;
  target?: string;
}

export interface Project {
  /** Zero-padded display ID: "01", "02", "03", "04" */
  id: string;
  number: number;
  title: string;
  category: string;
  description: string;
  engineeringHighlights: EngineeringHighlight[];
  techStack: string[];
  metrics: Metric[];
  /** Ordered: primary action first → demo, github, casestudy, architecture */
  buttons: ProjectButtonData[];
  /** Swap src only — layout stays the same */
  imageSrc: string;
  imageAlt: string;
  /** RGB channel values for the ambient section glow e.g. "59, 130, 246" */
  glowColor: string;
}

// ─────────────────────────────────────────────────────────────────────────────

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "01",
    number: 1,
    title: "Code Fudji",
    category: "Real-Time Collaboration Platform",
    description:
      "A real-time collaborative coding platform with integrated video, voice, chat and file explorer. Built for developers to code, communicate and collaborate seamlessly.",
    engineeringHighlights: [
      { icon: "sync", label: "Real-Time Code Sync" },
      { icon: "video", label: "WebRTC Video & Audio" },
      { icon: "edit", label: "Monaco Editor" },
      { icon: "server", label: "LIVEKIT" },
      { icon: "database", label: "Integrated chat" },
      { icon: "box", label: "File sharing" },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Redis",
      "LIVEKIT",
      "Web Sockets",
      "Web RTC",
    ],
    metrics: [
      { value: "50+", label: "Concurrent Users" },
      { value: "<120ms", label: "Latency" },
      { value: "99%", label: "Sync Accuracy" },
      { value: "99.9%", label: "Uptime" },
    ],
    buttons: [
      { type: "demo", label: "Live Demo", href: "https://code-fudji.vercel.app" , target:"_blank"},
      { type: "github", label: "GitHub", href: "https://github.com/Sadhvikbaba/code-fudji" , target:"_blank"},
      { type: "casestudy", label: "Case Study", href: "https://github.com/Sadhvikbaba/code-fudji" , target:"_blank"},
      { type: "architecture", label: "Architecture", href: "https://github.com/Sadhvikbaba/code-fudji" , target:"_blank"},
    ],
    imageSrc: "/projects/code-fudji.png",
    imageAlt: "Code Fudji — Real-Time Collaboration Platform screenshot",
    glowColor: "59, 130, 246", // blue
  },

  {
    id: "02",
    number: 2,
    title: "WebRTC SFU Platform",
    category: "Scalable Real-Time Video Infrastructure",
    description:
      "A production-grade WebRTC video conferencing infrastructure built on a Selective Forwarding Unit architecture. Engineered to handle thousands of concurrent media streams with sub-200ms latency.",
    engineeringHighlights: [
      { icon: "network", label: "SFU Architecture" },
      { icon: "video", label: "WebRTC Rooms" },
      { icon: "zap", label: "Sub-200ms Latency" },
      { icon: "shield", label: "REDIS Pub/Sub" },
      { icon: "layers", label: "TURN & STUN" },
      { icon: "monitor", label: "Stream Recording" },
    ],
    techStack: [
      "Node.js",
      "WebRTC",
      "MediaSoup",
      "Redis",
      "NGINX",
      "Docker",
      "PostgreSQL",
    ],
    metrics: [
      { value: "1M+", label: "Connections" },
      { value: "200ms", label: "Latency" },
      { value: "99.9%", label: "Uptime" },
      { value: "99%", label: "Reliability" },
    ],
    buttons: [
      { type: "demo", label: "Live Demo", href: "https://github.com/Sadhvikbaba/webrtc" , target:"_blank"},
      { type: "github", label: "GitHub", href: "https://github.com/Sadhvikbaba/webrtc" , target:"_blank"},
      { type: "casestudy", label: "Case Study", href: "https://github.com/Sadhvikbaba/webrtc" , target:"_blank"},
      { type: "architecture", label: "Architecture", href: "https://github.com/Sadhvikbaba/webrtc" , target:"_blank"},
    ],
    imageSrc: "/projects/webrtc.png",
    imageAlt: "WebRTC SFU Platform — Scalable Real-Time Video Infrastructure screenshot",
    glowColor: "168, 85, 247",
  },

  {
    id: "03",
    number: 3,
    title: "AWS FinOps Accelerator",
    category: "AI-Powered Cost Governance",
    description:
      "An intelligent AWS cost optimization platform that uses machine learning to forecast cloud spending, detect anomalies, and automatically implement cost-saving recommendations.",
    engineeringHighlights: [
      { icon: "brain", label: "ML Cost Forecasting" },
      { icon: "alert", label: "Anomaly Detection" },
      { icon: "dollar", label: "Auto Optimization" },
      { icon: "cloud", label: "Multi-Region AWS" },
      { icon: "chart", label: "Amazon LEX" },
      { icon: "bell", label: "Slack Alerts" },
    ],
    techStack: [
      "AWS",
      "CloudWatch",
      "Lambda",
      "Cognito",
      "EC2",
      "S3",
      "API Gateway",
      "VPC",
      "SNS",
      "LEX"
    ],
    metrics: [
      { value: "30%", label: "Cost Savings" },
      { value: "95%", label: "Forecast Accuracy" },
      { value: "$50K+", label: "Saved" },
      { value: "99%", label: "Coverage" },
    ],
    buttons: [
      { type: "demo", label: "Live Demo", href: "https://github.com/Sadhvikbaba/aws-project" , target:"_blank"},
      { type: "github", label: "GitHub", href: "https://github.com/Sadhvikbaba/aws-project" , target:"_blank"},
      { type: "casestudy", label: "Case Study", href: "https://github.com/Sadhvikbaba/aws-project" , target:"_blank"},
      { type: "architecture", label: "Architecture", href: "https://github.com/Sadhvikbaba/aws-project" , target:"_blank"},
    ],
    imageSrc: "/projects/aws.png",
    imageAlt: "AWS FinOps Accelerator — AI-Powered Cost Governance screenshot",
    glowColor: "251, 146, 60", // amber
  },
  {
    id: "04",
    number: 4,
    title: "Twit",
    category: "Youtube & Twitter Clone Platform",
    description:
      "A full-featured social media platform featuring real-time feeds, trending topics, media uploads, and a sophisticated recommendation engine for personalised content delivery at scale.",
    engineeringHighlights: [
      { icon: "feed", label: "Real-Time Feed" },
      { icon: "trending", label: "Trending Algorithm" },
      { icon: "upload", label: "Media Processing" },
      { icon: "search", label: "Full-Text Search" },
      { icon: "bell", label: "Push Notifications" },
      { icon: "shield", label: "Auth & Rate Limiting" },
    ],
    techStack: [
      "React.js",
      "JavaScript",
      "Node.js",
      "Mongo DB",
      "Express.js",
    ],
    metrics: [
      { value: "10K+", label: "Users" },
      { value: "40ms", label: "Response Time" },
      { value: "99%", label: "Reliability" },
      { value: "98%", label: "Availability" },
    ],
    buttons: [
      { type: "demo", label: "Live Demo", href: "https://twit-frontend.vercel.app" , target:"_blank"},
      { type: "github", label: "Frontend", href: "https://github.com/Sadhvikbaba/Twit-frontend" , target:"_blank"},
      { type: "github", label: "Backend", href: "https://github.com/Sadhvikbaba/Twit-backend" , target:"_blank"},
    ],
    imageSrc: "/projects/twit.png",
    imageAlt: "Twit — Twitter Clone Platform screenshot",
    glowColor: "31, 163, 116", // teal-green
  },

  {
    id: "05",
    number: 5,
    title: "Code Guru",
    category: "Online Coding Platform",
    description:
      "A modern online coding platform featuring Judge0-powered code execution, OAuth 2.0 authentication, multi-language support, and an interactive coding environment designed for technical interview preparation and programming practice.",

    engineeringHighlights: [
      { icon: "code", label: "Judge0 Code Execution" },
      { icon: "terminal", label: "Multi-Language Compiler" },
      { icon: "shield", label: "OAuth 2.0 Authentication" },
      { icon: "editor", label: "Monaco Code Editor" },
      { icon: "clock", label: "Real-Time Evaluation" },
      { icon: "database", label: "Submission History" },
    ],
    techStack: [
      "React.js",
      "JavaScript",
      "Node.js",
      "Mongo DB",
      "Express.js",
      "Judge0 API",
      "Monaco Editor",
      "Tailwind CSS",
    ],

    metrics: [
      { value: "5+", label: "Languages Supported" },
      { value: "<2s", label: "Average Execution" },
      { value: "OAuth", label: "Secure Login" },
      { value: "100%", label: "Responsive UI" },
    ],
    buttons: [
      {type: "demo", label: "Live Demo", href: "https://code-guru-frontend.vercel.app/", target: "_blank", },
      {type: "github", label: "Frontend", href: "https://github.com/Sadhvikbaba/codeGuru-Frontend", target: "_blank",},
      {type: "github", label: "Backend", href: "https://github.com/Sadhvikbaba/codeGuru-Backend", target: "_blank", },
    ],

    imageSrc: "/projects/codeGuru.png",
    imageAlt: "Code Guru — Online Coding Platform screenshot",

    glowColor: "245, 158, 11", // amber
  },
];
