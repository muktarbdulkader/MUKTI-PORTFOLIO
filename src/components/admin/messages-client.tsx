"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { Input, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmButton } from "@/components/ui/confirm-button";
import { formatDate } from "@/lib/utils";
import {
  markMessageRead,
  archiveMessage,
  deleteMessage,
  replyToMessage,
} from "@/lib/actions/messages";

interface Message {
  id: string;
  name: string;
  email: string;
  inquiryType: string;
  subject: string;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  adminReply: string | null;
  createdAt: Date;
}

const INQUIRY_LABEL: Record<string, string> = {
  JOB_OR_INTERNSHIP: "Job / Internship",
  FREELANCE_PROJECT: "Freelance",
  COLLABORATION: "Collaboration",
  OTHER: "Other",
};

export function MessagesClient({ messages }: { messages: Message[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [selectedId, setSelectedId] = useState<string | null>(messages[0]?.id ?? null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"inbox" | "unread" | "archived">("inbox");
  const [reply, setReply] = useState("");

  const filtered = messages.filter((m) => {
    if (filter === "inbox" && m.isArchived) return false;
    if (filter === "archived" && !m.isArchived) return false;
    if (filter === "unread" && m.isRead) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q)
    );
  });

  const selected = messages.find((m) => m.id === selectedId) ?? null;

  const open = (m: Message) => {
    setSelectedId(m.id);
    setReply(m.adminReply ?? "");
    if (!m.isRead) {
      start(async () => {
        await markMessageRead(m.id, true);
        router.refresh();
      });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="mb-3 flex gap-2">
          <div className="relative flex-1">
            <Icon name="Search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages"
              className="pl-9"
            />
          </div>
        </div>
        <div className="mb-3 flex gap-1">
          {(["inbox", "unread", "archived"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-sm capitalize ${
                filter === f ? "bg-accent/12 text-accent" : "text-muted hover:text-content"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-xl border border-border-subtle bg-surface/40 p-6 text-sm text-muted">
            No messages.
          </p>
        ) : (
          <ul className="space-y-1.5">
            {filtered.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => open(m)}
                  className={`w-full rounded-xl border p-3 text-left transition-colors ${
                    selectedId === m.id
                      ? "border-accent/50 bg-accent/5"
                      : "border-border-subtle bg-surface/40 hover:border-border-subtle"
                  } ${!m.isRead ? "border-l-2 border-l-accent" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-content">{m.name}</span>
                    <span className="text-xs text-faint">{formatDate(m.createdAt)}</span>
                  </div>
                  <p className="mt-0.5 truncate text-sm text-content">{m.subject}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge>{INQUIRY_LABEL[m.inquiryType] ?? m.inquiryType}</Badge>
                    {m.isArchived ? <Badge tone="warning">Archived</Badge> : null}
                    {!m.isRead ? <Badge tone="accent">New</Badge> : null}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="lg:col-span-7">
        {selected ? (
          <div className="rounded-2xl border border-border-subtle bg-surface/40 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-content">{selected.subject}</h2>
                <p className="text-sm text-muted">
                  {selected.name} ·{" "}
                  <a href={`mailto:${selected.email}`} className="text-accent hover:underline">
                    {selected.email}
                  </a>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={pending}
                  onClick={() =>
                    start(async () => {
                      await markMessageRead(selected.id, !selected.isRead);
                      router.refresh();
                    })
                  }
                  className="rounded-md px-2 py-1 text-xs text-muted hover:text-content"
                >
                  Mark {selected.isRead ? "unread" : "read"}
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() =>
                    start(async () => {
                      await archiveMessage(selected.id, !selected.isArchived);
                      router.refresh();
                    })
                  }
                  className="rounded-md px-2 py-1 text-xs text-muted hover:text-content"
                >
                  {selected.isArchived ? "Unarchive" : "Archive"}
                </button>
                <ConfirmButton
                  confirmLabel="Delete"
                  onConfirm={async () => {
                    const res = await deleteMessage(selected.id);
                    if (!res.error) {
                      setSelectedId(null);
                      router.refresh();
                    }
                    return res;
                  }}
                  successMessage="Deleted"
                  className="text-red-400 hover:bg-red-500/10"
                >
                  Delete
                </ConfirmButton>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-border-subtle bg-canvas/40 p-4">
              <p className="whitespace-pre-wrap text-sm leading-7 text-content">
                {selected.message}
              </p>
            </div>

            <div className="mt-5">
              <label className="mb-1.5 block text-sm font-medium text-content">
                Reply (saved internally)
              </label>
              <Textarea
                rows={4}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Draft a reply to keep track of the conversation…"
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-faint">
                  To actually email the sender, use their address above.
                </span>
                <Button
                  disabled={pending}
                  onClick={() =>
                    start(async () => {
                      await replyToMessage({ id: selected.id, adminReply: reply });
                      router.refresh();
                    })
                  }
                >
                  Save reply
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-border-subtle p-10 text-sm text-muted">
            Select a message to read it.
          </div>
        )}
      </div>
    </div>
  );
}
