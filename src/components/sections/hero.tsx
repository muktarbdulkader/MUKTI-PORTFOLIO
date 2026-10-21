import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import type { Profile, Media } from "@/lib/queries";

export function Hero({
  profile,
}: {
  profile: Profile & { profileImage: Media | null; cvFile: Media | null };
}) {
  const cvAvailable = Boolean(profile.cvVisible && profile.cvFile);
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
      <Container size="wide" className="relative py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {profile.isAvailable ? (
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available for work
              </span>
            ) : null}

            {profile.eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {profile.eyebrow}
              </p>
            ) : null}
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-content sm:text-5xl lg:text-6xl">
              {profile.heroHeadline}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
              {profile.heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/projects" className={buttonVariants("primary", "lg")}>
                Explore My Projects
                <Icon name="ArrowRight" className="h-4 w-4" />
              </Link>
              <Link href="/contact" className={buttonVariants("outline", "lg")}>
                Let&apos;s Work Together
              </Link>
              {cvAvailable ? (
                <a
                  href={`/api/media/private/${profile.cvFile!.id}`}
                  className={buttonVariants("ghost", "lg")}
                  download
                >
                  <Icon name="Download" className="h-4 w-4" />
                  Download My CV
                </a>
              ) : null}
            </div>

            <div className="mt-8 flex items-center gap-4">
              {profile.githubUrl ? (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-content"
                  aria-label="GitHub"
                >
                  <Icon name="Github" className="h-5 w-5" />
                </a>
              ) : null}
              {profile.linkedinUrl ? (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-content"
                  aria-label="LinkedIn"
                >
                  <Icon name="Linkedin" className="h-5 w-5" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="mx-auto aspect-square w-full max-w-sm">
              <div
                className={cn(
                  "relative h-full w-full overflow-hidden rounded-3xl border border-border-subtle bg-gradient-to-br from-accent/15 via-elevated to-violet/15"
                )}
              >
                {profile.profileImage ? (
                  <Image
                    src={profile.profileImage.url}
                    alt={profile.name}
                    fill
                    sizes="(max-width: 1024px) 80vw, 30vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
                    <span className="flex h-24 w-24 items-center justify-center rounded-2xl bg-accent/15 text-4xl font-semibold text-accent">
                      {profile.name?.[0] ?? "M"}
                    </span>
                    <span className="text-sm text-muted">Mukti</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
