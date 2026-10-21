import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { Icon } from "@/components/ui/icon";
import type { Skill } from "@/lib/queries";

export function Skills({ skills }: { skills: Skill[] }) {
  const byCategory = new Map<string, Skill[]>();
  for (const s of skills) {
    const list = byCategory.get(s.category) ?? [];
    list.push(s);
    byCategory.set(s.category, list);
  }
  const groups = Array.from(byCategory.entries());

  return (
    <section id="skills" className="scroll-mt-20 border-t border-border-subtle/40 bg-surface/20">
      <Container className="py-20">
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I work with"
          description="A focused toolkit across the stack, from interfaces to data."
        />
        {groups.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              icon="Wrench"
              title="Skills coming soon"
              description="Skills are managed from the admin dashboard and appear here once published."
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map(([category, items]) => (
              <div
                key={category}
                className="rounded-2xl border border-border-subtle bg-surface/60 p-5"
              >
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
                  {category}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <li
                      key={s.id}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-elevated px-3 py-1.5 text-sm text-content"
                    >
                      <Icon name={s.icon} className="h-4 w-4 text-accent" />
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
