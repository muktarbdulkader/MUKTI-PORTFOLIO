import { prisma } from "@/lib/db";
import { AdminPage, PageHeader } from "@/components/admin/page";
import { ExperienceManager } from "@/components/admin/experience-manager";

export default async function AdminEducationPage() {
  const items = await prisma.experience.findMany({
    where: { kind: "EDUCATION" },
    orderBy: [{ displayOrder: "asc" }, { startDate: "desc" }],
  });

  return (
    <AdminPage>
      <PageHeader
        title="Education"
        description="Schools, courses, and academic background."
      />
      <div className="mt-8">
        <ExperienceManager items={items} kinds={["EDUCATION"]} defaultKind="EDUCATION" />
      </div>
    </AdminPage>
  );
}
