"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Select, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { ConfirmButton } from "@/components/ui/confirm-button";
import { uploadMedia, deleteMedia } from "@/lib/actions/media";

interface MediaItem {
  id: string;
  url: string;
  originalName: string | null;
  mimeType: string;
  size: number;
  category: string;
  isPublic: boolean;
  createdAt: Date;
}

const CATEGORIES = [
  { value: "PROJECT_THUMBNAIL", label: "Project thumbnail" },
  { value: "PROJECT_SCREENSHOT", label: "Project screenshot" },
  { value: "PROFILE", label: "Profile image" },
  { value: "SOCIAL", label: "Social image" },
  { value: "CV", label: "CV (private PDF)" },
  { value: "MISC", label: "Other" },
];

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function MediaManager({ media }: { media: MediaItem[] }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("PROJECT_SCREENSHOT");
  const [isPublic, setIsPublic] = useState(true);

  const isCV = category === "CV";

  const onUpload = () => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Choose a file first.");
      return;
    }
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("category", category);
    fd.append("isPublic", String(!isCV && isPublic));
    start(async () => {
      const res = await uploadMedia(fd);
      if (res.error) {
        setError(res.error);
        return;
      }
      if (fileRef.current) fileRef.current.value = "";
      router.refresh();
    });
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border-subtle bg-surface/40 p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-faint">Upload</h2>
        {error ? (
          <p className="mb-3 text-sm text-red-400" role="alert">{error}</p>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-3 lg:col-span-1">
            <label className="mb-1.5 block text-sm font-medium text-content">File</label>
            <Input ref={fileRef as never} type="file" accept={isCV ? "application/pdf" : "image/*"} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-content">Category</label>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </Select>
          </div>
          <div className="flex items-end">
            {isCV ? (
              <p className="text-xs text-faint">CV files are private and served via a protected link.</p>
            ) : (
              <label className="flex cursor-pointer items-center gap-2 text-sm text-content">
                <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="h-4 w-4 accent-accent" />
                Public (served from /uploads)
              </label>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={onUpload} disabled={pending}>
            {pending ? "Uploading…" : "Upload"}
            <Icon name="Plus" className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-faint">Library</h2>
        {media.length === 0 ? (
          <p className="text-sm text-muted">No files yet.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {media.map((m) => (
              <li key={m.id} className="overflow-hidden rounded-2xl border border-border-subtle bg-surface/40">
                <div className="aspect-video bg-elevated">
                  {m.mimeType.startsWith("image/") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.url} alt={m.originalName ?? ""} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted">
                      <Icon name="FileText" className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-medium text-content">
                    {m.originalName ?? "Untitled"}
                  </p>
                  <p className="text-xs text-faint">{formatSize(m.size)} · {m.category}</p>
                  <div className="mt-2 flex items-center justify-between">
                    {m.isPublic ? <Badge tone="success">Public</Badge> : <Badge tone="warning">Private</Badge>}
                    <ConfirmButton
                      confirmLabel="Delete"
                      onConfirm={async () => {
                        const res = await deleteMedia(m.id);
                        if (!res.error) router.refresh();
                        return res;
                      }}
                      successMessage="Deleted"
                      className="text-red-400 hover:bg-red-500/10"
                    >
                      <Icon name="Trash2" className="h-4 w-4" />
                    </ConfirmButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
