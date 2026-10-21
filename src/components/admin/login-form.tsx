"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Field, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { loginAction, type LoginState } from "@/lib/actions/auth";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState | undefined, FormData>(
    loginAction,
    undefined
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 text-lg font-semibold text-content"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
            <Icon name="Sparkles" className="h-4 w-4" />
          </span>
          Mukti
        </Link>

        <div className="rounded-2xl border border-border-subtle bg-surface/70 p-7">
          <h1 className="text-xl font-semibold text-content">Admin sign in</h1>
          <p className="mt-1 text-sm text-muted">
            Sign in to manage your portfolio.
          </p>

          {state?.error ? (
            <div
              className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-3 py-2.5 text-sm text-red-400"
              role="alert"
            >
              <Icon name="CircleAlert" className="h-4 w-4" />
              {state.error}
            </div>
          ) : null}

          <form action={action} className="mt-5 space-y-4">
            <Field label="Email" htmlFor="email" required>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="admin@example.com"
              />
            </Field>
            <Field label="Password" htmlFor="password" required>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
              />
            </Field>
            <Button type="submit" className="w-full" variant="primary" size="lg" disabled={pending}>
              {pending ? "Signing in…" : "Sign in"}
              <Icon name="ArrowRight" className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted hover:text-content"
        >
          <Icon name="ArrowRight" className="h-4 w-4 rotate-180" />
          Back to site
        </Link>
      </div>
    </div>
  );
}
