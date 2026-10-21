import { prisma } from "@/lib/db";
import { AdminPage, PageHeader } from "@/components/admin/page";
import { MediaManager } from "@/components/admin/media-manager";

export default async function AdminMediaPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      url: true,
      originalName: true,
      mimeType: true,
      size: true,
      category: true,
      isPublic: true,
      createdAt: true,
    },
  });

  return (
    <AdminPage>
      <PageHeader
        title="Media"
        description="Upload and manage images and files. Public images are served from /uploads."
      />
      <div className="mt-8">
        <MediaManager media={media} />
      </div>
    </AdminPage>
  );
}
