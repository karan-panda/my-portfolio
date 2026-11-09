import type { Project } from "@/types/content";

/**
 * Professional ICICI Lombard projects.
 *
 * Sources: Career Master Profile §3, §6, §12 and the approved resume.
 * Everything here is written at a public level — no internal URLs, customer
 * data, source code or proprietary diagrams.
 *
 * Accuracy notes kept deliberately:
 *  - KYP usage is a *reported peak* of 12,000+ daily active users.
 *  - Motor Renewal metrics apply to the migrated renewal journey only.
 *  - Travel GenAI's ~65% is token/memory consumption, not latency.
 *  - RYD figures are approximate, as reported.
 *  - No RTO/RPO/uptime numbers exist for DR work, so none are shown.
 *
 * To add a case study: append an object below with a unique `slug`. The
 * home page, /work/[slug] route, sitemap and metadata pick it up
 * automatically. Leave optional fields out rather than inventing content.
 */
export const projects: Project[] = [
  {
    slug: "kyp-ai-insurance-assistant",
    index: "01",
    name: "KYP — AI-Powered Insurance Assistant",
    shortName: "KYP",
    category: "Production GenAI · RAG · MCP · AI orchestration",
    problem:
      "Customers and teams needed accurate answers about policies, workflows and products — grounded in enterprise systems, not guessed by a model.",
    summary:
      "A production GenAI assistant that retrieves policy and product context and calls enterprise capabilities through MCP tools. I built its four MCP tools, code-based routing and role-based access control.",
    role: "Built the MCP tool layer · contributed to retrieval and integration",
    stack: ["Python", "FastAPI", "MCP", "RAG", "Vertex AI", "Vertex AI Search", "Next.js", "React", "GCP"],
    highlights: [
      {
        value: "12,000+",
        to: 12000,
        suffix: "+",
        label: "Peak daily active users",
        context: "Reported peak DAU for the production assistant",
        projectSlug: "kyp-ai-insurance-assistant",
      },
      {
        value: "4",
        to: 4,
        label: "MCP tools built",
        context: "Policy lookup, workflow guidance, company profile, product RAG",
        projectSlug: "kyp-ai-insurance-assistant",
      },
    ],
    diagram: "kyp",
    featured: true,
    caseStudy: {
      overview:
        "KYP is a production AI assistant for insurance policy and customer queries. It combines retrieval-augmented generation over product information with MCP tools that expose enterprise capabilities — such as policy lookup from the core policy system — to the model in a controlled way.",
      context:
        "Insurance questions are rarely generic: the right answer depends on the product line (health, travel, motor, home), the specific policy, and the user's role. An assistant that answers from model memory alone is a liability in that setting.",
      problem:
        "Give users fast, grounded answers by retrieving the right context and calling the right enterprise capability for each query — while keeping every tool call inside defined security boundaries.",
      constraints: [
        "Answers must be grounded in enterprise data, not model memory.",
        "Tool access has to respect who is asking (role-based access).",
        "Must serve production traffic — the assistant reports a peak of 12,000+ daily active users.",
        "Confidential policy and customer data must never leak across users.",
      ],
      contribution: [
        "Built the four MCP tools behind KYP: policy lookup from the core policy system across health, travel, motor and home; step-by-step workflow guidance; company-profile answers; and RAG over product information.",
        "Implemented code-based tool routing so each query reaches the specialised tool that can answer it.",
        "Implemented role-based access control on tool calls using signed token claims.",
        "Worked on semantic retrieval and policy-aware context selection.",
        "Contributed to migrating retrieval from OpenAI Vector Stores to Google Vertex AI retrieval infrastructure.",
        "Built frontend and backend integrations, and tested services with pytest, pytest-asyncio and httpx.",
        "Checked answers against a golden-set evaluation.",
      ],
      architecture: {
        heading: "Query → route → tool → grounded response",
        body: "A user query enters a FastAPI service. Code-based routing selects one of four MCP tools. Each tool call is scoped by role-based access control from signed claims. Retrieval tools pull context from Vertex AI Search; the policy tool reads from the core policy system. The model composes a response from that retrieved context.",
        points: [
          "Interface: Next.js / React client talking to FastAPI services.",
          "Routing: deterministic, code-based selection across four specialised MCP tools.",
          "Security boundary: RBAC on every tool call via signed token claims.",
          "Retrieval: semantic search on Vertex AI Search / Discovery Engine (migrated from OpenAI Vector Stores).",
          "Generation: Vertex AI models on GCP, answering from retrieved context.",
        ],
      },
      decisions: [
        {
          choice: "Code-based tool routing",
          why: "Deterministic routing makes behaviour predictable and testable for known use cases, instead of leaving every dispatch decision to the model.",
        },
        {
          choice: "MCP as the tool contract",
          why: "Enterprise capabilities are exposed through one standard tool interface, so new capabilities can be added without rewiring the assistant.",
        },
        {
          choice: "Access control at the tool boundary",
          why: "Enforcing roles where data is fetched means a prompt cannot talk its way into data the user is not allowed to see.",
        },
        {
          choice: "Golden-set evaluation",
          why: "A fixed set of expected answers gives a repeatable check on answer quality when retrieval or prompts change.",
        },
      ],
      impact: {
        metrics: [
          {
            value: "12,000+",
            to: 12000,
            suffix: "+",
            label: "Peak daily active users",
            context: "Reported peak DAU",
          },
          {
            value: "700–1,300 ms",
            label: "Standard query time",
            context: "Measured at the API gateway for standard queries",
          },
          {
            value: "4",
            to: 4,
            label: "MCP tools",
            context: "Built and in production",
          },
        ],
        notes: ["Retrieval infrastructure migrated from OpenAI Vector Stores to Vertex AI."],
      },
    },
  },
  {
    slug: "ryd-raksha",
    index: "02",
    name: "RYD Raksha — Motor Insurance Product",
    shortName: "RYD Raksha",
    category: "Full-stack product engineering · Microfrontends · Performance",
    problem:
      "A new digital motor-insurance product had to ship a complete customer journey — and move very large reference datasets to the browser without punishing users.",
    summary:
      "Owned the entire frontend of a new motor-insurance add-on product, built a reusable KYC microfrontend for other teams, and cut large reference-data payloads with Brotli, output caching and compressed browser caching.",
    role: "Owned frontend delivery · technical guidance to the backend team",
    stack: ["Next.js", "React", "TypeScript", "Zustand", ".NET 10", "Vite", "Webpack", "Brotli", "LZ-String", "LocalStorage"],
    highlights: [
      {
        value: "17 MB → 6 MB",
        from: 17,
        to: 6,
        unit: "MB",
        label: "API payload",
        context: "Vehicle make-model & RTO reference data, Brotli + .NET output caching (approx.)",
        projectSlug: "ryd-raksha",
      },
      {
        value: "6 MB → 1.1 MB",
        from: 6,
        to: 1.1,
        unit: "MB",
        label: "Browser cache",
        context: "LZ-String compression, 1-day LocalStorage TTL (approx.)",
        projectSlug: "ryd-raksha",
      },
    ],
    diagram: "ryd",
    featured: true,
    caseStudy: {
      overview:
        "RYD Raksha is a digital motor-insurance add-on product for customers who already hold a valid third-party motor policy — including policies from other insurers. Customers choose a plan and unlock additional benefits and value-added services.",
      context:
        "The product needed a full customer-facing journey built quickly, with a backend team that included interns and recent graduates. Several other journeys also needed the same KYC step.",
      problem:
        "Deliver an interactive purchase journey end to end, avoid every team rebuilding KYC, and make large reference datasets (vehicle make-model and RTO data) cheap to download and cheap to keep in the browser.",
      constraints: [
        "Tight delivery timeline.",
        "Reference datasets in the tens of megabytes.",
        "Browser storage quotas limit how much can be cached locally.",
        "The KYC widget had to drop into applications owned by other teams.",
      ],
      contribution: [
        "Owned the complete frontend flow in Next.js, TypeScript and Zustand.",
        "Guided and supported backend implementation with a team of interns and recent graduates (technical guidance, not formal management).",
        "Built a reusable KYC microfrontend distributed as a script + CSS bundle (Vite/Webpack) so other applications can embed a common KYC widget; it is used in the motor renewal and post-payment buying journeys.",
        "Implemented Brotli compression and .NET output caching held in ECS memory for large, repeated reference datasets.",
        "Implemented one-day LocalStorage caching with LZ-String compression on the client.",
      ],
      architecture: {
        heading: "Compress on the wire, compress at rest",
        body: "Reference data is served once from .NET output cache (in ECS memory) and Brotli-compressed on the wire. On the client, the decoded data is re-compressed with LZ-String and stored in LocalStorage for one day, so repeat visits skip the network entirely.",
        points: [
          "Server: .NET 10 APIs with output caching for repeated datasets.",
          "Transport: Brotli compression — ~17 MB to ~6 MB.",
          "Client: LZ-String-compressed LocalStorage cache — ~6 MB to ~1.1 MB, 1-day TTL.",
          "KYC microfrontend: Vite/Webpack build shipped as script + CSS, consumed by other journeys.",
          "Live in production on the core policy system and PostgreSQL (migrated from Oracle).",
        ],
      },
      decisions: [
        {
          choice: "Script + CSS microfrontend instead of a shared npm package",
          why: "Consuming teams embed the widget without adopting the same framework version or build pipeline.",
        },
        {
          choice: "LZ-String before LocalStorage",
          why: "Browser storage quotas are small; compressing the cached copy keeps a ~6 MB dataset at ~1.1 MB so it fits.",
        },
        {
          choice: "One-day TTL",
          why: "Reference data changes rarely; a day balances freshness against repeat downloads.",
        },
      ],
      impact: {
        metrics: [
          {
            value: "~65%",
            to: 65,
            prefix: "~",
            suffix: "%",
            label: "Smaller API payload",
            context: "~17 MB → ~6 MB with Brotli",
          },
          {
            value: "~82%",
            to: 82,
            prefix: "~",
            suffix: "%",
            label: "Smaller browser cache",
            context: "~6 MB → ~1.1 MB with LZ-String",
          },
          {
            value: "1 day",
            label: "Client cache TTL",
            context: "LocalStorage",
          },
        ],
        notes: ["The KYC microfrontend is reused in the motor renewal and post-payment buying journeys."],
      },
    },
  },
  {
    slug: "motor-renewal-modernization",
    index: "03",
    name: "Motor Renewal Modernization",
    shortName: "Motor Renewal",
    category: "Enterprise modernization · Next.js · .NET · Performance",
    problem:
      "Legacy Angular renewal journeys carried business logic in the browser and orchestrated many services client-side — slow to load and hard to change.",
    summary:
      "Primary hands-on engineer migrating motor renewal and two-wheeler journeys from Angular to Next.js, and moving business rules into .NET services that return frontend-ready data.",
    role: "Primary hands-on engineer · guided interns",
    stack: ["Angular", "Next.js", "React", "TypeScript", ".NET", "ASP.NET Core", "EF Core", "PostgreSQL", "Oracle"],
    highlights: [
      {
        value: "37 → 93",
        from: 37,
        to: 93,
        label: "Lighthouse score",
        context: "On the migrated renewal journey",
        projectSlug: "motor-renewal-modernization",
      },
      {
        value: "~27%",
        to: 27,
        prefix: "~",
        suffix: "%",
        label: "Faster page load",
        context: "On the migrated renewal journey",
        projectSlug: "motor-renewal-modernization",
      },
    ],
    diagram: "renewal",
    featured: true,
    caseStudy: {
      overview:
        "A modernization of legacy motor-insurance renewal journeys and their supporting services: Angular pages rebuilt in Next.js, and frontend-heavy business logic moved into backend services.",
      context:
        "The legacy journeys asked the browser to call several services just to work out simple flags and statuses, and the core system exchanged XML that had to be converted before reaching customers.",
      problem:
        "Make the renewal journey faster and simpler to evolve by modernizing the frontend and giving it APIs shaped for what the screen actually needs.",
      constraints: [
        "A legacy enterprise codebase with live customer traffic.",
        "Existing integrations with the core policy system and payment gateway.",
        "Work delivered by a small team — me with a few interns.",
      ],
      contribution: [
        "Primary hands-on engineer on the Angular-to-Next.js migration of motor renewal and two-wheeler journeys, guiding interns.",
        "Designed frontend-ready ASP.NET Core APIs that move business rules and multi-service orchestration from the client into the backend.",
        "Integrated new flows directly with the core policy system, removing intermediary service hops.",
        "Contributed to replacing XML core integration with the core system's JSON (v2.0) services.",
        "Contributed to the Oracle-to-PostgreSQL migration (EF Core) — live for RYD Raksha and the new two-wheeler flow.",
        "Contributed to the renewal payment gateway integration.",
      ],
      architecture: {
        heading: "Move orchestration from the browser to the backend",
        body: "Before: the Angular client called several services and computed flags itself. After: the Next.js client calls .NET endpoints that already return what the screen needs, and those services talk to the core policy system directly.",
        points: [
          "Frontend: Next.js (SSR/SSG where useful) replacing Angular pages.",
          "Backend-for-frontend style ASP.NET Core APIs returning frontend-ready responses.",
          "Direct core-system integration instead of intermediary hops.",
          "Core-system JSON (v2.0) services replacing XML.",
        ],
      },
      decisions: [
        {
          choice: "Frontend-ready API responses",
          why: "One call that returns the decision is faster and safer than the browser stitching together several services to compute it.",
        },
        {
          choice: "Business rules in the backend",
          why: "Rules live in one place, are testable server-side, and no longer ship to every browser.",
        },
      ],
      impact: {
        metrics: [
          {
            value: "37 → 93",
            from: 37,
            to: 93,
            label: "Lighthouse score",
            context: "Migrated renewal journey",
          },
          {
            value: "~27%",
            to: 27,
            prefix: "~",
            suffix: "%",
            label: "Faster page load",
            context: "Migrated renewal journey",
          },
          {
            value: "~14%",
            to: 14,
            prefix: "~",
            suffix: "%",
            label: "Fewer API calls",
            context: "Renewal journey, after moving orchestration to the backend",
          },
        ],
        notes: ["Metrics apply to the specific migrated renewal journey, not every flow."],
      },
    },
  },
  {
    slug: "travel-itinerary-genai",
    index: "04",
    name: "Travel Itinerary GenAI Sales Accelerator",
    shortName: "Travel GenAI",
    category: "Generative AI · Streaming · Personalization",
    problem:
      "Turn a traveller's intent into a personalized itinerary — and connect each activity to the travel-insurance benefits that matter for it.",
    summary:
      "A GenAI workflow that generates personalized itineraries, maps activities to relevant insurance benefits, enriches them with Google Maps data and streams results progressively over NDJSON.",
    role: "Built the generation workflow and streaming",
    stack: ["Python", "FastAPI", "LLM", "Semantic retrieval", "Google Maps", "NDJSON streaming", "Next.js"],
    highlights: [
      {
        value: "~65%",
        to: 65,
        prefix: "~",
        suffix: "%",
        label: "Less token/memory use",
        context: "Through context/data optimization — not a latency figure",
        projectSlug: "travel-itinerary-genai",
      },
    ],
    diagram: "travel",
    featured: true,
    caseStudy: {
      overview:
        "A sales-accelerator experience that generates personalized travel itineraries and links itinerary activities to relevant travel-insurance coverage and add-ons.",
      context:
        "Long-form generation is slow to arrive in full, and sending a model everything you know is expensive. Both hurt an interactive sales experience.",
      problem:
        "Generate useful, structured itineraries with less context per request, and show results as they are produced instead of after a long wait.",
      contribution: [
        "Built a GenAI workflow that generates personalized travel itineraries.",
        "Worked on activity generation and mapping itinerary activities to relevant insurance benefits and add-ons.",
        "Used retrieval and context selection to send only relevant information to generation.",
        "Integrated location and geospatial information with Google Maps.",
        "Built NDJSON streaming so the frontend renders content progressively.",
        "Worked on structuring and validating generated output, workflow states and fallback handling.",
      ],
      architecture: {
        heading: "Select context → generate → validate → stream",
        body: "User intent drives semantic selection of only the relevant context. Generation produces structured itinerary items, which are validated and streamed to the client one NDJSON line at a time, so the itinerary builds on screen as it is produced.",
        points: [
          "FastAPI service orchestrating the generation workflow.",
          "Semantic retrieval / context selection to keep prompts small.",
          "Structured output with validation and fallbacks.",
          "Google Maps for location data.",
          "NDJSON streaming to a Next.js client for progressive rendering.",
        ],
      },
      decisions: [
        {
          choice: "NDJSON over waiting for a full response",
          why: "Each line is a complete JSON object the client can render immediately, which improves perceived responsiveness.",
        },
        {
          choice: "Context selection before generation",
          why: "Sending less, more relevant context reduced token/memory consumption by roughly 65%.",
        },
      ],
      impact: {
        metrics: [
          {
            value: "~65%",
            to: 65,
            prefix: "~",
            suffix: "%",
            label: "Less token/memory use",
            context: "From context/data optimization",
          },
        ],
        notes: [
          "Streaming improved perceived responsiveness through progressive rendering.",
          "No conversion or sales-lift figure is claimed.",
        ],
      },
    },
  },
  {
    slug: "tripsecure-travel-insurance",
    index: "05",
    name: "TripSecure+ / Voyager Travel Insurance",
    shortName: "TripSecure+",
    category: "Backend engineering · Event-driven workflows · Integrations",
    problem:
      "Flight-disruption claims depend on external flight data, customer documents and multi-step forms that users don't finish in one sitting.",
    summary:
      "ASP.NET Core services and webhook-driven workflows for travel insurance: Cirium flight data for delay and cancellation payouts, database-driven claim rules, S3 document storage and partial-submission state.",
    role: "Built backend services and integrations (Engineer Trainee)",
    stack: [".NET", "ASP.NET Core", "AWS S3", "Cirium APIs", "REST APIs", "Webhooks"],
    highlights: [],
    diagram: "tripsecure",
    featured: true,
    caseStudy: {
      overview:
        "Backend services for travel-insurance workflows, including flight-delay and cancellation claim payouts driven by external flight data.",
      context:
        "Claims for flight disruption need trustworthy flight status, supporting documents, and a process that tolerates users leaving and coming back.",
      problem:
        "Connect flight data, documents and claim rules into a workflow that can react to external events and resume partially completed submissions.",
      contribution: [
        "Built ASP.NET Core services and webhook-driven workflows for travel insurance.",
        "Integrated Cirium flight data for delay and cancellation claim payouts.",
        "Worked with configurable, database-driven claim rules.",
        "Used AWS S3 for document storage.",
        "Worked on partial-submission and state-persistence workflows.",
      ],
      architecture: {
        heading: "Flight events in, claim decisions out",
        body: "Flight data from Cirium and webhook events feed ASP.NET Core services. Claim rules are read from the database rather than hard-coded, documents are stored in S3, and partially completed submissions persist their state so users can resume.",
        points: [
          "Inbound: Cirium flight data and webhook events.",
          "Processing: ASP.NET Core services applying database-driven claim rules.",
          "Storage: S3 for documents; persisted state for partial submissions.",
        ],
      },
      impact: {
        metrics: [],
        notes: ["No numeric outcome is recorded for this work, so none is shown."],
      },
    },
  },
  {
    slug: "cross-region-disaster-recovery",
    index: "06",
    name: "Cross-Region Disaster Recovery & Reliability",
    shortName: "Cross-Region DR",
    category: "Cloud infrastructure · AWS ECS · Resilience",
    problem:
      "If a region fails, services must come back elsewhere — without someone writing code during the incident.",
    summary:
      "Cross-region AWS ECS disaster-recovery readiness, with configuration-managed endpoint switching that repoints domains during DR, plus service health checks and monitoring.",
    role: "Contributor",
    stack: ["AWS ECS", "Docker", "Health checks", "Monitoring", "Configuration as code"],
    highlights: [],
    diagram: "dr",
    featured: true,
    caseStudy: {
      overview:
        "Disaster-recovery and reliability work for services running on AWS ECS across regions.",
      context:
        "Failover that depends on manual changes under pressure is slow and error-prone.",
      problem:
        "Make recovery a configuration change rather than a code change, and know whether services are healthy before and after a switch.",
      contribution: [
        "Worked on cross-region ECS disaster recovery and deployment readiness.",
        "Contributed to configuration-driven DR endpoint switching that automatically repoints domain-level endpoints during disaster recovery — no extra code written at failover time. Live in production for RYD Raksha and two-wheeler.",
        "Contributed to service health checks and health monitoring.",
        "Supported fault-tolerant deployment and production troubleshooting.",
      ],
      architecture: {
        heading: "Two regions, one switch",
        body: "Services run on ECS in a primary region with a recovery region ready. Endpoint configuration lives in code; during DR, domain-level endpoints are repointed to the recovery region by configuration, and health checks confirm service state.",
        points: [
          "Containerized services on AWS ECS (Docker).",
          "Primary and recovery regions.",
          "Configuration-managed endpoint switching.",
          "Health checks and monitoring around the switch.",
        ],
      },
      impact: {
        metrics: [],
        notes: ["No RTO, RPO or availability figures have been measured for publication, so none are claimed."],
      },
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
