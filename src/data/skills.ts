import type { Metric, SkillCluster } from "@/types/content";

/**
 * Source: Career Master Profile §5 and the approved resume.
 * No proficiency bars or percentages — each cluster points to real evidence.
 */
export const skills: SkillCluster[] = [
  {
    id: "backend",
    title: "Backend Engineering",
    blurb: "APIs shaped for the screen, integrations that survive real traffic.",
    items: ["C#", ".NET / ASP.NET Core", "Entity Framework Core", "Python", "FastAPI", "REST API design", "Microservices", "Webhooks", "Async processing", "Third-party integration"],
    evidence: "Frontend-ready renewal APIs · TripSecure+ webhooks · KYP services",
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    blurb: "Fast, modular customer journeys and widgets other teams can reuse.",
    items: ["Next.js (SSR/SSG)", "React", "TypeScript", "JavaScript", "Angular", "Zustand", "Microfrontends", "Vite", "Webpack"],
    evidence: "Angular → Next.js migration · RYD Raksha · KYC microfrontend",
  },
  {
    id: "ai",
    title: "AI / GenAI Engineering",
    blurb: "Grounded, tool-using AI with access control and evaluation.",
    items: ["MCP", "RAG", "Vertex AI", "Vertex AI Search", "Semantic retrieval", "Embeddings", "Tool routing", "Golden-set evaluation", "NDJSON streaming"],
    evidence: "KYP assistant · Travel itinerary GenAI",
  },
  {
    id: "cloud",
    title: "Cloud & Infrastructure",
    blurb: "Containerized services that can move regions by configuration.",
    items: ["AWS ECS", "AWS S3", "GCP", "Docker", "Health checks", "Cross-region DR", "CI/CD"],
    evidence: "Config-driven DR endpoint switching · ECS output caching",
  },
  {
    id: "data",
    title: "Data & Performance",
    blurb: "Fewer bytes, fewer calls, measured with real tools.",
    items: ["PostgreSQL", "Oracle", "SQL", "Output caching", "Brotli", "LZ-String", "LocalStorage", "Lighthouse"],
    evidence: "17 → 6 MB payload · 6 → 1.1 MB cache · Lighthouse 37 → 93",
  },
  {
    id: "quality",
    title: "Testing & Tooling",
    blurb: "Tested services and reviewed AI-assisted code.",
    items: ["pytest", "pytest-asyncio", "httpx", "MSW", "Postman", "Requestly", "Git", "GitHub Copilot"],
    evidence: "KYP service tests · API mocking",
  },
];

/** Impact register — every value is tied to a project and a scope. */
export const impactMetrics: Metric[] = [
  { value: "12,000+", to: 12000, suffix: "+", label: "Peak daily active users", context: "KYP AI assistant · reported peak", projectSlug: "kyp-ai-insurance-assistant" },
  { value: "37 → 93", from: 37, to: 93, label: "Lighthouse score", context: "Motor Renewal · migrated renewal journey", projectSlug: "motor-renewal-modernization" },
  { value: "17 → 6 MB", from: 17, to: 6, unit: "MB", label: "API payload", context: "RYD Raksha · Brotli + output caching · approx.", projectSlug: "ryd-raksha" },
  { value: "6 → 1.1 MB", from: 6, to: 1.1, unit: "MB", label: "Browser cache", context: "RYD Raksha · LZ-String · approx.", projectSlug: "ryd-raksha" },
  { value: "~65%", to: 65, prefix: "~", suffix: "%", label: "Less token/memory use", context: "Travel GenAI · context optimization", projectSlug: "travel-itinerary-genai" },
  { value: "~27%", to: 27, prefix: "~", suffix: "%", label: "Faster page load", context: "Motor Renewal · migrated renewal journey", projectSlug: "motor-renewal-modernization" },
  { value: "~14%", to: 14, prefix: "~", suffix: "%", label: "Fewer API calls", context: "Motor Renewal · renewal journey", projectSlug: "motor-renewal-modernization" },
];

export const principles = [
  { n: "01", title: "Build for real users", body: "Customer journeys first; architecture serves the person on the other side of the screen." },
  { n: "02", title: "Simplify complexity", body: "Move orchestration to where it belongs so every layer does less." },
  { n: "03", title: "Measure performance", body: "Lighthouse, payload sizes, token counts — numbers before opinions." },
  { n: "04", title: "Design for reliability", body: "Health checks, access boundaries, and recovery as configuration." },
  { n: "05", title: "Automate the repetitive", body: "Reusable widgets, tools and services instead of the same code twice." },
  { n: "06", title: "Keep learning", body: "From Angular to Next.js, OpenAI to Vertex AI — the stack changes; the habit doesn't." },
];
