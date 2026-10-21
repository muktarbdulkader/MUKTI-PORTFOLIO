import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { cn, initials } from "@/lib/utils";
import type { ProjectWithThumbnail } from "@/lib/queries";

export function ProjectCard({ project }: { project: ProjectWithThumbnail }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden transition-colors duration-200 hover:border-accent/40">
        <div className="relative aspect-[16/10] overflow-hidden bg-elevated">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail.url}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/10 via-elevated to-violet/10">
              <span className="text-2xl font-semibold text-muted">
                {initials(project.title)}
              </span>
            </div>
          )}
          {project.isFeatured ? (
            <span className="absolute left-3 top-3">
              <Badge tone="accent">
                <Icon name="Star" className="mr-1 h-3 w-3" /> Featured
              </Badge>
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 p-5">
          {project.category ? (
            <span className="text-xs font-medium uppercase tracking-wide text-accent">
              {project.category}
            </span>
          ) : null}
          <h3 className="text-lg font-semibold text-content transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          {project.shortDescription ? (
            <p className="text-sm leading-6 text-muted line-clamp-2">
              {project.shortDescription}
            </p>
          ) : null}
          {project.technologies?.length ? (
            <div className="mt-1 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className={cn(
                    "rounded-md border border-border-subtle bg-elevated px-2 py-0.5 text-xs text-muted"
                  )}
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
          <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-content">
            View case study
            <Icon name="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
