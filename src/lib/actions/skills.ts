"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guard";
import { skillSchema, type SkillInput } from "@/lib/validation/schemas";

export type SkillResult = { ok?: boolean; error?: string; fieldErrors?: Record<string, string> };

export async function createSkill(input: SkillInput): Promise<SkillResult> {
  await requireAdmin();
  const parsed = skillSchema.safeParse(input);
  if (!parsed.success) return { error: "Validation failed.", fieldErrors: mapErrors(parsed.error.issues) };
  try {
    await prisma.skill.create({ data: parsed.data });
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to create skill." };
  }
}

export async function updateSkill(id: string, input: SkillInput): Promise<SkillResult> {
  await requireAdmin();
  const parsed = skillSchema.safeParse(input);
  if (!parsed.success) return { error: "Validation failed.", fieldErrors: mapErrors(parsed.error.issues) };
  try {
    await prisma.skill.update({ where: { id }, data: parsed.data });
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to update skill." };
  }
}

export async function deleteSkill(id: string): Promise<{ ok?: boolean; error?: string }> {
  await requireAdmin();
  try {
    await prisma.skill.delete({ where: { id } });
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to delete skill." };
  }
}

export async function toggleSkillPublished(id: string, published: boolean): Promise<{ ok?: boolean; error?: string }> {
  await requireAdmin();
  try {
    await prisma.skill.update({ where: { id }, data: { published } });
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to update skill." };
  }
}

function mapErrors(issues: Array<{ path: (string | number)[]; message: string }>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path.filter((p) => typeof p === "string").join(".");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
