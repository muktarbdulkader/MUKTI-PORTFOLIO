type AssistantProfile = {
  name?: string | null;
  title?: string | null;
  heroDescription?: string | null;
  bio?: string | null;
  interests?: string | null;
  approach?: string | null;
  learningGoals?: string | null;
  ambitions?: string | null;
  education?: string | null;
  publicEmail?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  isAvailable?: boolean;
  aboutVisible?: boolean;
};

type AssistantProject = {
  title: string;
  slug: string;
  shortDescription?: string | null;
  description?: string | null;
  category?: string | null;
  role?: string | null;
  technologies: string[];
  features: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
};

type AssistantSkill = {
  name: string;
  category: string;
  url?: string | null;
};

type AssistantExperience = {
  kind: string;
  title: string;
  organization?: string | null;
  description?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  current: boolean;
  url?: string | null;
};

type AssistantService = {
  title: string;
  description?: string | null;
  url?: string | null;
};

export type PortfolioAssistantData = {
  profile: AssistantProfile;
  projects: AssistantProject[];
  skills: AssistantSkill[];
  experience: AssistantExperience[];
  services: AssistantService[];
  contactEmail?: string | null;
};

type PortfolioAssistantContext = {
  profile: {
    name?: string;
    title?: string;
    introduction?: string;
    interests?: string;
    ambitions?: string;
    educationSummary?: string;
    contactEmail?: string;
    github?: string;
    linkedIn?: string;
  };
  projects: Array<{
    title?: string;
    portfolioPage: string;
    source?: string;
    liveDemo?: string;
  }>;
  publishedSkills: Array<{ name?: string; category?: string }>;
  publishedExperienceEducationAndCertificates: Array<{
    kind: string;
    title?: string;
    organization?: string;
    startYear?: number;
    endYear?: number | "Present";
  }>;
};

function cleanText(value: string | null | undefined, maxLength = 1000) {
  const cleaned = value?.trim().slice(0, maxLength);
  return cleaned || undefined;
}

function safeUrl(value: string | null | undefined) {
  const input = cleanText(value, 500);
  if (!input) return undefined;

  try {
    const url = new URL(input);
    if (
      (url.protocol !== "https:" && url.protocol !== "http:") ||
      url.username ||
      url.password
    ) {
      return undefined;
    }

    if (
      url.pathname === "/" &&
      !url.search &&
      !url.hash &&
      (url.hostname === "github.com" || url.hostname === "linkedin.com")
    ) {
      return undefined;
    }

    return url.toString();
  } catch {
    return undefined;
  }
}

function safeEmail(value: string | null | undefined) {
  const email = cleanText(value, 254);
  if (
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.toLowerCase().endsWith("@example.com")
  ) {
    return undefined;
  }
  return email;
}

function year(date: Date | null | undefined) {
  return date instanceof Date && Number.isFinite(date.getTime())
    ? date.getFullYear()
    : undefined;
}

export function getPortfolioQuickAnswer(
  question: string,
  data: PortfolioAssistantData
): string | undefined {
  const query = question.toLowerCase();
  const context = JSON.parse(
    buildPortfolioAssistantContext(data)
  ) as PortfolioAssistantContext;

  if (
    /\b(who is|about mukti|about muktar|tell me about (?:him|mukti|muktar|yourself)|introduce)\b/.test(
      query
    )
  ) {
    const { profile } = context;
    const details = [
      [profile.name, profile.title].filter(Boolean).join(" — "),
      profile.introduction,
      profile.educationSummary,
      profile.interests,
      profile.ambitions,
    ].filter((detail): detail is string => Boolean(detail));

    return details.length > 0
      ? `${details.join("\n\n")}\n\nMore: /#about`
      : "There is no published About information available right now.";
  }

  if (/\b(skills?|technologies|tech stack|programming languages)\b/.test(query)) {
    const skills = context.publishedSkills
      .map((skill) => skill.name)
      .filter((name): name is string => Boolean(name));
    return skills.length > 0
      ? `Published skills: ${skills.join(", ")}.\n\nMore: /#skills`
      : "There are no published skills available right now.";
  }

  if (/\b(projects?|portfolio work)\b/.test(query)) {
    return context.projects.length > 0
      ? `Published projects:\n${context.projects
          .map((project) => `• ${project.title ?? "Project"}: ${project.portfolioPage}`)
          .join("\n")}`
      : "There are no published projects available right now.";
  }

  if (/\b(education|study|studies|university|certificates?|certifications?|experience)\b/.test(query)) {
    const records = context.publishedExperienceEducationAndCertificates;
    const summary = context.profile.educationSummary;
    const entries = records.map((item) => {
      const organization = item.organization ? ` — ${item.organization}` : "";
      const dates = item.startYear
        ? ` (${item.startYear}${item.endYear ? `–${item.endYear}` : ""})`
        : "";
      return `• ${item.title ?? item.kind}${organization}${dates}`;
    });

    if (summary) entries.unshift(summary);
    return entries.length > 0
      ? `${entries.join("\n")}\n\nMore: /#experience`
      : "There is no published education or experience information available right now.";
  }

  if (/\b(contact|email|reach|github|linkedin|linked in)\b/.test(query)) {
    const { profile } = context;
    const links = [
      profile.contactEmail && `Email: ${profile.contactEmail}`,
      profile.github && `GitHub: ${profile.github}`,
      profile.linkedIn && `LinkedIn: ${profile.linkedIn}`,
      "Portfolio contact page: /contact",
    ].filter((link): link is string => Boolean(link));
    return links.join("\n");
  }

  return undefined;
}

export function buildPortfolioAssistantContext(data: PortfolioAssistantData) {
  const aboutVisible = data.profile.aboutVisible !== false;
  const profile = {
    name: cleanText(data.profile.name, 120),
    title: cleanText(data.profile.title, 180),
    introduction: aboutVisible
      ? cleanText(data.profile.bio, 1600) ??
        cleanText(data.profile.heroDescription, 1600)
      : undefined,
    interests: aboutVisible ? cleanText(data.profile.interests, 1000) : undefined,
    engineeringApproach: aboutVisible
      ? cleanText(data.profile.approach, 1000)
      : undefined,
    learningGoals: aboutVisible
      ? cleanText(data.profile.learningGoals, 1000)
      : undefined,
    ambitions: aboutVisible ? cleanText(data.profile.ambitions, 1000) : undefined,
    educationSummary: aboutVisible
      ? cleanText(data.profile.education, 1200)
      : undefined,
    openToWork: data.profile.isAvailable,
    contactEmail: safeEmail(data.contactEmail) ?? safeEmail(data.profile.publicEmail),
    github: safeUrl(data.profile.githubUrl),
    linkedIn: safeUrl(data.profile.linkedinUrl),
  };

  const projects = data.projects.slice(0, 20).map((project) => ({
    title: cleanText(project.title, 160),
    purpose: cleanText(project.shortDescription ?? project.description, 1200),
    category: cleanText(project.category, 100),
    role: cleanText(project.role, 200),
    technologies: project.technologies.slice(0, 24),
    features: project.features.slice(0, 16).map((feature) => cleanText(feature, 240)),
    portfolioPage: `/projects/${encodeURIComponent(project.slug)}`,
    source: safeUrl(project.githubUrl),
    liveDemo: safeUrl(project.liveUrl),
  }));

  const skills = data.skills.slice(0, 100).map((skill) => ({
    name: cleanText(skill.name, 120),
    category: cleanText(skill.category, 100),
    details: safeUrl(skill.url),
  }));

  const experience = data.experience.slice(0, 40).map((item) => ({
    kind: item.kind,
    title: cleanText(item.title, 180),
    organization: cleanText(item.organization, 180),
    description: cleanText(item.description, 1200),
    startYear: year(item.startDate),
    endYear: item.current ? "Present" : year(item.endDate),
    details: safeUrl(item.url),
  }));

  const services = data.services.slice(0, 20).map((service) => ({
    title: cleanText(service.title, 160),
    description: cleanText(service.description, 1000),
    details: safeUrl(service.url),
  }));

  return JSON.stringify(
    {
      profile,
      portfolioSections: {
        ...(aboutVisible ? { about: "/#about" } : {}),
        skills: "/#skills",
        projects: "/projects",
        ...(data.experience.length > 0
          ? { experienceAndEducation: "/#experience" }
          : {}),
        contact: "/contact",
      },
      projects,
      publishedSkills: skills,
      publishedExperienceEducationAndCertificates: experience,
      publishedServices: services,
    },
    null,
    2
  );
}
