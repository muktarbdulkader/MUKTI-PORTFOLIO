import { prisma } from "./db";
import { defaultProfile, defaultSettings } from "./defaults";
import type {
  Profile,
  Project,
  Service,
  SiteSettings,
  Skill,
  Experience,
  ProjectScreenshot,
  Media,
} from "@/generated/prisma/client";

const PROJECT_INCLUDE = {
  thumbnail: true,
} as const;

const FULL_PROJECT_INCLUDE = {
  thumbnail: true,
  screenshots: { orderBy: { displayOrder: "asc" }, include: { media: true } },
} as const;

// --- Site ------------------------------------------------------------------

export async function getProfile() {
  const row = await prisma.profile.findFirst({
    include: { profileImage: true, cvFile: true },
  });
  return (row ?? defaultProfile) as Profile & {
    profileImage: Media | null;
    cvFile: Media | null;
  };
}

export async function getSettings() {
  const row = await prisma.siteSettings.findFirst({ include: { socialImage: true } });
  return (row ?? defaultSettings) as SiteSettings & {
    socialImage: Media | null;
  };
}

// --- Projects (public: only PUBLISHED) -------------------------------------

export async function getPublishedProjects() {
  return prisma.project.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    include: PROJECT_INCLUDE,
  });
}

export async function getFeaturedProjects(limit = 6) {
  return prisma.project.findMany({
    where: { status: "PUBLISHED", isFeatured: true },
    orderBy: [{ displayOrder: "asc" }],
    take: limit,
    include: PROJECT_INCLUDE,
  });
}

export async function getPublishedProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: FULL_PROJECT_INCLUDE,
  });
}

export async function getRelatedProjects(slug: string, category: string | null | undefined, take = 3) {
  return prisma.project.findMany({
    where: {
      status: "PUBLISHED",
      slug: { not: slug },
      ...(category ? { category } : {}),
    },
    orderBy: [{ displayOrder: "asc" }],
    take,
    include: PROJECT_INCLUDE,
  });
}

export type ProjectWithThumbnail = Project & { thumbnail: Media | null };
export type ProjectWithDetails = Project & {
  thumbnail: Media | null;
  screenshots: (ProjectScreenshot & { media: Media })[];
};

// --- Skills / Experience / Services (public: only published) ---------------

export async function getPublishedSkills() {
  return prisma.skill.findMany({
    where: { published: true },
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
  });
}

export async function getPublishedExperience() {
  return prisma.experience.findMany({
    where: { published: true },
    orderBy: [{ displayOrder: "asc" }, { startDate: "desc" }],
  });
}

export async function getPublishedServices() {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: [{ displayOrder: "asc" }],
  });
}

export type { Profile, Project, Service, SiteSettings, Skill, Experience, Media };
