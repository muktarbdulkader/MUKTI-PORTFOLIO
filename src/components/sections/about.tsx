import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { FadeUp, StaggerContainer, StaggerItem, SlideIn } from "@/components/ui/motion";
import { getI18n } from "@/lib/i18n/server";
import type { Profile, Media } from "@/lib/queries";

const BLOCKS: Array<{
  key: keyof Pick<Profile, "interests" | "approach" | "learningGoals" | "ambitions" | "education">;
  label:
    | "about.interests"
    | "about.approach"
    | "about.learningGoals"
    | "about.ambitions"
    | "about.education";
  icon: string;
  color: string;
}> = [
  { key: "interests",     label: "about.interests",     icon: "Sparkles",      color: "text-violet" },
  { key: "approach",      label: "about.approach",      icon: "Wrench",        color: "text-blue" },
  { key: "learningGoals", label: "about.learningGoals", icon: "GraduationCap", color: "text-accent" },
  { key: "ambitions",     label: "about.ambitions",     icon: "Star",          color: "text-emerald" },
  { key: "education",     label: "about.education",     icon: "Briefcase",     color: "text-accent" },
];

export async function About({
  profile,
}: {
  profile: Profile & { profileImage: Media | null };
}) {
  const { t } = await getI18n();
  if (!profile.aboutVisible) return null;
  const hasBio = Boolean(profile.bio?.trim());
  const blocks = BLOCKS.filter((b) => {
    const v = profile[b.key];
    return typeof v === "string" && v.trim().length > 0;
  });
  if (!hasBio && blocks.length === 0) return null;

  return (
    <section id="about" className="section-divider relative scroll-mt-20 overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgb(var(--accent-rgb)/0.12) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <Container className="relative py-24">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* ── Left: The Solo Featured Photo (Exclusive to About Me) ── */}
          <SlideIn direction="left" className="flex justify-center lg:col-span-5 lg:justify-start">
            <div className="group relative">
              {/* Outer atmospheric aura */}
              <div
                className="pointer-events-none absolute -inset-10 -z-10"
                aria-hidden="true"
              >
                <span className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-accent/20" />
                <span className="animate-spin-reverse absolute inset-6 rounded-full border border-dashed border-accent-2/15" />
                <span className="absolute inset-10 rounded-full bg-accent/15 blur-3xl" />
              </div>

              {/* High-tech precision HUD corner brackets */}
              <div
                className="pointer-events-none absolute -left-3 -top-3 h-10 w-10 rounded-tl-xl border-l-2 border-t-2 border-accent shadow-[0_0_12px_rgb(var(--accent-rgb))]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-3 -top-3 h-10 w-10 rounded-tr-xl border-r-2 border-t-2 border-accent-2 shadow-[0_0_12px_rgb(var(--accent-2-rgb))]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-3 -left-3 h-10 w-10 rounded-bl-xl border-b-2 border-l-2 border-accent-2 shadow-[0_0_12px_rgb(var(--accent-2-rgb))]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-3 -right-3 h-10 w-10 rounded-br-xl border-b-2 border-r-2 border-accent shadow-[0_0_12px_rgb(var(--accent-rgb))]"
                aria-hidden="true"
              />

              {/* Main portrait photo frame */}
              <div className="relative aspect-[4/5] w-full max-w-[350px] overflow-hidden rounded-2xl border border-accent/30 bg-surface shadow-[0_25px_65px_rgba(0,0,0,0.65)] transition-all duration-500 group-hover:border-accent/60 group-hover:shadow-[0_30px_80px_rgb(var(--accent-rgb)/0.3)]">
                {profile.profileImage ? (
                  <>
                    <Image
                      src={profile.profileImage.url}
                      alt={profile.name}
                      width={380}
                      height={475}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      priority
                    />
                    {/* Subtle bottom gradient shade */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-canvas/90 via-canvas/30 to-transparent" />
                  </>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-accent/20 via-surface to-accent-2/15 p-6 text-center">
                    <span className="flex h-24 w-24 items-center justify-center rounded-3xl border border-accent/35 bg-surface/80 shadow-[0_0_30px_rgb(var(--accent-rgb)/0.4)]">
                      <span className="text-5xl font-extrabold text-gradient">
                        {profile.name?.[0] ?? "M"}
                      </span>
                    </span>
                    <div>
                      <div className="text-base font-bold text-content">{profile.name}</div>
                      <div className="text-xs text-accent-2 font-mono mt-1">&lt;Profile Photo&gt;</div>
                    </div>
                  </div>
                )}

                {/* Status indicator badge pinned to the bottom of the photo */}
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl border border-white/10 bg-canvas/80 px-3.5 py-2 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-xs font-semibold text-content">
                      {profile.name || "Mukti"}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-accent-2 font-medium tracking-wide">
                    ENGINEER
                  </span>
                </div>
              </div>
            </div>
          </SlideIn>

          {/* ── Right: Content ──────────────────────── */}
          <div className="lg:col-span-7">
            <FadeUp>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {t("about.eyebrow")}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-content sm:text-4xl">
                {t("about.titleLead")}{" "}
                <span className="text-gradient">{profile.name || "Mukti"}</span>
              </h2>
              {hasBio && (
                <p className="mt-5 max-w-lg text-base leading-8 text-muted">
                  {profile.bio}
                </p>
              )}
            </FadeUp>

            {blocks.length > 0 && (
              <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2" delay={0.1}>
                {blocks.map((b) => (
                  <StaggerItem key={b.key}>
                    <div className="glass card-lift rounded-xl p-5">
                      <div className={`mb-3 flex items-center gap-2 ${b.color}`}>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-current/10">
                          <Icon name={b.icon} className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wide">
                          {t(b.label)}
                        </span>
                      </div>
                      <p className="text-sm leading-6 text-muted">{profile[b.key] as string}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
