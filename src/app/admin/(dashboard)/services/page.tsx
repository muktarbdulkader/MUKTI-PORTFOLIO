import { prisma } from "@/lib/db";
import { AdminPage, PageHeader } from "@/components/admin/page";
import { ServicesManager } from "@/components/admin/services-manager";
import { getI18n } from "@/lib/i18n/server";

export default async function AdminServicesPage() {
  const { t } = await getI18n();
  const services = await prisma.service.findMany({
    orderBy: [{ displayOrder: "asc" }],
    select: { id: true, title: true, description: true, icon: true, displayOrder: true, published: true },
  });

  return (
    <AdminPage>
      <PageHeader
        title={t("admin.services.title")}
        description={t("admin.services.description")}
      />
      <div className="mt-8">
        <ServicesManager services={services} />
      </div>
    </AdminPage>
  );
}
