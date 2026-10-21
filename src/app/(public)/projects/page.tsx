import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ProjectCard } from "@/components/projects/project-card";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { getPublishedProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse published software projects by Mukti, including web and mobile applications with case studies.",
};

async function ProjectsList() {
  const projects = await getPublishedProjects();
  if (projects.length === 0) {
    return (
      <div className="mt-12">
        <EmptyState
          icon="FolderKanban"
          title="No published projects yet"
          description="Projects will appear here once they are published from the admin dashboard."
        />
      </div>
    );
  }
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}

function ListFallback() {
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Container size="wide" className="py-16">
      <div className="flex flex-col gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-content"
        >
          <Icon name="ArrowRight" className="h-4 w-4 rotate-180" />
          Back home
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight text-content sm:text-4xl">
          Projects
        </h1>
        <p className="max-w-2xl text-muted">
          A selection of web and mobile applications I&apos;ve built. Each one links to a
          detailed case study.
        </p>
      </div>
      <Suspense fallback={<ListFallback />}>
        <ProjectsList />
      </Suspense>
    </Container>
  );
}
