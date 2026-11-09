/**
 * Content model for the portfolio. All copy lives in `src/data/*` and is
 * typed here so components stay presentation-only.
 *
 * Accuracy rule: every metric carries its own context string. Components must
 * render `context` alongside `value` — never a bare number.
 */

export type Link = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  shortName: string;
  monogram: string;
  role: string;
  exactTitle: string;
  employer: string;
  location: string;
  availability: string;
  headline: [string, string];
  summary: string;
  positioning: string;
  focus: string[];
  email: string;
  links: {
    linkedin: string;
    github: string;
    resume: string;
  };
  siteUrl: string;
};

export type Metric = {
  /** Display value, e.g. "37 → 93" or "12,000+" */
  value: string;
  /** Optional numeric parts for animated counters */
  from?: number;
  to?: number;
  prefix?: string;
  suffix?: string;
  unit?: string;
  label: string;
  /** Measurement scope / caveat shown under the value. Required. */
  context: string;
  projectSlug?: string;
};

export type DiagramKind = "kyp" | "ryd" | "renewal" | "travel" | "tripsecure" | "dr";

export type CaseSection = {
  heading: string;
  body?: string;
  points?: string[];
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  shortName: string;
  category: string;
  /** One-line problem statement for the card */
  problem: string;
  summary: string;
  role: string;
  period?: string;
  stack: string[];
  highlights: Metric[];
  diagram: DiagramKind;
  featured: boolean;
  caseStudy: {
    overview: string;
    context: string;
    problem: string;
    constraints?: string[];
    contribution: string[];
    architecture: CaseSection;
    decisions?: { choice: string; why: string }[];
    challenges?: string[];
    impact: { metrics: Metric[]; notes?: string[] };
    learnings?: string[];
  };
};

export type ExperienceItem = {
  company: string;
  title: string;
  start: string;
  end: string;
  location: string;
  summary: string;
  points: string[];
  projects: string[];
};

export type SkillCluster = {
  id: string;
  title: string;
  blurb: string;
  items: string[];
  evidence: string;
};

export type Recognition = {
  kind: "education" | "award" | "leadership";
  title: string;
  org: string;
  year: string;
  detail?: string;
};

export type AcademicProject = {
  name: string;
  summary: string;
  stack: string[];
  note?: string;
};
