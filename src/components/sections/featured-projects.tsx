import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { ProjectCard } from "@/components/projects/project-card";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { getI18n } from "@/lib/i18n/server";
import type { ProjectWithThumbnail } from "@/lib/queries";

export async function FeaturedProjects({
  projects,
}: {
  projects: ProjectWithThumbnail[];
}) {
  const { t } = await getI18n();
  const list = projects.slice(0, 6);

  return (
    <section id="projects" className="section-divider relative scroll-mt-20 overflow-hidden">
      {/* Glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 opacity-25 blur-[100px]"
        style={{ background: "linear-gradient(90deg, rgb(var(--accent-rgb)/1), rgb(var(--accent-2-rgb)/1))" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-grid grid-mask opacity-20" aria-hidden="true" />

      <Container className="relative py-24">
        <FadeUp>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {t("projects.eyebrow")}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-content sm:text-4xl">
                {t("projects.titleLead")}{" "}
                <span className="text-gradient">{t("projects.titleAccent")}</span>
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-muted">
                {t("projects.description")}
              </p>
            </div>
            <Link href="/projects" className={buttonVariants("outline", "md")}>
              {t("projects.viewAll")}
              <Icon name="ArrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </FadeUp>

        {list.length === 0 ? (
          <div className="mt-12">
            <EmptyState
              icon="FolderKanban"
              title={t("projects.emptyTitle")}
              description={t("projects.emptyDescription")}
            />
          </div>
        ) : (
          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" delay={0.1}>
            {list.map((p, i) => (
              <StaggerItem key={p.id}>
                <ProjectCard project={p} index={i} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </Container>
    </section>
  );
}
