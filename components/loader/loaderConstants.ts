// Loader stage labels — portfolio-specific, premium feel
export const LOADING_STAGES = [
  "Preparing Interface",
  "Building Components",
  "Loading Experience",
  "Connecting Systems",
  "Welcome.",
] as const;

export type LoadingStage = (typeof LOADING_STAGES)[number];

// Timing config (ms)
export const LOADER_TIMING = {
  minDisplay: 3500,   // Minimum time loader is shown
  hardTimeout: 5000,  // Absolute maximum — safety net
  stageDuration: 550, // Each text stage lasts ~550ms (5 stages × 550ms ≈ 2.75s)
} as const;

// Technology nodes for the Engineering Network
// Position is defined as angle (degrees) and radius fraction
// Angles are deliberately NOT evenly spaced — feels organic
export interface TechNode {
  id: string;
  label: string;
  iconLib: "fa" | "si";
  iconName: string;
  angle: number;   // degrees, 0 = top, clockwise
  radiusFactor: number; // multiplier of base radius (0.8–1.0 variation)
}

export const TECH_NODES: TechNode[] = [
  { id: "react",      label: "React",       iconLib: "fa", iconName: "FaReact",        angle: 12,  radiusFactor: 0.95 },
  { id: "nextjs",     label: "Next.js",     iconLib: "si", iconName: "SiNextdotjs",    angle: 65,  radiusFactor: 1.0  },
  { id: "nodejs",     label: "Node.js",     iconLib: "si", iconName: "SiNodedotjs",    angle: 118, radiusFactor: 0.92 },
  { id: "go",         label: "Go",          iconLib: "si", iconName: "SiGo",           angle: 162, radiusFactor: 1.0  },
  { id: "docker",     label: "Docker",      iconLib: "si", iconName: "SiDocker",       angle: 207, radiusFactor: 0.95 },
  { id: "aws",        label: "AWS",         iconLib: "si", iconName: "SiAmazonaws",    angle: 253, radiusFactor: 0.9  },
  { id: "mongodb",    label: "MongoDB",     iconLib: "si", iconName: "SiMongodb",      angle: 299, radiusFactor: 1.0  },
  { id: "redis",      label: "Redis",       iconLib: "si", iconName: "SiRedis",        angle: 337, radiusFactor: 0.93 },
  { id: "postgres",   label: "PostgreSQL",  iconLib: "si", iconName: "SiPostgresql",   angle: 143, radiusFactor: 0.97 },
  { id: "webrtc",     label: "WebRTC",      iconLib: "si", iconName: "SiWebrtc",       angle: 278, radiusFactor: 0.98 },
];

// Particle config
export const PARTICLE_CONFIG = {
  mobile: 12,
  tablet: 18,
  desktop: 24,
} as const;
