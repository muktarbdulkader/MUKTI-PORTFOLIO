import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import type { Profile, Media } from "@/lib/queries";

const BLOCKS: Array<{
  key: keyof Pick<Profile, "interests" | "approach" | "learningGoals" | "ambitions" | "education">;
  label: string;
  icon: string;
}> = [
  { key: "interests", label: "Interests", icon: "Sparkles" },
  { key: "approach", label: "Engineering approach", icon: "Wrench" },
  { key: "learningGoals", label: "Learning goals", icon: "GraduationCap" },
  { key: "ambitions", label: "Ambitions", icon: "Star" },
  { key: "education", label: "Education", icon: "Briefcase" },
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
    <section id="about" className="scroll-mt-20 border-t border-border-subtle/40">
      <Container className="py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
              {profile.profileImage ? (
                <Image
                  src={profile.profileImage.url}
                  alt={profile.name}
                  fill
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/10 to-violet/10 text-5xl font-semibold text-accent">
                  {profile.name?.[0] ?? "M"}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="About"
              title={`Hi, I'm ${profile.name || "Mukti"}`}
              description={profile.bio ?? undefined}
            />
            {blocks.length > 0 ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {blocks.map((b) => (
                  <Card key={b.key} className="p-5">
                    <div className="mb-2 flex items-center gap-2 text-accent">
                      <Icon name={b.icon} className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wide">
                        {b.label}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-muted">
                      {profile[b.key] as string}
                    </p>
                  </Card>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
