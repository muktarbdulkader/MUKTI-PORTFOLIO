import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { getProfile, getSettings } from "@/lib/queries";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

export async function SiteFooter() {
  const [profile, settings] = await Promise.all([
    getProfile().catch(() => null),
    getSettings().catch(() => null),
  ]);

  const github = profile?.githubUrl || undefined;
  const linkedin = profile?.linkedinUrl || undefined;
  const email = profile?.publicEmail || settings?.contactEmail || undefined;
  const footerText =
    settings?.footerContent || `© ${new Date().getFullYear()} Mukti. All rights reserved.`;

  return (
    <footer className="mt-24 border-t border-border-subtle/60 bg-canvas">
      <Container size="wide" className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 text-base font-semibold text-content">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <Icon name="Sparkles" className="h-4 w-4" />
              </span>
              Mukti
            </Link>
            <p className="mt-3 text-sm leading-6 text-muted">
              {profile?.title || "Software Engineer | Full-Stack Developer"}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-faint">
              Navigate
            </span>
            <nav className="flex flex-col gap-2" aria-label="Footer">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted hover:text-content"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-faint">
              Connect
            </span>
            <div className="flex items-center gap-3">
              {github ? (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle text-muted hover:text-content"
                  aria-label="GitHub"
                >
                  <Icon name="Github" className="h-4 w-4" />
                </a>
              ) : null}
              {linkedin ? (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle text-muted hover:text-content"
                  aria-label="LinkedIn"
                >
                  <Icon name="Linkedin" className="h-4 w-4" />
                </a>
              ) : null}
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle text-muted hover:text-content"
                  aria-label="Email"
                >
                  <Icon name="Mail" className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border-subtle/60 pt-6 text-xs text-faint">
          {footerText}
        </div>
      </Container>
    </footer>
  );
}
