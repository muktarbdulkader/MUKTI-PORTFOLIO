import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { Icon } from "@/components/ui/icon";
import { formatDate } from "@/lib/utils";
import type { Experience } from "@/lib/queries";

const KIND_LABEL: Record<string, string> = {
  EDUCATION: "Education",
  INTERNSHIP: "Internship",
  EMPLOYMENT: "Employment",
  CERTIFICATION: "Certification",
  TRAINING: "Training",
  ACADEMIC_PROJECT: "Academic project",
  ACHIEVEMENT: "Achievement",
};

const KIND_ICON: Record<string, string> = {
  EDUCATION: "GraduationCap",
  INTERNSHIP: "Briefcase",
  EMPLOYMENT: "Briefcase",
  CERTIFICATION: "Award",
  TRAINING: "GraduationCap",
  ACADEMIC_PROJECT: "FolderKanban",
  ACHIEVEMENT: "Star",
};

export function ExperienceSection({ items }: { items: Experience[] }) {
  if (items.length === 0) return null;
  return (
    <section id="experience" className="scroll-mt-20 border-t border-border-subtle/40 bg-surface/20">
      <Container className="py-20">
        <SectionHeading
          eyebrow="Experience & Education"
          title="Background"
          description="Education, experience, and achievements."
        />
        <div className="mt-10 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-2xl border border-border-subtle bg-surface/50 p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
                <Icon name={KIND_ICON[item.kind] ?? "Briefcase"} className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h3 className="text-base font-semibold text-content">{item.title}</h3>
                  <span className="text-xs text-faint">
                    {formatDate(item.startDate)}
                    {item.current ? " — Present" : item.endDate ? ` — ${formatDate(item.endDate)}` : ""}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-2 text-sm text-accent">
                  <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs">
                    {KIND_LABEL[item.kind] ?? item.kind}
                  </span>
                  {item.organization ? (
                    <span className="text-muted">{item.organization}</span>
                  ) : null}
                </div>
                {item.description ? (
                  <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
