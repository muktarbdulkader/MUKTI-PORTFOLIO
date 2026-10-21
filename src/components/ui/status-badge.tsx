import { Badge } from "./badge";

export type ProjectStatusValue = "DRAFT" | "PUBLISHED" | "UNPUBLISHED";

export function StatusBadge({ status }: { status: ProjectStatusValue }) {
  if (status === "PUBLISHED")
    return <Badge tone="success">Published</Badge>;
  if (status === "DRAFT") return <Badge tone="warning">Draft</Badge>;
  return <Badge tone="danger">Unpublished</Badge>;
}
