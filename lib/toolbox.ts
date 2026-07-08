export interface Technology {
  name: string;
  projects: string[]; // Projects that use this specific technology (for highlighting)
}

export interface ToolboxCategory {
  id: string; // e.g. "01" - "07"
  title: string;
  description: string;
  icon: string; // Identifier for react-icons map
  technologies: Technology[];
  projects: string[]; // List of unique projects under "Used in"
}

export const toolboxCategories: ToolboxCategory[] = [
  {
    id: "01",
    title: "Programming Languages",
    description: "The foundation for solving problems and building software across domains.",
    icon: "code",
    technologies: [
      { name: "C++", projects: ["All Projects"] },
      { name: "Python", projects: ["All Projects"] },
      { name: "JavaScript", projects: ["All Projects"] },
      { name: "TypeScript", projects: ["All Projects"] },
      { name: "Go", projects: ["All Projects"] },
    ],
    projects: ["All Projects"],
  },
  {
    id: "02",
    title: "Interface Engineering",
    description: "Designing responsive, accessible, and performant user experiences.",
    icon: "laptop",
    technologies: [
      { name: "React.js", projects: ["Twit", "Code Guru"] },
      { name: "Next.js", projects: ["Portfolio", "Infinitus Fest", "Code Guru"] },
      { name: "Tailwind CSS", projects: ["Portfolio", "Infinitus Fest", "Code Guru", "Twit"] },
      { name: "Framer Motion", projects: ["Portfolio"] },
      { name: "ShadCN", projects: ["Code Guru"] },
    ],
    projects: ["Portfolio", "Infinitus Fest", "Twit", "Code Guru"],
  },
  {
    id: "03",
    title: "Backend Engineering",
    description: "Designing scalable APIs, services, and application architecture.",
    icon: "server",
    technologies: [
      { name: "Node.js", projects: ["Code Fudji", "Twit", "Portfolio"] },
      { name: "Express.js", projects: ["Code Fudji", "Twit"] },
      { name: "Go", projects: ["GO TODO"] },
      { name: "REST APIs", projects: ["Code Fudji", "Twit", "Portfolio", "GO TODO"] },
      { name: "GraphQL", projects: ["Portfolio"] },
    ],
    projects: ["Code Fudji", "Twit", "Portfolio", "GO TODO"],
  },
  {
    id: "04",
    title: "Data & Persistence",
    description: "Choosing the right storage technology for every workload.",
    icon: "database",
    technologies: [
      { name: "PostgreSQL", projects: ["Code Paglu"] },
      { name: "MongoDB", projects: ["Code Guru"] },
      { name: "Redis", projects: ["Code Guru", "FinOps Accelerator", "Portfolio"] },
      { name: "Prisma ORM", projects: ["Code Paglu"] },
    ],
    projects: ["Code Guru", "FinOps Accelerator", "Code Paglu", "Portfolio"],
  },
  {
    id: "05",
    title: "Real-Time Systems",
    description: "Powering collaborative experiences with low-latency communication.",
    icon: "bolt",
    technologies: [
      { name: "WebRTC", projects: ["WebRTC Platform", "Code Fudji"] },
      { name: "WebSockets", projects: ["Code Fudji", "WebRTC Platform"] },
      { name: "MediaSoup", projects: ["WebRTC Platform"] },
    ],
    projects: ["Code Fudji", "WebRTC Platform"],
  },
  {
    id: "06",
    title: "Cloud & DevOps",
    description: "Deploying, monitoring, and scaling production applications.",
    icon: "cloud",
    technologies: [
      { name: "AWS", projects: ["AWS FinOps Accelerator"] },
      { name: "Docker", projects: ["Self-Healing Platform"] },
      { name: "Prometheus", projects: ["Self-Healing Platform"] },
      { name: "Grafana", projects: ["Self-Healing Platform"] },
      { name: "Loki", projects: ["Self-Healing Platform"] },
    ],
    projects: ["AWS FinOps Accelerator", "Self-Healing Platform"],
  },
  {
    id: "07",
    title: "Development Workflow",
    description: "Tools and practices that streamline development and collaboration.",
    icon: "workflow",
    technologies: [
      { name: "Git", projects: ["All Projects"] },
      { name: "GitHub", projects: ["All Projects"] },
      { name: "Linux", projects: ["All Projects"] },
      { name: "Postman", projects: ["All Projects"] },
      { name: "VS Code", projects: ["All Projects"] },
    ],
    projects: ["All Projects"],
  },
];
