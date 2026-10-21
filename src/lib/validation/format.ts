/** Flatten Zod issues into a { field: message } map. */
export function mapZodErrors(
  issues: Array<{ path: (string | number)[]; message: string }>
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path.filter((p) => typeof p === "string").join(".");
    if (key && !out[key]) out[key] = issue.message;
    if (!key && !out._form) out._form = issue.message;
  }
  return out;
}

/** Return the first human-readable message from a Zod error. */
export function firstZodError(
  issues: Array<{ message: string }>
): string {
  return issues[0]?.message ?? "Invalid input.";
}
