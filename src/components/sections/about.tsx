import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { FadeUp, StaggerContainer, StaggerItem, SlideIn } from "@/components/ui/motion";
import type { Profile, Media } from "@/lib/queries";

const BLOCKS: Array<{
  key: keyof Pick<Profile, "interests" | "approach" | "learningGoals" | "ambitions" | "education">;
  label: string;
  icon: string;
  color: string;
}> = [
  { key: "interests",     label: "Interests",           icon: "Sparkles",    color: "text-violet" },
  { key: "approach",      label: "Engineering approach", icon: "Wrench",      color: "text-blue" },
  { key: "learningGoals", label: "Learning goals",       icon: "GraduationCap", color: "text-accent" },
  { key: "ambitions",     label: "Ambitions",            icon: "Star",        color: "text-emerald" },
  { key: "education",     label: "Education",            icon: "Briefcase",   color: "text-accent" },
];

export function About({
  profile,
}: {
  profile: Profile & { profileImage: Media | null };
}) {
  if (!profile.aboutVisible) return null;
  const hasBio = Boolean(profile.bio?.trim());
  const blocks = BLOCKS.filter((b) => {
    const v = profile[b.key];
    return typeof v === "string" && v.trim().length > 0;
  });
  if (!hasBio && blocks.length === 0) return null;

  return (
    <section id="about" className="section-divider scroll-mt-20">
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <Container className="relative py-24">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* ── Left: Image ─────────────────────────── */}
          <SlideIn direction="left" className="flex justify-center lg:col-span-5 lg:justify-start">
            <div className="relative">
              {/* Decorative corner line art */}
              <div
                className="pointer-events-none absolute -left-4 -top-4 h-24 w-24 border-l-2 border-t-2 border-accent/30 rounded-tl-2xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 border-b-2 border-r-2 border-blue/30 rounded-br-2xl"
                aria-hidden="true"
              />

              <div className="aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-2xl border border-border bg-elevated shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                {profile.profileImage ? (
                  <Image
                    src={profile.profileImage.url}
                    alt={profile.name}
                    width={340}
                    height={425}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-accent/10 via-elevated to-blue/10">
                    <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/15">
                      <span className="text-4xl font-bold text-gradient">
                        {profile.name?.[0] ?? "M"}
                      </span>
                    </span>
                    <span className="text-sm font-medium text-muted">{profile.name}</span>
                  </div>
                )}
              </div>
            </div>
          </SlideIn>

          {/* ── Right: Content ──────────────────────── */}
          <div className="lg:col-span-7">
            <FadeUp>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                About me
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-content sm:text-4xl">
                Hi, I&apos;m{" "}
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
                    <div className="glass rounded-xl p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.08)]">
                      <div className={`mb-3 flex items-center gap-2 ${b.color}`}>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-current/10">
                          <Icon name={b.icon} className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wide">
                          {b.label}
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
