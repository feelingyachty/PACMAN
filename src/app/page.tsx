import { Suspense } from "react";
import { DashboardBoard } from "@/components/DashboardBoard";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="panel rise rounded-2xl p-10 text-center text-[var(--muted)]">
          Loading command center…
        </div>
      }
    >
      <DashboardBoard />
    </Suspense>
  );
}
