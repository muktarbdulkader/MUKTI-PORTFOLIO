import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { getI18n } from "@/lib/i18n/server";
import { getProfile, getSettings } from "@/lib/queries";

const NAV = [
  { key: "home", href: "/" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" },
  { key: "privacy", href: "/privacy" },
] as const;

export async function SiteFooter() {
  const { t } = await getI18n();
  const [profile, settings] = await Promise.all([
    getProfile().catch(() => null),
    getSettings().catch(() => null),
  ]);

  const navItems = NAV.map((item) => ({
    ...item,
    label:
      item.key === "privacy" ? t("privacy.title") : t(`nav.${item.key}`),
  }));

  const github = profile?.githubUrl || undefined;
  const linkedin = profile?.linkedinUrl || undefined;
  const email = profile?.publicEmail || settings?.contactEmail || undefined;
  const footerText =
    settings?.footerContent ||
    `© ${new Date().getFullYear()} Mukti. ${t("footer.rights")}`;

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border-subtle/60">
      {/* Atmospheric glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-[500px] -translate-x-1/2 opacity-25 blur-[80px]"
        style={{ background: "linear-gradient(90deg, rgb(var(--accent-rgb)/1), rgb(var(--accent-2-rgb)/1))" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-grid grid-mask opacity-10" aria-hidden="true" />
      {/* Accent hairline */}
      <span className="flow-line pointer-events-none absolute inset-x-0 top-0 opacity-70" aria-hidden />

      <Container size="wide" className="relative py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 text-base font-bold text-content"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent transition-all group-hover:bg-accent/25">
                <Icon name="Sparkles" className="h-4 w-4" />
              </span>
              <span className="text-gradient">Mukti</span>
            </Link>
            <p className="mt-3 text-sm leading-6 text-muted">
              {profile?.title || "Software Engineer & Full-Stack Developer"}
            </p>
            <p className="mt-2 text-xs text-faint">{t("footer.tagline")}</p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-faint">
              {t("footer.navigate")}
            </span>
            <nav className="flex flex-col gap-2" aria-label={t("footer.navigate")}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-faint">
              {t("footer.connect")}
            </span>
            <div className="flex items-center gap-2">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-elevated text-muted transition-all hover:border-accent/30 hover:text-accent hover:shadow-[0_0_12px_rgb(var(--accent-rgb)/0.2)]"
                  aria-label="GitHub"
                >
                  <Icon name="Github" className="h-4 w-4" />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-elevated text-muted transition-all hover:border-blue/30 hover:text-blue hover:shadow-[0_0_12px_rgb(var(--accent-2-rgb)/0.2)]"
                  aria-label="LinkedIn"
                >
                  <Icon name="Linkedin" className="h-4 w-4" />
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-elevated text-muted transition-all hover:border-accent/30 hover:text-accent hover:shadow-[0_0_12px_rgb(var(--accent-rgb)/0.2)]"
                  aria-label={t("contact.channels.email")}
                >
                  <Icon name="Mail" className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle/50 pt-6">
          <p className="text-xs text-faint">{footerText}</p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-faint">
              <span>{t("footer.builtWith")}</span>
              <span className="text-accent">♥</span>
              <span>{t("footer.using")}</span>
            </div>
            <LanguageSwitcher variant="compact" />
          </div>
        </div>
      </Container>
    </footer>
  );
}
