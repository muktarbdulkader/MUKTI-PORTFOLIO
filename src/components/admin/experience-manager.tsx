"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ConfirmButton } from "@/components/ui/confirm-button";
import { Badge } from "@/components/ui/badge";
import {
  createExperience,
  updateExperience,
  deleteExperience,
} from "@/lib/actions/experience";

interface ExperienceItem {
  id: string;
  kind: string;
  title: string;
  organization: string | null;
  description: string | null;
  startDate: Date | null;
  endDate: Date | null;
  current: boolean;
  displayOrder: number;
  published: boolean;
}

const KIND_LABEL: Record<string, string> = {
  EDUCATION: "Education",
  INTERNSHIP: "Internship",
  EMPLOYMENT: "Employment",
  CERTIFICATION: "Certification",
  TRAINING: "Training",
  ACADEMIC_PROJECT: "Academic project",
  ACHIEVEMENT: "Achievement",
};

function toInputDate(d: Date | null | undefined): string {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toISOString().slice(0, 10);
}

export function ExperienceManager({
  items,
  kinds,
  defaultKind,
}: {
  items: ExperienceItem[];
  kinds: string[];
  defaultKind: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    kind: defaultKind,
    title: "",
    organization: "",
    description: "",
    startDate: "",
    endDate: "",
    current: false,
    displayOrder: 0,
    published: true,
  });

  const startEdit = (it: ExperienceItem) => {
    setEditingId(it.id);
    setForm({
      kind: it.kind,
      title: it.title,
      organization: it.organization ?? "",
      description: it.description ?? "",
      startDate: toInputDate(it.startDate),
      endDate: toInputDate(it.endDate),
      current: it.current,
      displayOrder: it.displayOrder,
      published: it.published,
    });
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const reset = () => {
    setEditingId(null);
    setForm({
      kind: defaultKind,
      title: "",
      organization: "",
      description: "",
      startDate: "",
      endDate: "",
      current: false,
      displayOrder: 0,
      published: true,
    });
    setError(null);
  };

  const submit = () => {
    setError(null);
    start(async () => {
      const res = editingId ? await updateExperience(editingId, form) : await createExperience(form);
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
            {editingId ? "Edit record" : "Add record"}
          </h2>
          {error ? <p className="mb-3 text-sm text-red-400" role="alert">{error}</p> : null}
          <div className="space-y-4">
            <Field label="Type" required>
              <Select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })}>
                {kinds.map((k) => (
                  <option key={k} value={k}>{KIND_LABEL[k] ?? k}</option>
                ))}
              </Select>
            </Field>
            <Field label="Title" required>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </Field>
            <Field label="Organization / Institution">
              <Input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} />
            </Field>
            <Field label="Description">
              <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Start date"><Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} /></Field>
              <Field label="End date"><Input type="date" value={form.endDate} disabled={form.current} onChange={(e) => setForm({ ...form, endDate: e.target.value })} /></Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Display order"><Input type="number" value={String(form.displayOrder)} onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) || 0 })} /></Field>
              <label className="flex cursor-pointer items-center gap-2 pt-6 text-sm text-content">
                <input type="checkbox" checked={form.current} onChange={(e) => setForm({ ...form, current: e.target.checked })} className="h-4 w-4 accent-accent" />
                Current
              </label>
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-content">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="h-4 w-4 accent-accent" />
              Published
            </label>
            <div className="flex items-center gap-3">
              <Button onClick={submit} disabled={pending}>
                {pending ? "Saving…" : editingId ? "Update record" : "Add record"}
              </Button>
              {editingId ? <Button variant="ghost" onClick={reset}>Cancel</Button> : null}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        {items.length === 0 ? (
          <p className="text-sm text-muted">No records yet.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((it) => (
              <li key={it.id} className="flex items-start justify-between rounded-xl border border-border-subtle bg-surface/40 p-4">
                <div>
                  <p className="text-sm font-medium text-content">{it.title}</p>
                  <p className="text-xs text-faint">
                    {KIND_LABEL[it.kind] ?? it.kind}
                    {it.organization ? ` · ${it.organization}` : ""}
                    {it.startDate ? ` · ${toInputDate(it.startDate)}` : ""}
                    {it.current ? " — Present" : it.endDate ? ` — ${toInputDate(it.endDate)}` : ""}
                  </p>
                  {it.published ? <Badge tone="success">Published</Badge> : <Badge>Hidden</Badge>}
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => startEdit(it)} className="rounded-md p-1.5 text-muted hover:text-content" aria-label="Edit">
                    <Icon name="Pencil" className="h-4 w-4" />
                  </button>
                  <ConfirmButton
                    confirmLabel="Delete"
                    onConfirm={async () => {
                      const res = await deleteExperience(it.id);
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
