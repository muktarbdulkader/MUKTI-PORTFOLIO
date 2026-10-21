import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { Icon } from "@/components/ui/icon";
import {
  FadeUp,
  Spotlight,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion";
import { getI18n } from "@/lib/i18n/server";
import type { Service } from "@/lib/queries";

/* Cycle through accent colours for variety — every colour follows the theme */
const CARD_ACCENTS = [
  {
    border: "border-accent/25",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    glow: "rgb(var(--accent-rgb)/0.22)",
    line: "linear-gradient(90deg, rgb(var(--accent-rgb)/0.75), transparent)",
    hoverShadow: "hover:shadow-[0_8px_40px_rgb(var(--accent-rgb)/0.18)]",
  },
  {
    border: "border-accent-2/25",
    iconBg: "bg-accent-2/10",
    iconColor: "text-accent-2",
    glow: "rgb(var(--accent-2-rgb)/0.2)",
    line: "linear-gradient(90deg, rgb(var(--accent-2-rgb)/0.7), transparent)",
    hoverShadow: "hover:shadow-[0_8px_40px_rgb(var(--accent-2-rgb)/0.14)]",
  },
  {
    border: "border-violet/25",
    iconBg: "bg-violet/10",
    iconColor: "text-violet",
    glow: "rgb(var(--accent-2-rgb)/0.18)",
    line: "linear-gradient(90deg, rgb(var(--accent-2-rgb)/0.6), transparent)",
    hoverShadow: "hover:shadow-[0_8px_40px_rgb(var(--accent-2-rgb)/0.14)]",
  },
  {
    border: "border-emerald/25",
    iconBg: "bg-emerald/10",
    iconColor: "text-emerald",
    glow: "rgb(16 185 129/0.18)",
    line: "linear-gradient(90deg, rgb(16 185 129/0.6), transparent)",
    hoverShadow: "hover:shadow-[0_8px_40px_rgb(16_185_129/0.12)]",
  },
  {
    border: "border-accent/20",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    glow: "rgb(var(--accent-rgb)/0.16)",
    line: "linear-gradient(90deg, rgb(var(--accent-rgb)/0.55), transparent)",
    hoverShadow: "hover:shadow-[0_8px_40px_rgb(var(--accent-rgb)/0.12)]",
  },
  {
    border: "border-accent-2/20",
    iconBg: "bg-accent-2/10",
    iconColor: "text-accent-2",
    glow: "rgb(var(--accent-2-rgb)/0.16)",
    line: "linear-gradient(90deg, rgb(var(--accent-2-rgb)/0.55), transparent)",
    hoverShadow: "hover:shadow-[0_8px_40px_rgb(var(--accent-2-rgb)/0.12)]",
  },
];

export async function Services({ services }: { services: Service[] }) {
  const { t } = await getI18n();
  if (services.length === 0) return null;

  return (
    <section id="services" className="section-divider relative scroll-mt-20 overflow-hidden">
      {/* Atmospheric background */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgb(var(--accent-rgb)/1) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-grid grid-mask opacity-20" aria-hidden="true" />

      <Container className="relative py-24">
        <FadeUp>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {t("services.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-content sm:text-4xl">
            {t("services.titleLead")}{" "}
            <span className="text-gradient">{t("services.titleAccent")}</span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-muted">
            {t("services.description")}
          </p>
        </FadeUp>

        <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" delay={0.1}>
          {services.map((s, i) => {
            const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
            return (
              <StaggerItem key={s.id}>
                <Spotlight className="h-full">
                  <div
                    className={`group relative h-full overflow-hidden rounded-2xl border ${accent.border} ${accent.hoverShadow} bg-surface/60 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40`}
                  >
                    {/* Corner accent */}
                    <div
                      className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-full opacity-50 blur-[2px] transition-opacity duration-300 group-hover:opacity-80"
                      style={{ background: `radial-gradient(circle at top right, ${accent.glow}, transparent 70%)` }}
                      aria-hidden="true"
                    />

                    <div
                      className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${accent.iconBg} ${accent.iconColor} transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_currentColor]`}
                    >
                      <Icon name={s.icon} className="h-6 w-6" />
                    </div>

                    <h3 className="text-base font-semibold text-content">{s.title}</h3>
                    {s.description && (
                      <p className="mt-2 text-sm leading-6 text-muted">{s.description}</p>
                    )}

                    {/* Bottom accent line */}
                    <div
                      className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full"
                      style={{ background: accent.line }}
                      aria-hidden="true"
                    />
                  </div>
                </Spotlight>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}

export async function ServicesEmpty({ message }: { message: string }) {
  const { t } = await getI18n();
  return (
    <section className="section-divider">
      <Container className="py-24">
        <EmptyState icon="Wrench" title={t("services.emptyTitle")} description={message} />
      </Container>
    </section>
  );
}
