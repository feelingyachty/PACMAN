import { Suspense } from "react";
import LearningClient from "./LearningClient";

export default function LearningPage() {
  return (
    <Suspense
      fallback={
        <div className="panel rise rounded-2xl p-10 text-center text-[var(--muted)]">
          Loading learning log…
        </div>
      }
    >
      <LearningClient />
    </Suspense>
  );
}
