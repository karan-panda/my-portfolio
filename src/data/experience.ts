import type { AcademicProject, ExperienceItem, Recognition } from "@/types/content";

/** Source: Career Master Profile §2, §7, §8 and the approved resume. */
export const experience: ExperienceItem[] = [
  {
    company: "ICICI Lombard General Insurance",
    title: "Associate Software Engineer",
    start: "Aug 2025",
    end: "Present",
    location: "Mumbai, India",
    summary:
      "From delivering individual features to owning journeys end to end — frontend, backend APIs, core-system integration, production GenAI tooling and DR readiness.",
    points: [
      "Primary hands-on engineer on the Angular-to-Next.js migration of motor renewal and two-wheeler journeys; Lighthouse 37 → 93 on the migrated renewal journey.",
      "Designed frontend-ready ASP.NET Core APIs that moved business rules and orchestration out of the client (~14% fewer API calls on the renewal journey).",
      "Owned frontend delivery of RYD Raksha and built a reusable KYC microfrontend used by other journeys.",
      "Built the four MCP tools, code-based routing and RBAC behind KYP, a GenAI assistant with a reported peak of 12,000+ daily active users.",
      "Contributed to live Oracle-to-PostgreSQL migration, core-system JSON (v2.0) services replacing XML, and config-driven cross-region DR on AWS ECS.",
    ],
    projects: [
      "kyp-ai-insurance-assistant",
      "ryd-raksha",
      "motor-renewal-modernization",
      "travel-itinerary-genai",
      "cross-region-disaster-recovery",
    ],
  },
  {
    company: "ICICI Lombard General Insurance",
    title: "Engineer Trainee",
    start: "Feb 2025",
    end: "Aug 2025",
    location: "Mumbai, India",
    summary: "Backend services and integrations in C# / ASP.NET Core.",
    points: [
      "Built ASP.NET Core services and webhook-driven travel-insurance workflows: Cirium flight data, database-driven claim rules, S3 document storage and partial-submission state.",
      "Contributed to the backend for commercial-vehicle one-click renewal on the core policy system, productionized in ~2 weeks.",
    ],
    projects: ["tripsecure-travel-insurance"],
  },
];

export const recognition: Recognition[] = [
  {
    kind: "education",
    title: "B.E. Information Technology",
    org: "Thakur College of Engineering and Technology",
    year: "2021–2025",
    detail: "CGPA 9.83 / 10 · Department Topper",
  },
  { kind: "award", title: "HighFlier Award", org: "ICICI Lombard", year: "2026" },
  { kind: "award", title: "Best Research Paper Award", org: "Multicon-W", year: "2024" },
  { kind: "leadership", title: "Technical Head", org: "ACM TCET", year: "College" },
];

/** Academic work — kept visually separate from professional projects. */
export const academicProjects: AcademicProject[] = [
  {
    name: "Diabetes Decoded",
    summary:
      "Final-year project using a hybrid CNN-LSTM model. The associated research paper received the Best Research Paper Award at Multicon-W 2024.",
    stack: ["CNN-LSTM", "Python", "Deep learning"],
  },
  {
    name: "VANI — Voice Assistance for Navigation & Interaction",
    summary: "Voice-driven navigation assistant with Whisper-based speech transcription.",
    stack: ["JavaScript", "Leaflet", "Flask", "Whisper"],
  },
];

export const interests = [
  "AI and emerging technology",
  "Software architecture",
  "Developer tools",
  "Robotics and electronics",
  "Building useful products",
  "Gaming and science fiction",
];
