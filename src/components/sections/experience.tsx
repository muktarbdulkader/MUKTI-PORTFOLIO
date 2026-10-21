import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { Icon } from "@/components/ui/icon";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { getI18n } from "@/lib/i18n/server";
import { LANGUAGES } from "@/lib/i18n/config";
import { formatDate } from "@/lib/utils";
import type { Experience } from "@/lib/queries";

const KIND_ICON: Record<string, string> = {
  EDUCATION:        "GraduationCap",
  INTERNSHIP:       "Briefcase",
  EMPLOYMENT:       "Briefcase",
  CERTIFICATION:    "Award",
  TRAINING:         "GraduationCap",
  ACADEMIC_PROJECT: "FolderKanban",
  ACHIEVEMENT:      "Star",
};

const KIND_COLOR: Record<string, { dot: string; badge: string; iconBg: string; iconColor: string }> = {
  EDUCATION:        { dot: "bg-blue",    badge: "bg-blue/10 text-blue/90",    iconBg: "bg-blue/10",    iconColor: "text-blue" },
  INTERNSHIP:       { dot: "bg-accent",  badge: "bg-accent/10 text-accent",   iconBg: "bg-accent/10",  iconColor: "text-accent" },
  EMPLOYMENT:       { dot: "bg-emerald", badge: "bg-emerald/10 text-emerald", iconBg: "bg-emerald/10", iconColor: "text-emerald" },
  CERTIFICATION:    { dot: "bg-violet",  badge: "bg-violet/10 text-violet",   iconBg: "bg-violet/10",  iconColor: "text-violet" },
  TRAINING:         { dot: "bg-blue",    badge: "bg-blue/10 text-blue/90",    iconBg: "bg-blue/10",    iconColor: "text-blue" },
  ACADEMIC_PROJECT: { dot: "bg-accent",  badge: "bg-accent/10 text-accent",   iconBg: "bg-accent/10",  iconColor: "text-accent" },
  ACHIEVEMENT:      { dot: "bg-violet",  badge: "bg-violet/10 text-violet",   iconBg: "bg-violet/10",  iconColor: "text-violet" },
};

function getKindStyle(kind: string) {
  return KIND_COLOR[kind] ?? { dot: "bg-accent", badge: "bg-accent/10 text-accent", iconBg: "bg-accent/10", iconColor: "text-accent" };
}

export async function ExperienceSection({ items }: { items: Experience[] }) {
  const { t, dict, locale } = await getI18n();
  const kindLabels = dict.experience.kinds as Record<string, string>;
  const dateLocale = LANGUAGES[locale].tag;
  if (items.length === 0) return null;

  return (
    <section
      id="experience"
      className="section-divider relative scroll-mt-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, transparent 0%, var(--color-surface)/15 100%)" }}
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full opacity-10 blur-[100px]"
        style={{ background: "rgb(var(--accent-2-rgb)/1)" }}
        aria-hidden="true"
      />

      <Container className="relative py-24">
        <FadeUp>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {t("experience.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-content sm:text-4xl">
            {t("experience.titleLead")}{" "}
            <span className="text-gradient">{t("experience.titleAccent")}</span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-muted">
            {t("experience.description")}
          </p>
        </FadeUp>

        {/* Timeline */}
        <StaggerContainer className="relative mt-14" delay={0.1}>
          {/* Vertical line */}
          <div
            className="pointer-events-none absolute left-5 top-0 w-px"
            style={{
              height: "100%",
              background:
                "linear-gradient(180deg, var(--color-accent) 0%, var(--color-accent-2) 50%, transparent 100%)",
              opacity: 0.3,
            }}
            aria-hidden="true"
          />
          {/* Travelling highlight */}
          <div
            className="pointer-events-none absolute left-5 top-0 h-24 w-px"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgb(var(--accent-rgb)/0.9), transparent)",
              animation: "aurora-drift 6s ease-in-out infinite",
            }}
            aria-hidden="true"
          />

          <div className="space-y-6 pl-14">
            {items.map((item) => {
              const style = getKindStyle(item.kind);
              return (
                <StaggerItem key={item.id}>
                  <div className="relative group">
                    {/* Timeline dot */}
                    <span
                      className={`absolute -left-[42px] top-5 h-3 w-3 rounded-full border-2 border-canvas ${style.dot} shadow-[0_0_8px_2px_currentColor]`}
                      aria-hidden="true"
                    >
                      <span
                        className={`absolute inset-0 rounded-full ${style.dot} opacity-60`}
                        style={{ animation: "pulse-ring 2.6s cubic-bezier(0.4,0,0.6,1) infinite" }}
                      />
                    </span>

                    <div className="glass card-lift rounded-2xl p-6 hover:border-accent/30">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.iconBg} ${style.iconColor}`}
                          >
                            <Icon
                              name={KIND_ICON[item.kind] ?? "Briefcase"}
                              className="h-5 w-5"
                            />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-content">
                              {item.title}
                            </h3>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${style.badge}`}>
                                {kindLabels[item.kind] ?? item.kind}
                              </span>
                              {item.organization && (
                                <span className="text-sm text-muted">
                                  {item.organization}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <span className="shrink-0 rounded-lg border border-border bg-elevated px-3 py-1 text-xs text-faint">
                          {formatDate(item.startDate, undefined, dateLocale)}
                          {item.current
                            ? ` — ${t("experience.present")}`
                            : item.endDate
                              ? ` — ${formatDate(item.endDate, undefined, dateLocale)}`
                              : ""}
                        </span>
                      </div>
                      {item.description && (
                        <p className="mt-4 text-sm leading-6 text-muted border-t border-border-subtle pt-3">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>
      </Container>
    </section>
  );
}
