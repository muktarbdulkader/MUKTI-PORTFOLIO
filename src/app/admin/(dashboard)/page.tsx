import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminPage, PageHeader } from "@/components/admin/page";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { buttonVariants } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate } from "@/lib/utils";

async function getStats() {
  const [
    total,
    published,
    drafts,
    hidden,
    unread,
    recent,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: "PUBLISHED" } }),
    prisma.project.count({ where: { status: "DRAFT" } }),
    prisma.project.count({ where: { status: "UNPUBLISHED" } }),
    prisma.contactMessage.count({ where: { isRead: false, isArchived: false } }),
    prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: { id: true, title: true, slug: true, status: true, updatedAt: true },
    }),
  ]);
  return { total, published, drafts, hidden, unread, recent };
}

function StatCard({
  label,
  value,
  icon,
  tone = "accent",
}: {
  label: string;
  value: number;
  icon: string;
  tone?: "accent" | "violet" | "warning" | "success";
}) {
  const tones: Record<string, string> = {
    accent: "bg-accent/12 text-accent",
    violet: "bg-violet/12 text-violet",
    warning: "bg-amber-500/12 text-amber-400",
    success: "bg-emerald-500/12 text-emerald-400",
  };
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">{label}</span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${tones[tone]}`}>
          <Icon name={icon} className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold text-content">{value}</p>
    </Card>
  );
}

export default async function AdminOverviewPage() {
  const stats = await getStats();

  const quickActions = [
    { label: "New project", href: "/admin/projects/new", icon: "Plus" },
    { label: "Edit profile", href: "/admin/profile", icon: "User" },
    { label: "Manage skills", href: "/admin/skills", icon: "Wrench" },
    { label: "View messages", href: "/admin/messages", icon: "MessageSquare" },
  ];

  return (
    <AdminPage>
      <PageHeader
        title="Overview"
        description="A snapshot of your portfolio content."
        action={
          <Link href="/admin/projects/new" className={buttonVariants("primary", "md")}>
            <Icon name="Plus" className="h-4 w-4" /> New project
          </Link>
        }
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total projects" value={stats.total} icon="FolderKanban" tone="accent" />
        <StatCard label="Published" value={stats.published} icon="CheckCircle2" tone="success" />
        <StatCard label="Drafts" value={stats.drafts} icon="FileText" tone="warning" />
        <StatCard label="Unread messages" value={stats.unread} icon="MessageSquare" tone="violet" />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-faint">
            Recent updates
          </h2>
          <div className="mt-3 space-y-2">
            {stats.recent.length === 0 ? (
              <Card className="p-5 text-sm text-muted">No projects yet.</Card>
            ) : (
              stats.recent.map((p) => (
                <Card key={p.id} className="flex items-center justify-between p-4">
                  <div className="min-w-0">
                    <Link
                      href={`/admin/projects/${p.id}/edit`}
                      className="block truncate text-sm font-medium text-content hover:text-accent"
                    >
                      {p.title}
                    </Link>
                    <p className="text-xs text-faint">Updated {formatDate(p.updatedAt)}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </Card>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-faint">
            Quick actions
          </h2>
          <div className="mt-3 space-y-2">
            {quickActions.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="flex items-center justify-between rounded-xl border border-border-subtle bg-surface/50 p-4 text-sm text-content hover:border-accent/40"
              >
                <span className="flex items-center gap-3">
                  <Icon name={a.icon} className="h-4 w-4 text-accent" />
                  {a.label}
                </span>
                <Icon name="ChevronRight" className="h-4 w-4 text-faint" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminPage>
  );
}
