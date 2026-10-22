import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { Icon } from "@/components/ui/icon";
import { FadeUp, Marquee, Spotlight, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { getI18n } from "@/lib/i18n/server";
import type { Skill } from "@/lib/queries";

const CATEGORY_COLORS: Record<string, { border: string; icon: string; hoverShadow: string }> = {
  Frontend:    { border: "border-blue/20",   icon: "text-blue",    hoverShadow: "hover:shadow-[0_8px_40px_rgb(var(--accent-2-rgb)/0.08)]" },
  Backend:     { border: "border-accent/20", icon: "text-accent",  hoverShadow: "hover:shadow-[0_8px_40px_rgb(var(--accent-rgb)/0.08)]" },
  Mobile:      { border: "border-violet/20", icon: "text-violet",  hoverShadow: "hover:shadow-[0_8px_40px_rgba(167,139,250,0.08)]" },
  Database:    { border: "border-emerald/20",icon: "text-emerald", hoverShadow: "hover:shadow-[0_8px_40px_rgba(16,185,129,0.08)]" },
  DevOps:      { border: "border-accent/15", icon: "text-accent",  hoverShadow: "hover:shadow-[0_8px_40px_rgb(var(--accent-rgb)/0.06)]" },
  Tools:       { border: "border-blue/15",   icon: "text-blue",    hoverShadow: "hover:shadow-[0_8px_40px_rgb(var(--accent-2-rgb)/0.06)]" },
};

function getCategoryStyle(cat: string) {
  return CATEGORY_COLORS[cat] ?? { border: "border-border", icon: "text-accent", hoverShadow: "hover:shadow-[0_8px_40px_rgb(var(--accent-rgb)/0.05)]" };
}

export async function Skills({ skills }: { skills: Skill[] }) {
  const { t, dict } = await getI18n();
  const categoryLabels = dict.skills.categories as Record<string, string>;

  const byCategory = new Map<string, Skill[]>();
  for (const s of skills) {
    const list = byCategory.get(s.category) ?? [];
    list.push(s);
    byCategory.set(s.category, list);
  }
  const groups = Array.from(byCategory.entries());

  return (
    <section
      id="skills"
      className="section-divider relative scroll-mt-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--color-surface)/20 0%, transparent 100%)" }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full opacity-20 blur-[80px]"
        style={{ background: "linear-gradient(90deg, rgb(var(--accent-rgb)/1), rgb(var(--accent-2-rgb)/1))" }}
        aria-hidden="true"
      />

      <Container className="relative py-24">
        <FadeUp>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {t("skills.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-content sm:text-4xl">
            {t("skills.titleLead")}{" "}
            <span className="text-gradient">{t("skills.titleAccent")}</span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-muted">
            {t("skills.description")}
          </p>
        </FadeUp>

        {groups.length === 0 ? (
          <div className="mt-12">
            <EmptyState
              icon="Wrench"
              title={t("skills.emptyTitle")}
              description={t("skills.emptyDescription")}
            />
          </div>
        ) : (
          <>
            {/* Infinite technology marquee */}
            <FadeUp delay={0.1}>
              <div className="mt-10">
                <Marquee>
                  {groups.flatMap(([, items]) => items).map((s) =>
                    s.url ? (
                      <a
                        key={s.id}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={s.urlLabel || s.name}
                        className="mx-2 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface/60 px-4 py-2 text-sm font-medium text-muted backdrop-blur-sm transition-colors duration-200 hover:border-accent/40 hover:text-content"
                      >
                        <Icon name={s.icon} className="h-4 w-4 text-accent" />
                        {s.name}
                        <Icon name="ExternalLink" className="h-3 w-3 text-accent" />
                      </a>
                    ) : (
                      <span
                        key={s.id}
                        className="mx-2 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface/60 px-4 py-2 text-sm font-medium text-muted backdrop-blur-sm transition-colors duration-200 hover:border-accent/40 hover:text-content"
                      >
                        <Icon name={s.icon} className="h-4 w-4 text-accent" />
                        {s.name}
                      </span>
                    )
                  )}
                </Marquee>
              </div>
            </FadeUp>

            <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" delay={0.1}>
              {groups.map(([category, items]) => {
                const style = getCategoryStyle(category);
                return (
                  <StaggerItem key={category}>
                    <Spotlight className="h-full">
                      <div
                        className={`card-lift h-full rounded-2xl border ${style.border} ${style.hoverShadow} bg-surface/50 p-6 backdrop-blur-sm`}
                      >
                        <div className="mb-5 flex items-center gap-2">
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-lg bg-current/10 ${style.icon}`}
                          >
                            <Icon name="Code2" className="h-3.5 w-3.5" />
                          </span>
                          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-faint">
                            {categoryLabels[category] ?? category}
                          </h3>
                          <span className="ml-auto rounded-md bg-elevated px-2 py-0.5 text-[11px] font-semibold text-faint">
                            {items.length}
                          </span>
                        </div>
                        <ul className="flex flex-wrap gap-2">
                          {items.map((s) =>
                            s.url ? (
                              <li key={s.id}>
                                <a
                                  href={s.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title={s.urlLabel || s.name}
                                  className={`inline-flex items-center gap-1.5 rounded-lg border border-border bg-elevated px-3 py-1.5 text-sm text-content transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent`}
                                >
                                  <Icon name={s.icon} className={`h-3.5 w-3.5 ${style.icon}`} />
                                  {s.name}
                                  <Icon name="ExternalLink" className="h-3 w-3 opacity-70" />
                                </a>
                              </li>
                            ) : (
                              <li
                                key={s.id}
                                className={`inline-flex items-center gap-1.5 rounded-lg border border-border bg-elevated px-3 py-1.5 text-sm text-content transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent`}
                              >
                                <Icon name={s.icon} className={`h-3.5 w-3.5 ${style.icon}`} />
                                {s.name}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </Spotlight>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </>
        )}
      </Container>
    </section>
  );
}
