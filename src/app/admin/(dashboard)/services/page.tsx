import { prisma } from "@/lib/db";
import { AdminPage, PageHeader } from "@/components/admin/page";
import { ServicesManager } from "@/components/admin/services-manager";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: [{ displayOrder: "asc" }],
    select: { id: true, title: true, description: true, icon: true, displayOrder: true, published: true },
  });

  return (
    <AdminPage>
      <PageHeader
        title="Services"
        description="Freelance services you offer."
      />
      <div className="mt-8">
        <ServicesManager services={services} />
      </div>
    </AdminPage>
  );
}
