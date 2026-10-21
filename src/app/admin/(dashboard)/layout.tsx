import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth/guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminFallback } from "@/components/admin/fallback";

async function AuthGate({ children }: { children: React.ReactNode }) {
  // Real server-side authorization boundary (the proxy is only optimistic).
  await requireAdmin();
  return <>{children}</>;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<AdminFallback />}>
      <AuthGate>
        <AdminShell>{children}</AdminShell>
      </AuthGate>
    </Suspense>
  );
}
