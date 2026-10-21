"use client";

import { useState, useTransition, type ReactNode } from "react";
import { Button, type ButtonProps } from "./button";

/**
 * A button that asks for confirmation before running an async server action.
 * Useful for destructive operations (delete, unpublish).
 */
export function ConfirmButton({
  children,
  confirmLabel,
  message,
  onConfirm,
  successMessage,
  ...props
}: {
  children: ReactNode;
  confirmLabel: string;
  message?: string;
  onConfirm: () => Promise<{ ok?: boolean; error?: string } | void>;
  successMessage?: string;
} & Omit<ButtonProps, "onClick">) {
  const [pending, start] = useTransition();
  const [state, setState] = useState<{ mode: "idle" | "confirm" | "done" | "error"; msg?: string }>({
    mode: "idle",
  });

  if (state.mode === "confirm") {
    return (
      <span className="inline-flex items-center gap-2">
        <Button
          size="sm"
          variant="danger"
          disabled={pending}
          onClick={() => {
            start(async () => {
              const res = await onConfirm();
              if (res && res.error) {
                setState({ mode: "error", msg: res.error });
                return;
              }
              setState({ mode: "done", msg: successMessage });
            });
          }}
        >
          {pending ? "Working…" : confirmLabel}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          disabled={pending}
          onClick={() => setState({ mode: "idle" })}
        >
          Cancel
        </Button>
        {state.mode === "error" ? (
          <span className="text-xs text-red-400">{state.msg}</span>
        ) : null}
      </span>
    );
  }

  if (state.mode === "done") {
    return <span className="text-xs text-emerald-400">{state.msg ?? "Done"}</span>;
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => setState({ mode: "confirm" })}
      {...props}
    >
      {children}
    </Button>
  );
}
