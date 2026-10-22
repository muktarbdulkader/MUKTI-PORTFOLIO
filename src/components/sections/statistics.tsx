"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { Icon } from "@/components/ui/icon";
import { useInView } from "@/lib/hooks";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function parseStatValue(value: string): { targetValue: number; suffix: string; isInfinite: boolean } {
  const trimmed = value.trim();
  const lower = trimmed.toLowerCase();
  
  // Check for infinity symbols or words
  if (lower === "∞" || lower === "infinity" || lower === "infinite" || trimmed.includes("∞")) {
    return { targetValue: 0, suffix: "∞", isInfinite: true };
  }
  
  // Extract numeric part and suffix
  const numericMatch = trimmed.match(/^(\d+(?:[.,]\d+)?)/);
  const targetValue = numericMatch ? parseFloat(numericMatch[1].replace(",", ".")) : 0;
  const suffix = trimmed.slice(numericMatch ? numericMatch[0].length : 0);
  
  return { targetValue, suffix, isInfinite: false };
}

function StatCard({ stat, inView }: { stat: any; inView: boolean }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const { targetValue, suffix, isInfinite } = parseStatValue(stat.value);

  useEffect(() => {
    if (!inView) {
      setAnimatedValue(0);
      return;
    }

    // For infinite values, just show the symbol immediately
    if (isInfinite) {
      setAnimatedValue(0); // We'll show the symbol directly in render
      return;
    }

    let cancelled = false;
    const startTime = performance.now();
    const duration = 1800;

    const updateCount = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(targetValue * eased);

      if (!cancelled) {
        setAnimatedValue(current);
      }

      if (progress < 1 && !cancelled) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);

    return () => {
      cancelled = true;
    };
  }, [inView, targetValue, isInfinite]);

  return (
    <div
      className="group relative rounded-2xl bg-surface/80 border border-border-subtle p-6 backdrop-blur-sm transition-all duration-500 hover:bg-surface hover:border-accent/30 hover:shadow-[0_24px_48px_rgba(0,0,0,0.35)] hover:-translate-y-1"
    >
      {/* Subtle top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent-color), transparent)" }}
        aria-hidden="true"
      />

      {/* Icon container with subtle glow */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-surface/50 transition-all duration-300 group-hover:bg-accent/10 group-hover:scale-105 group-hover:shadow-[0_8px_24px_rgba(139,92,246,0.2)]">
        <Icon name={stat.icon} className="h-7 w-7 text-accent" />
      </div>

      {/* Large animated number or infinity symbol */}
      <div className="mb-3 font-mono">
        {isInfinite ? (
          <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-accent leading-none">
            {suffix}
          </span>
        ) : (
          <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-content leading-none">
            {animatedValue}{suffix}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="mb-2 text-base font-semibold text-content">{stat.title}</h3>

      {/* Description */}
      {stat.description && (
        <p className="text-sm leading-relaxed text-muted">{stat.description}</p>
      )}

      {/* Bottom progress indicator */}
      <div
        className="absolute bottom-0 left-0 h-px bg-accent/20 transition-all duration-500 group-hover:bg-accent"
        style={{ width: inView ? "100%" : "0%" }}
        aria-hidden="true"
      />
    </div>
  );
}

export function Statistics({ stats }: { stats: any[] }) {
  const [ref, inView] = useInView<HTMLDivElement>({ offset: "100px", triggerOnce: true });

  if (stats.length === 0) {
    return (
      <section className="section-divider">
        <Container className="py-24">
          <EmptyState icon="TrendingUp" title="No statistics yet." description="" />
        </Container>
      </section>
    );
  }

  return (
    <section
      id="statistics"
      className="section-divider relative scroll-mt-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--color-surface)/15 0%, transparent 100%)" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[700px] -translate-x-1/2 rounded-full opacity-15 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgb(var(--accent-rgb)) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <Container className="relative py-24">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              Key Metrics
            </span>
            <p className="mt-3 max-w-lg mx-auto text-base text-muted">
              A snapshot of my journey so far — projects shipped, skills mastered, and milestones reached.
            </p>
          </div>
        </FadeUp>

        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.id} stat={s} inView={inView} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FadeUp({ children }: { children: React.ReactNode }) {
  const [ref, inView] = useInView<HTMLDivElement>({ offset: "100px", triggerOnce: true });
  return <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>{children}</div>;
}

export function StatisticsEmpty({ message }: { message: string }) {
  return (
    <section className="section-divider">
      <Container className="py-24">
        <EmptyState icon="TrendingUp" title={message} description="" />
      </Container>
    </section>
  );
}