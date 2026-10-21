import { prisma } from "@/lib/db";
import { AdminPage, PageHeader } from "@/components/admin/page";
import { ExperienceManager } from "@/components/admin/experience-manager";

const EXPERIENCE_KINDS = [
  "INTERNSHIP",
  "EMPLOYMENT",
  "CERTIFICATION",
  "TRAINING",
  "ACADEMIC_PROJECT",
  "ACHIEVEMENT",
];

export default async function AdminExperiencePage() {
  const items = await prisma.experience.findMany({
    where: { kind: { not: "EDUCATION" } },
    orderBy: [{ displayOrder: "asc" }, { startDate: "desc" }],
  });

  return (
    <AdminPage>
      <PageHeader
        title="Experience"
        description="Internships, employment, certifications, training, and achievements."
      />
      <div className="mt-8">
        <ExperienceManager items={items} kinds={EXPERIENCE_KINDS} defaultKind="EMPLOYMENT" />
      </div>
    </AdminPage>
  );
}
