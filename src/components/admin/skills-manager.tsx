"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Field, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ConfirmButton } from "@/components/ui/confirm-button";
import { Badge } from "@/components/ui/badge";
import {
  createSkill,
  updateSkill,
  deleteSkill,
  toggleSkillPublished,
} from "@/lib/actions/skills";

interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string;
  displayOrder: number;
  published: boolean;
}

const EMPTY = { name: "", category: "", icon: "Code2", displayOrder: 0, published: true };

export function SkillsManager({ skills }: { skills: Skill[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [error, setError] = useState<string | null>(null);

  const startEdit = (s: Skill) => {
    setEditingId(s.id);
    setForm({ name: s.name, category: s.category, icon: s.icon, displayOrder: s.displayOrder, published: s.published });
    setError(null);
  };
  const reset = () => {
    setEditingId(null);
    setForm({ ...EMPTY });
    setError(null);
  };

  const submit = () => {
    setError(null);
    start(async () => {
      const res = editingId
        ? await updateSkill(editingId, form)
        : await createSkill(form);
      if (res.error) {
        setError(res.error);
        return;
      }
      reset();
      router.refresh();
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="rounded-2xl border border-border-subtle bg-surface/40 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-faint">
            {editingId ? "Edit skill" : "Add skill"}
          </h2>
          {error ? (
            <p className="mb-3 text-sm text-red-400" role="alert">{error}</p>
          ) : null}
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" required>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </Field>
              <Field label="Category" required>
                <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Frontend" />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Icon name" hint="e.g. Code2, Database, Flame">
                <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
              </Field>
              <Field label="Display order">
                <Input type="number" value={String(form.displayOrder)} onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) || 0 })} />
              </Field>
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-content">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="h-4 w-4 accent-accent"
              />
              Published
            </label>
            <div className="flex items-center gap-3">
              <Button onClick={submit} disabled={pending}>
                {pending ? "Saving…" : editingId ? "Update skill" : "Add skill"}
              </Button>
              {editingId ? (
                <Button variant="ghost" onClick={reset}>Cancel</Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        {skills.length === 0 ? (
          <p className="text-sm text-muted">No skills yet. Add your first skill on the left.</p>
        ) : (
          <ul className="space-y-2">
            {skills.map((s) => (
              <li key={s.id} className="flex items-center justify-between rounded-xl border border-border-subtle bg-surface/40 p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/12 text-accent">
                    <Icon name={s.icon} className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-content">{s.name}</p>
                    <p className="text-xs text-faint">{s.category} · order {s.displayOrder}</p>
                  </div>
                  {s.published ? <Badge tone="success">Published</Badge> : <Badge>Hidden</Badge>}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() =>
                      start(async () => {
                        await toggleSkillPublished(s.id, !s.published);
                        router.refresh();
                      })
                    }
                    className="rounded-md px-2 py-1 text-xs text-muted hover:text-content"
                  >
                    {s.published ? "Hide" : "Publish"}
                  </button>
                  <button
                    type="button"
                    onClick={() => startEdit(s)}
                    className="rounded-md p-1.5 text-muted hover:text-content"
                    aria-label="Edit"
                  >
                    <Icon name="Pencil" className="h-4 w-4" />
                  </button>
                  <ConfirmButton
                    confirmLabel="Delete"
                    onConfirm={async () => {
                      const res = await deleteSkill(s.id);
                      if (!res.error) router.refresh();
                      return res;
                    }}
                    successMessage="Deleted"
                    className="text-red-400 hover:bg-red-500/10"
                  >
                    <Icon name="Trash2" className="h-4 w-4" />
                  </ConfirmButton>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
