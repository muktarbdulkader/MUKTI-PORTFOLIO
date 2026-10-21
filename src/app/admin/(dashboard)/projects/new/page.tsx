import { prisma } from "@/lib/db";
import { AdminPage, PageHeader } from "@/components/admin/page";
import { ProjectForm } from "@/components/admin/project-form";

export default async function NewProjectPage() {
  const mediaImages = await prisma.media.findMany({
    where: { isPublic: true, mimeType: { startsWith: "image/" } },
    select: { id: true, url: true, originalName: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminPage>
      <PageHeader title="New project" description="Add a new project to your portfolio." />
      <div className="mt-8 max-w-3xl">
        <ProjectForm mediaImages={mediaImages} />
      </div>
    </AdminPage>
  );
}
