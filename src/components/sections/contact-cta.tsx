import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { FadeUp } from "@/components/ui/motion";
import { getI18n } from "@/lib/i18n/server";
import { cn } from "@/lib/utils";

export async function ContactCTA() {
  const { t } = await getI18n();
  return (
    <section className="section-divider relative overflow-hidden">
      {/* Full-bleed atmospheric glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgb(var(--accent-rgb)/0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative py-24">
        <FadeUp>
          {/* Main CTA card */}
          <div className="gradient-edge relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/8 via-surface to-accent-2/8 p-10 sm:p-14">
            {/* Inner glow top-right */}
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-40 blur-3xl"
              style={{ background: "rgb(var(--accent-2-rgb)/0.2)" }}
              aria-hidden="true"
            />
            {/* Inner glow bottom-left */}
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full opacity-40 blur-3xl"
              style={{ background: "rgb(var(--accent-rgb)/0.2)" }}
              aria-hidden="true"
            />

            {/* Grid overlay */}
            <div className="pointer-events-none absolute inset-0 bg-grid grid-mask opacity-30" aria-hidden="true" />

            {/* Floating particles */}
            {[
              { top: "18%", left: "82%", size: "h-1.5 w-1.5", delay: "0s" },
              { top: "62%", left: "12%", size: "h-1 w-1", delay: "1.2s" },
              { top: "34%", left: "62%", size: "h-1 w-1", delay: "2.4s" },
            ].map((p) => (
              <span
                key={`${p.top}-${p.left}`}
                className={cn(
                  "animate-float-slow pointer-events-none absolute rounded-full bg-accent/70",
                  p.size
                )}
                style={{ top: p.top, left: p.left, animationDelay: p.delay }}
                aria-hidden="true"
              />
            ))}

            <div className="relative max-w-2xl">
              {/* Label */}
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {t("cta.eyebrow")}
              </span>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-content sm:text-4xl lg:text-5xl">
                {t("cta.titleLead")}{" "}
                <span className="text-shine">{t("cta.titleAccent")}</span>
              </h2>

              <p className="mt-4 max-w-lg text-base leading-8 text-muted">
                {t("cta.description")}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants("primary", "lg"),
                    "shadow-[0_0_30px_rgb(var(--accent-rgb)/0.35)] hover:shadow-[0_0_50px_rgb(var(--accent-rgb)/0.55)]"
                  )}
                >
                  {t("cta.discuss")}
                  <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
                <Link href="/projects" className={buttonVariants("outline", "lg")}>
                  {t("cta.seeWork")}
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
