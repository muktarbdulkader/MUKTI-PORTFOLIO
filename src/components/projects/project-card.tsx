"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Spotlight } from "@/components/ui/motion";
import { useI18n } from "@/lib/i18n/provider";
import { cn, initials } from "@/lib/utils";
import type { ProjectWithThumbnail } from "@/lib/queries";

/* Distinct gradient palettes per project slot */
const PROJECT_GRADIENTS = [
  "from-accent/20 via-elevated to-blue/15",
  "from-blue/20 via-elevated to-violet/15",
  "from-violet/20 via-elevated to-accent/15",
  "from-emerald/15 via-elevated to-blue/15",
  "from-accent/15 via-elevated to-violet/20",
  "from-blue/15 via-elevated to-emerald/15",
];

export function ProjectCard({
  project,
  index = 0,
}: {
  project: ProjectWithThumbnail;
  index?: number;
}) {
  const { t } = useI18n();
  const gradient = PROJECT_GRADIENTS[index % PROJECT_GRADIENTS.length];

  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="h-full"
      >
        <Spotlight className="h-full">
          <Card className="card-lift h-full overflow-hidden border-border bg-surface/40 backdrop-blur-sm transition-all duration-300 hover:border-accent/40">
          {/* Thumbnail */}
          <div className="relative aspect-[16/10] overflow-hidden bg-elevated">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail.url}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
              />
            ) : (
              <div
                className={cn(
                  "flex h-full w-full items-center justify-center bg-gradient-to-br",
                  gradient
                )}
              >
                {/* Abstract decorative SVG for no-image cards */}
                <div className="relative flex h-full w-full items-center justify-center">
                  <svg
                    className="absolute inset-0 h-full w-full opacity-20"
                    viewBox="0 0 400 250"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <defs>
                      <radialGradient id={`rg-${project.id}`} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgb(var(--accent-rgb)/0.4)" />
                        <stop offset="100%" stopColor="transparent" />
                      </radialGradient>
                    </defs>
                    <circle cx="200" cy="125" r="80" fill={`url(#rg-${project.id})`} />
                    <circle cx="200" cy="125" r="100" fill="none" stroke="rgb(var(--accent-rgb)/0.15)" strokeWidth="1" />
                    <circle cx="200" cy="125" r="130" fill="none" stroke="rgb(var(--accent-2-rgb)/0.10)" strokeWidth="1" />
                    <line x1="60" y1="60" x2="340" y2="190" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    <line x1="60" y1="190" x2="340" y2="60" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  </svg>
                  <span className="relative z-10 text-4xl font-extrabold text-gradient opacity-60">
                    {initials(project.title)}
                  </span>
                </div>
              </div>
            )}

            {/* Gradient overlay at bottom */}
            <div
              className="absolute inset-x-0 bottom-0 h-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "linear-gradient(to top, rgba(8,9,13,0.7), transparent)" }}
              aria-hidden="true"
            />

            {project.isFeatured && (
              <span className="absolute left-3 top-3">
                <Badge tone="accent">
                  <Icon name="Star" className="mr-1 h-3 w-3" /> {t("projects.featured")}
                </Badge>
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-3 p-5">
            {project.category && (
              <span className="text-xs font-semibold uppercase tracking-wide text-accent/80">
                {project.category}
              </span>
            )}
            <h3 className="text-lg font-bold text-content transition-colors duration-200 group-hover:text-accent">
              {project.title}
            </h3>
            {project.shortDescription && (
              <p className="text-sm leading-6 text-muted line-clamp-2">
                {project.shortDescription}
              </p>
            )}

            {project.technologies?.length ? (
              <div className="mt-1 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border bg-elevated px-2 py-0.5 text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="rounded-md border border-border bg-elevated px-2 py-0.5 text-xs text-faint">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            ) : null}

            <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-accent/80 transition-colors group-hover:text-accent">
              {t("projects.viewCaseStudy")}
              <Icon
                name="ArrowRight"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </div>
          </Card>
        </Spotlight>
      </motion.div>
    </Link>
  );
}
