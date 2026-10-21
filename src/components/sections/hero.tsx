"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
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
function HeroOrb({ avatar }: { avatar?: { url: string; name: string } | null }) {
  return (
    <div className="relative mx-auto flex h-[380px] w-[380px] items-center justify-center sm:h-[440px] sm:w-[440px]">
      {/* Outer atmosphere */}
      <div
        className="animate-pulse-glow pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, rgba(85,184,255,0.08) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Spinning ring 1 */}
      <motion.div
        className="absolute inset-4 rounded-full border border-accent/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        {/* Orbiting dot */}
        <span
          className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_4px_rgba(139,92,246,0.6)]"
        />
      </motion.div>

      {/* Spinning ring 2 (reverse, tilted) */}
      <motion.div
        className="absolute inset-10 rounded-full border border-blue/15"
        style={{ transform: "rotateX(60deg)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <span
          className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-blue/80 shadow-[0_0_10px_3px_rgba(85,184,255,0.5)]"
        />
      </motion.div>

      {/* Spinning ring 3 */}
      <motion.div
        className="absolute inset-16 rounded-full border border-violet/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <span
          className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-violet/70 shadow-[0_0_8px_2px_rgba(167,139,250,0.5)]"
        />
      </motion.div>

      {/* Central avatar / initials */}
      <motion.div
        className="relative z-10 h-[180px] w-[180px] overflow-hidden rounded-full border-2 border-accent/30 shadow-[0_0_40px_rgba(139,92,246,0.3)]"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-surface to-blue/20" />
        {avatar ? (
          <Image
            src={avatar.url}
            alt={avatar.name}
            fill
            sizes="180px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-gradient">
            M
          </div>
        )}
      </motion.div>

      {/* Floating badge: "Available" */}
      <motion.div
        className="absolute -right-2 top-12 glass rounded-xl px-3 py-1.5 text-xs font-medium text-emerald-400 shadow-lg"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden="true"
      >
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(16,185,129,0.5)]" />
        Open to work
      </motion.div>

      {/* Floating badge: "Full-Stack" */}
      <motion.div
        className="absolute -left-4 bottom-16 glass rounded-xl px-3 py-1.5 text-xs font-medium text-blue/90 shadow-lg"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        aria-hidden="true"
      >
        Full-Stack Dev
      </motion.div>

      {/* Corner glow dots */}
      {[
        "top-6 right-10 bg-accent",
        "bottom-8 left-12 bg-blue",
        "top-1/2 -left-2 bg-violet",
      ].map((cls) => (
        <span
          key={cls}
          className={cn("pointer-events-none absolute h-1.5 w-1.5 rounded-full opacity-60", cls)}
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
  const cvAvailable = Boolean(profile.cvVisible && profile.cvFile);
  const avatar = profile.profileImage
    ? { url: profile.profileImage.url, name: profile.name }
    : null;

  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full blur-[120px]"
        style={{ background: "rgba(139,92,246,0.12)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-1/4 h-80 w-80 rounded-full blur-[100px]"
        style={{ background: "rgba(85,184,255,0.08)" }}
        aria-hidden="true"
      />

      <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-7xl items-center px-5 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
          {/* ── Left: Text ─────────────────────────── */}
          <div className="lg:col-span-7">
            {/* Available badge */}
            {profile.isAvailable && (
              <motion.span
                {...item(0)}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available for new projects
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
                  <span className="text-gradient">
                    {profile.heroHeadline.split(" ").slice(-2).join(" ")}
                  </span>
                </>
              ) : (
                <>
                  Building Products{" "}
                  <span className="text-gradient">People Love</span>
                </>
              )}
            </motion.h1>

            {/* Description */}
            <motion.p
              {...item(0.18)}
              className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg sm:leading-8"
            >
              {profile.heroDescription ||
                "Full-stack engineer crafting fast, beautiful web & mobile products that solve real-world problems."}
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
                  "shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]"
                )}
              >
                Explore My Work
                <Icon name="ArrowRight" className="h-4 w-4" />
              </Link>
              <Link href="/contact" className={buttonVariants("outline", "lg")}>
                Let&apos;s Talk
              </Link>
              {cvAvailable && (
                <a
                  href={`/api/media/private/${profile.cvFile!.id}`}
                  className={buttonVariants("ghost", "lg")}
                  download
                >
                  <Icon name="Download" className="h-4 w-4" />
                  Download CV
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
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-elevated text-muted transition-all hover:border-accent/40 hover:text-content hover:shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                >
                  <Icon name="Github" className="h-4 w-4" />
                </a>
              )}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-elevated text-muted transition-all hover:border-accent/40 hover:text-content hover:shadow-[0_0_12px_rgba(139,92,246,0.3)]"
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
                Scroll to explore
              </a>
            </motion.div>
          </div>

          {/* ── Right: Orb ─────────────────────────── */}
          <motion.div
            className="flex items-center justify-center lg:col-span-5"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            <HeroOrb avatar={avatar} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
