import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import type { Service } from "@/lib/queries";

export function Services({ services }: { services: Service[] }) {
  if (services.length === 0) return null;
  return (
    <section id="services" className="scroll-mt-20 border-t border-border-subtle/40">
      <Container className="py-20">
        <SectionHeading
          eyebrow="Services"
          title="How I can help"
          description="Freelance development services, tailored to your project."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card key={s.id} className="p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/12 text-accent">
                <Icon name={s.icon} className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-content">{s.title}</h3>
              {s.description ? (
                <p className="mt-2 text-sm leading-6 text-muted">{s.description}</p>
              ) : null}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ServicesEmpty({ message }: { message: string }) {
  return (
    <section className="border-t border-border-subtle/40">
      <Container className="py-20">
        <EmptyState icon="Wrench" title="Services coming soon" description={message} />
      </Container>
    </section>
  );
}
