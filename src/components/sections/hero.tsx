"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { AuroraBackdrop } from "@/components/ui/motion";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";
import type { Profile, Media } from "@/lib/queries";

const EASE = [0.16, 1, 0.3, 1] as const;

function item(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  };
}

/* ── Animated hero orb ────────────────────────────────────────── */
function HeroOrb({
  avatar,
  openToWork,
  fullStack,
}: {
  avatar?: { url: string; name: string } | null;
  openToWork: string;
  fullStack: string;
}) {
  return (
    <div className="relative mx-auto flex h-[290px] w-[290px] items-center justify-center sm:h-[380px] sm:w-[380px] lg:h-[440px] lg:w-[440px]">
      {/* Outer atmosphere */}
      <div
        className="animate-pulse-glow pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(var(--accent-rgb) / 0.22) 0%, rgb(var(--accent-2-rgb) / 0.12) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Spinning ring 1 */}
      <motion.div
        className="absolute inset-[7%] rounded-full border border-accent/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        {/* Orbiting dot */}
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_4px_rgb(var(--accent-rgb)/0.6)]" />
      </motion.div>

      {/* Spinning ring 2 (reverse, tilted) */}
      <motion.div
        className="absolute inset-[17%] rounded-full border border-accent-2/15"
        style={{ transform: "rotateX(60deg)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent-2/80 shadow-[0_0_10px_3px_rgb(var(--accent-2-rgb)/0.5)]" />
      </motion.div>

      {/* Spinning ring 3 */}
      <motion.div
        className="absolute inset-[28%] rounded-full border border-violet/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-violet/70 shadow-[0_0_8px_2px_rgba(167,139,250,0.5)]" />
      </motion.div>

      {/* Central avatar / initials */}
      <motion.div
        className="relative z-10 h-[150px] w-[150px] overflow-hidden rounded-full border-2 border-accent/30 shadow-[0_0_60px_rgb(var(--accent-rgb)/0.35)] sm:h-[180px] sm:w-[180px]"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-surface to-accent-2/25" />
        {avatar ? (
          <Image
            src={avatar.url}
            alt={avatar.name}
            fill
            sizes="180px"
            className="object-cover"
            priority
          />        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-gradient">
            M
          </div>
        )}
      </motion.div>

      {/* Floating badge: "Available" */}
      <motion.div
        className="glass absolute -right-2 top-12 rounded-xl px-3 py-1.5 text-xs font-medium text-emerald-400 shadow-lg"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden="true"
      >
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(16,185,129,0.5)]" />
        {openToWork}
      </motion.div>

      {/* Floating badge: "Full-Stack" */}
      <motion.div
        className="glass absolute -left-4 bottom-16 rounded-xl px-3 py-1.5 text-xs font-medium text-accent-2/90 shadow-lg"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        aria-hidden="true"
      >
        {fullStack}
      </motion.div>

      {/* Corner glow dots */}
      {[
        "top-6 right-10 bg-accent",
        "bottom-8 left-12 bg-accent-2",
        "top-1/2 -left-2 bg-violet",
      ].map((cls) => (
        <span
          key={cls}
          className={cn("pointer-events-none absolute h-1.5 w-1.5 rounded-full opacity-60", cls)}
          aria-hidden="true"
        />
      ))}

      {/* Orbital particles */}
      {[
        { size: "h-1.5 w-1.5", top: "18%", left: "82%", delay: "0s" },
        { size: "h-1 w-1", top: "68%", left: "12%", delay: "1.4s" },
        { size: "h-1 w-1", top: "78%", left: "78%", delay: "2.6s" },
      ].map((p) => (
        <span
          key={`${p.top}-${p.left}`}
          className={cn(
            "animate-float-slow pointer-events-none absolute rounded-full bg-accent/60",
            p.size
          )}
          style={{ top: p.top, left: p.left, animationDelay: p.delay }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/* ── Hero Section ─────────────────────────────────────────────── */
export function Hero({
  profile,
}: {
  profile: Profile & { profileImage: Media | null; cvFile: Media | null };
}) {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const orbRotate = useTransform(scrollYProgress, [0, 1], [0, 7]);

  const cvAvailable = Boolean(profile.cvVisible && profile.cvFile);
  const avatar = profile.profileImage
    ? { url: profile.profileImage.url, name: profile.name }
    : null;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-64px)] overflow-hidden"
    >
      {/* Background layers */}
      <AuroraBackdrop className="opacity-80" />
      <div
        className="pointer-events-none absolute inset-0 bg-grid grid-mask opacity-40"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 grain" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-7xl items-center px-5 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
          {/* ── Left: Text ─────────────────────────── */}
          <motion.div style={{ y: copyY, opacity: copyOpacity }} className="lg:col-span-7">
            {/* Available badge */}
            {profile.isAvailable && (
              <motion.span
                {...item(0)}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400"
              >
                <span className="pulse-ring relative flex h-2 w-2 text-emerald-400">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {t("hero.available")}
              </motion.span>
            )}

            {/* Eyebrow */}
            {profile.eyebrow && (
              <motion.p
                {...item(0.05)}
                className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent/80"
              >
                {profile.eyebrow}
              </motion.p>
            )}

            {/* Headline */}
            <motion.h1
              {...item(0.1)}
              className="text-4xl font-extrabold leading-[1.06] tracking-tight text-content sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {profile.heroHeadline ? (
                <>
                  {profile.heroHeadline.split(" ").slice(0, -2).join(" ")}{" "}
                  <span className="text-shine">
                    {profile.heroHeadline.split(" ").slice(-2).join(" ")}
                  </span>
                </>
              ) : (
                <>
                  {t("hero.headlineLead")}{" "}
                  <span className="text-shine">{t("hero.headlineAccent")}</span>
                </>
              )}
            </motion.h1>

            {/* Description */}
            <motion.p
              {...item(0.18)}
              className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg sm:leading-8"
            >
              {profile.heroDescription || t("hero.description")}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              {...item(0.25)}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/projects"
                className={cn(
                  buttonVariants("primary", "lg"),
                  "shadow-[0_0_30px_rgb(var(--accent-rgb)/0.35)] transition-shadow duration-300 hover:shadow-[0_0_46px_rgb(var(--accent-rgb)/0.55)]"
                )}
              >
                {t("hero.exploreWork")}
                <Icon name="ArrowRight" className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants("outline", "lg"),
                  "transition-all duration-300 hover:shadow-[0_0_24px_rgb(var(--accent-rgb)/0.18)]"
                )}
              >
                {t("hero.letsTalk")}
              </Link>
              {cvAvailable && (
                <a
                  href={`/api/media/private/${profile.cvFile!.id}`}
                  className={buttonVariants("ghost", "lg")}
                  download
                >
                  <Icon name="Download" className="h-4 w-4" />
                  {t("hero.downloadCv")}
                </a>
              )}
            </motion.div>

            {/* Social + scroll hint */}
            <motion.div
              {...item(0.32)}
              className="mt-10 flex items-center gap-5"
            >
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("hero.github")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-elevated text-muted transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-content hover:shadow-[0_0_16px_rgb(var(--accent-rgb)/0.35)]"
                >
                  <Icon name="Github" className="h-4 w-4" />
                </a>
              )}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("hero.linkedin")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-elevated text-muted transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-content hover:shadow-[0_0_16px_rgb(var(--accent-rgb)/0.35)]"
                >
                  <Icon name="Linkedin" className="h-4 w-4" />
                </a>
              )}

              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />

              {/* Scroll indicator */}
              <a
                href="#about"
                className="group flex items-center gap-2 text-xs text-faint transition-colors hover:text-muted"
              >
                <motion.span
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon name="ChevronsDown" className="h-4 w-4" />
                </motion.span>
                {t("hero.scroll")}
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: Orb ─────────────────────────── */}
          <motion.div
            style={{ y: orbY, rotate: orbRotate }}
            className="flex items-center justify-center lg:col-span-5"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            <HeroOrb
              avatar={avatar}
              openToWork={t("hero.openToWork")}
              fullStack={t("hero.fullStack")}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
