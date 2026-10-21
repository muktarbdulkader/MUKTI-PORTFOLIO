import { prisma } from "@/lib/db";
import { AdminPage, PageHeader } from "@/components/admin/page";
import { SkillsManager } from "@/components/admin/skills-manager";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    select: { id: true, name: true, category: true, icon: true, displayOrder: true, published: true },
  });

  return (
    <AdminPage>
      <PageHeader
        title="Skills"
        description="Add, reorder, publish, and hide the technologies you know."
      />
      <div className="mt-8">
        <SkillsManager skills={skills} />
      </div>
    </AdminPage>
  );
}
