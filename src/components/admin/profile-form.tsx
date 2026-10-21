"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { updateProfile } from "@/lib/actions/profile";
import type { ProfileInput } from "@/lib/validation/schemas";

interface ProfileInitial {
  name: string;
  title: string | null;
  eyebrow: string | null;
  heroHeadline: string | null;
  heroDescription: string | null;
  bio: string | null;
  interests: string | null;
  approach: string | null;
  learningGoals: string | null;
  ambitions: string | null;
  education: string | null;
  publicEmail: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  isAvailable: boolean;
  aboutVisible: boolean;
  cvVisible: boolean;
  profileImageId: string | null;
  cvFileId: string | null;
}

interface MediaOption {
  id: string;
  originalName: string | null;
}

export function ProfileForm({
  profile,
  mediaImages,
  mediaDocs,
}: {
  profile: ProfileInitial;
  mediaImages: MediaOption[];
  mediaDocs: MediaOption[];
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<ProfileInput>({
    name: profile.name,
    title: profile.title ?? "",
    eyebrow: profile.eyebrow ?? "",
    heroHeadline: profile.heroHeadline ?? "",
    heroDescription: profile.heroDescription ?? "",
    bio: profile.bio ?? "",
    interests: profile.interests ?? "",
    approach: profile.approach ?? "",
    learningGoals: profile.learningGoals ?? "",
    ambitions: profile.ambitions ?? "",
    education: profile.education ?? "",
    publicEmail: profile.publicEmail ?? "",
    githubUrl: profile.githubUrl ?? "",
    linkedinUrl: profile.linkedinUrl ?? "",
    otherLinks: undefined,
    isAvailable: profile.isAvailable,
    aboutVisible: profile.aboutVisible,
    cvVisible: profile.cvVisible,
    profileImageId: profile.profileImageId,
    cvFileId: profile.cvFileId,
  });

  const update = <K extends keyof ProfileInput>(k: K, v: ProfileInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    setError(null);
    setSaved(false);
    start(async () => {
      const res = await updateProfile(form);
      if (res.error) {
        setError(res.error);
        return;
      }
      setSaved(true);
      router.refresh();
    });
  };

  return (
    <div className="max-w-3xl space-y-8">
      {saved ? (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-400">
          <Icon name="CheckCircle2" className="h-4 w-4" /> Profile saved.
        </div>
      ) : null}
      {error ? (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400" role="alert">
          <Icon name="CircleAlert" className="h-4 w-4" /> {error}
        </div>
      ) : null}

      <Section title="Identity">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name"><Input value={form.name} onChange={(e) => update("name", e.target.value)} /></Field>
          <Field label="Professional title"><Input value={form.title ?? ""} onChange={(e) => update("title", e.target.value)} /></Field>
        </div>
        <Field label="Eyebrow text"><Input value={form.eyebrow ?? ""} onChange={(e) => update("eyebrow", e.target.value)} /></Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Public email"><Input type="email" value={form.publicEmail ?? ""} onChange={(e) => update("publicEmail", e.target.value)} /></Field>
          <Field label="LinkedIn URL"><Input value={form.linkedinUrl ?? ""} onChange={(e) => update("linkedinUrl", e.target.value)} /></Field>
        </div>
        <Field label="GitHub URL"><Input value={form.githubUrl ?? ""} onChange={(e) => update("githubUrl", e.target.value)} /></Field>
      </Section>

      <Section title="Hero">
        <Field label="Hero headline"><Input value={form.heroHeadline ?? ""} onChange={(e) => update("heroHeadline", e.target.value)} /></Field>
        <Field label="Hero description"><Textarea rows={3} value={form.heroDescription ?? ""} onChange={(e) => update("heroDescription", e.target.value)} /></Field>
        <div className="flex flex-wrap gap-6 pt-1">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-content">
            <input type="checkbox" checked={form.isAvailable} onChange={(e) => update("isAvailable", e.target.checked)} className="h-4 w-4 accent-accent" />
            Show "available for work" indicator
          </label>
        </div>
      </Section>

      <Section title="About">
        <Field label="Biography"><Textarea rows={5} value={form.bio ?? ""} onChange={(e) => update("bio", e.target.value)} /></Field>
        <Field label="Interests"><Textarea rows={2} value={form.interests ?? ""} onChange={(e) => update("interests", e.target.value)} /></Field>
        <Field label="Engineering approach"><Textarea rows={3} value={form.approach ?? ""} onChange={(e) => update("approach", e.target.value)} /></Field>
        <Field label="Learning goals"><Textarea rows={2} value={form.learningGoals ?? ""} onChange={(e) => update("learningGoals", e.target.value)} /></Field>
        <Field label="Ambitions"><Textarea rows={2} value={form.ambitions ?? ""} onChange={(e) => update("ambitions", e.target.value)} /></Field>
        <Field label="Education summary"><Textarea rows={2} value={form.education ?? ""} onChange={(e) => update("education", e.target.value)} /></Field>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-content">
          <input type="checkbox" checked={form.aboutVisible} onChange={(e) => update("aboutVisible", e.target.checked)} className="h-4 w-4 accent-accent" />
          Show About section publicly
        </label>
      </Section>

      <Section title="Profile image & CV">
        <Field label="Profile image" hint="Upload images in the Media library first">
          <Select value={form.profileImageId ?? ""} onChange={(e) => update("profileImageId", e.target.value || null)}>
            <option value="">No image</option>
            {mediaImages.map((m) => (
              <option key={m.id} value={m.id}>{m.originalName ?? m.id}</option>
            ))}
          </Select>
        </Field>
        <Field label="CV file" hint="Upload a PDF in the Media library first">
          <Select value={form.cvFileId ?? ""} onChange={(e) => update("cvFileId", e.target.value || null)}>
            <option value="">No CV</option>
            {mediaDocs.map((m) => (
              <option key={m.id} value={m.id}>{m.originalName ?? m.id}</option>
            ))}
          </Select>
        </Field>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-content">
          <input type="checkbox" checked={form.cvVisible} onChange={(e) => update("cvVisible", e.target.checked)} className="h-4 w-4 accent-accent" />
          Show "Download CV" button publicly (requires a CV file)
        </label>
      </Section>

      <div className="flex items-center justify-end gap-3 border-t border-border-subtle pt-6">
        <Button onClick={submit} disabled={pending}>
          {pending ? "Saving…" : "Save profile"}
          <Icon name="Save" className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border-subtle bg-surface/40 p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-faint">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
