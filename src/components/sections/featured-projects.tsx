import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { ProjectCard } from "@/components/projects/project-card";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { ProjectWithThumbnail } from "@/lib/queries";

export function FeaturedProjects({ projects }: { projects: ProjectWithThumbnail[] }) {
  const list = projects.slice(0, 6);
  return (
    <section id="projects" className="scroll-mt-20 border-t border-border-subtle/40">
      <Container className="py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Selected work"
            title="Featured projects"
            description="A few products I've designed and built, with case studies."
          />
          <Link href="/projects" className={buttonVariants("outline", "md")}>
            View all projects
            <Icon name="ArrowRight" className="h-4 w-4" />
          </Link>
        </div>

        {list.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              icon="FolderKanban"
              title="No published projects yet"
              description="Published projects appear here. Manage them from the admin dashboard."
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
