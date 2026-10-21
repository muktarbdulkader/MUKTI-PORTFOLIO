import { Icon } from "@/components/ui/icon";
import { getI18n } from "@/lib/i18n/server";
import { getProfile, getSettings } from "@/lib/queries";

const CONTACTS = [
  { key: "email",    icon: "Mail",     value: "Email",    color: "text-accent", bg: "bg-accent/10", hover: "hover:border-accent/30" },
  { key: "github",   icon: "Github",   value: "GitHub",   color: "text-blue",   bg: "bg-blue/10",   hover: "hover:border-blue/30" },
  { key: "linkedin", icon: "Linkedin", value: "LinkedIn", color: "text-violet", bg: "bg-violet/10", hover: "hover:border-violet/30" },
] as const;

export async function ContactInfo() {
  const { t } = await getI18n();
  const [profile, settings] = await Promise.all([
    getProfile().catch(() => null),
    getSettings().catch(() => null),
  ]);
  const email = profile?.publicEmail || settings?.contactEmail || undefined;
  const github = profile?.githubUrl || undefined;
  const linkedin = profile?.linkedinUrl || undefined;

  const items = [
    email    && { ...CONTACTS[0], href: `mailto:${email}`,  display: email },
    github   && { ...CONTACTS[1], href: github,              display: "GitHub" },
    linkedin && { ...CONTACTS[2], href: linkedin,            display: "LinkedIn" },
  ].filter(Boolean) as Array<{
    key: "email" | "github" | "linkedin";
    icon: string; value: string; color: string; bg: string; hover: string; href: string; display: string;
  }>;

  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <a
          key={item.key}
          href={item.href}
          target={item.href.startsWith("mailto") ? undefined : "_blank"}
          rel={item.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
          className={`group flex items-center gap-4 rounded-xl border border-border bg-surface/50 p-4 transition-all duration-200 ${item.hover} hover:shadow-md`}
        >
          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color} transition-transform duration-200 group-hover:scale-110`}>
            <Icon name={item.icon} className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-faint">
              {t(`contact.channels.${item.key}`)}
            </p>
            <p className="mt-0.5 text-sm font-medium text-content">{item.display}</p>
            <p className="text-xs text-muted">
              {t(`contact.channels.${item.key}Description`)}
            </p>
          </div>
        </a>
      ))}

      {/* Availability note */}
      <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <p className="text-xs font-semibold text-emerald-400">
            {t("contact.availabilityTitle")}
          </p>
        </div>
        <p className="mt-2 text-xs leading-5 text-muted">
          {t("contact.availabilityBody")}
        </p>
      </div>
    </div>
  );
}
