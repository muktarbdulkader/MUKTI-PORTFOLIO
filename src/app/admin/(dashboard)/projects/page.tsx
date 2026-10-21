import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminPage, PageHeader } from "@/components/admin/page";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { EmptyState } from "@/components/ui/empty-state";
import { ProjectActions } from "@/components/admin/project-actions";
import { formatDate } from "@/lib/utils";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      status: true,
      isFeatured: true,
      displayOrder: true,
      updatedAt: true,
    },
  });

  return (
    <AdminPage>
      <PageHeader
        title="Projects"
        description="Create, edit, publish, and reorder your projects."
        action={
          <Link href="/admin/projects/new" className={buttonVariants("primary", "md")}>
            <Icon name="Plus" className="h-4 w-4" /> New project
          </Link>
        }
      />

      {projects.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon="FolderKanban"
            title="No projects yet"
            description="Create your first project to showcase your work."
            action={
              <Link href="/admin/projects/new" className={buttonVariants("primary", "md")}>
                <Icon name="Plus" className="h-4 w-4" /> New project
              </Link>
            }
          />
        </div>
      ) : (
        <Card className="mt-8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-faint">
                  <th className="px-4 py-3 font-medium">Project</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Updated</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-b border-border-subtle/50 last:border-0">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/projects/${p.id}/edit`}
                        className="flex items-center gap-2 font-medium text-content hover:text-accent"
                      >
                        {p.title}
                        {p.isFeatured ? (
                          <Badge tone="accent">
                            <Icon name="Star" className="mr-1 h-3 w-3" /> Featured
                          </Badge>
                        ) : null}
                      </Link>
                      <span className="text-xs text-faint">/{p.slug}</span>
                    </td>
                    <td className="px-4 py-3 text-muted">{p.category || "—"}</td>
                    <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                    <td className="px-4 py-3 text-muted">{p.displayOrder}</td>
                    <td className="px-4 py-3 text-muted">{formatDate(p.updatedAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/admin/projects/${p.id}/edit`} className="text-muted hover:text-content" aria-label="Edit">
                          <Icon name="Pencil" className="h-4 w-4" />
                        </Link>
                        <ProjectActions id={p.id} status={p.status} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </AdminPage>
  );
}
