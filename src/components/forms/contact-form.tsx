"use client";

import { useActionState } from "react";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { submitContact, type ContactState } from "@/lib/actions/messages";

const INQUIRY_TYPES: Array<{ value: string; label: string }> = [
  { value: "JOB_OR_INTERNSHIP", label: "Job or Internship" },
  { value: "FREELANCE_PROJECT", label: "Freelance Project" },
  { value: "COLLABORATION", label: "Collaboration" },
  { value: "OTHER", label: "Other" },
];

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState | undefined, FormData>(
    submitContact,
    undefined
  );

  if (state?.ok) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-10 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <Icon name="CheckCircle2" className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-semibold text-content">Message received</h2>
        <p className="mt-2 max-w-md text-sm text-muted">
          Thanks for reaching out. I&apos;ll get back to you as soon as I can.
        </p>
        <Button
          variant="ghost"
          className="mt-6"
          onClick={() => window.location.reload()}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5" noValidate>
      {/* Honeypot: hidden from humans, bots tend to fill it */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state?.error ? (
        <div
          className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400"
          role="alert"
        >
          <Icon name="CircleAlert" className="h-4 w-4" />
          {state.error}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" required error={state?.fieldErrors?.name}>
          <Input id="name" name="name" required autoComplete="name" placeholder="Jane Doe" />
        </Field>
        <Field label="Email" htmlFor="email" required error={state?.fieldErrors?.email}>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@example.com"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Inquiry type" htmlFor="inquiryType" required>
          <Select id="inquiryType" name="inquiryType" required defaultValue="">
            <option value="" disabled>
              Select a type
            </option>
            {INQUIRY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Subject" htmlFor="subject" required error={state?.fieldErrors?.subject}>
          <Input id="subject" name="subject" required placeholder="Let's build something" />
        </Field>
      </div>

      <Field label="Message" htmlFor="message" required error={state?.fieldErrors?.message}>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell me about your project, role, or idea…"
        />
      </Field>

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-faint">
          Your message is stored securely and never shared.
        </p>
        <Button type="submit" variant="primary" size="lg" disabled={pending}>
          {pending ? "Sending…" : "Send message"}
          <Icon name="Send" className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
