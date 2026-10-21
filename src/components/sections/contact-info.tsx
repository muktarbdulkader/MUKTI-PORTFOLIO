import { Icon } from "@/components/ui/icon";
import { getProfile, getSettings } from "@/lib/queries";

export async function ContactInfo() {
  const [profile, settings] = await Promise.all([
    getProfile().catch(() => null),
    getSettings().catch(() => null),
  ]);
  const email = profile?.publicEmail || settings?.contactEmail || undefined;
  const github = profile?.githubUrl || undefined;
  const linkedin = profile?.linkedinUrl || undefined;

  return (
    <div className="space-y-3">
      {email ? (
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-3 rounded-xl border border-border-subtle bg-surface/50 p-4 hover:border-accent/40"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/12 text-accent">
            <Icon name="Mail" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-wide text-faint">Email</p>
            <p className="text-sm text-content">{email}</p>
          </div>
        </a>
      ) : null}

      {github ? (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border border-border-subtle bg-surface/50 p-4 hover:border-accent/40"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/12 text-accent">
            <Icon name="Github" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-wide text-faint">GitHub</p>
            <p className="text-sm text-content">View my code</p>
          </div>
        </a>
      ) : null}

      {linkedin ? (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border border-border-subtle bg-surface/50 p-4 hover:border-accent/40"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/12 text-accent">
            <Icon name="Linkedin" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-wide text-faint">LinkedIn</p>
            <p className="text-sm text-content">Connect professionally</p>
          </div>
        </a>
      ) : null}
    </div>
  );
}
