import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { Icon } from "@/components/ui/icon";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import type { Skill } from "@/lib/queries";

const CATEGORY_COLORS: Record<string, { border: string; glow: string; icon: string }> = {
  Frontend:    { border: "border-blue/20",   glow: "rgba(85,184,255,0.08)",    icon: "text-blue" },
  Backend:     { border: "border-accent/20", glow: "rgba(139,92,246,0.08)",   icon: "text-accent" },
  Mobile:      { border: "border-violet/20", glow: "rgba(167,139,250,0.08)",  icon: "text-violet" },
  Database:    { border: "border-emerald/20",glow: "rgba(16,185,129,0.08)",   icon: "text-emerald" },
  DevOps:      { border: "border-accent/15", glow: "rgba(139,92,246,0.06)",   icon: "text-accent" },
  Tools:       { border: "border-blue/15",   glow: "rgba(85,184,255,0.06)",   icon: "text-blue" },
};

function getCategoryStyle(cat: string) {
  return CATEGORY_COLORS[cat] ?? { border: "border-border", glow: "rgba(139,92,246,0.05)", icon: "text-accent" };
}

export function Skills({ skills }: { skills: Skill[] }) {
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
        style={{ background: "linear-gradient(90deg, rgba(139,92,246,1), rgba(85,184,255,1))" }}
        aria-hidden="true"
      />

      <Container className="relative py-24">
        <FadeUp>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Skills & Technologies
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-content sm:text-4xl">
            Tools I{" "}
            <span className="text-gradient">work with</span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-muted">
            A focused toolkit across the stack — from beautiful interfaces to scalable backends.
          </p>
        </FadeUp>

        {groups.length === 0 ? (
          <div className="mt-12">
            <EmptyState
              icon="Wrench"
              title="Skills coming soon"
              description="Skills are managed from the admin dashboard and appear here once published."
            />
          </div>
        ) : (
          <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" delay={0.1}>
            {groups.map(([category, items]) => {
              const style = getCategoryStyle(category);
              return (
                <StaggerItem key={category}>
                  <div
                    className={`h-full rounded-2xl border ${style.border} bg-surface/50 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}
                    style={{
                      boxShadow: `0 0 0 0 transparent`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px ${style.glow}`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 0 transparent`;
                    }}
                  >
                    <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-faint">
                      {category}
                    </h3>
                    <ul className="flex flex-wrap gap-2">
                      {items.map((s) => (
                        <li
                          key={s.id}
                          className={`inline-flex items-center gap-1.5 rounded-lg border border-border bg-elevated px-3 py-1.5 text-sm text-content transition-colors hover:border-accent/30 hover:text-accent`}
                        >
                          <Icon name={s.icon} className={`h-3.5 w-3.5 ${style.icon}`} />
                          {s.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </Container>
    </section>
  );
}
