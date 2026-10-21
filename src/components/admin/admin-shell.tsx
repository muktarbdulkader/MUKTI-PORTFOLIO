"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/actions/auth";

const NAV = [
  { label: "Overview", href: "/admin", icon: "LayoutDashboard" },
  { label: "Projects", href: "/admin/projects", icon: "FolderKanban" },
  { label: "Skills", href: "/admin/skills", icon: "Wrench" },
  { label: "Profile", href: "/admin/profile", icon: "User" },
  { label: "Experience", href: "/admin/experience", icon: "Briefcase" },
  { label: "Education", href: "/admin/education", icon: "GraduationCap" },
  { label: "Services", href: "/admin/services", icon: "Code" },
  { label: "Messages", href: "/admin/messages", icon: "MessageSquare" },
  { label: "Media", href: "/admin/media", icon: "Image" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const Sidebar = (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border-subtle bg-surface">
      <div className="flex h-16 items-center gap-2 px-5 text-base font-semibold text-content">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
          <Icon name="Sparkles" className="h-4 w-4" />
        </span>
        Mukti CMS
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2" aria-label="Admin">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive(item.href)
                ? "bg-accent/12 text-accent"
                : "text-muted hover:bg-elevated hover:text-content"
            )}
          >
            <Icon name={item.icon} className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="space-y-2 border-t border-border-subtle p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-elevated hover:text-content"
        >
          <Icon name="ExternalLink" className="h-4 w-4" />
          View live site
        </Link>
        <button
          type="button"
          disabled={pending}
          onClick={() => start(() => logoutAction())}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-elevated hover:text-content"
        >
          <Icon name="LogOut" className="h-4 w-4" />
          {pending ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-canvas">
      {/* Desktop sidebar */}
      <div className="hidden md:block">{Sidebar}</div>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-0 h-full">{Sidebar}</div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border-subtle bg-surface/60 px-4 md:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:text-content"
            aria-label="Open menu"
          >
            <Icon name="Menu" className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-content">Dashboard</span>
          <Link href="/" target="_blank" className="text-muted hover:text-content" aria-label="View site">
            <Icon name="ExternalLink" className="h-5 w-5" />
          </Link>
        </header>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
