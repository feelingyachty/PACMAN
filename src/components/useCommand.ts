"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchStore, patchTask } from "@/lib/client";
import type { Agent, StoreData, Task } from "@/lib/types";

export function useCommand() {
  const [store, setStore] = useState<StoreData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Task | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      const data = await fetchStore();
      setStore(data);
      setError(null);
      setSelected((current) =>
        current ? (data.tasks.find((t) => t.id === current.id) ?? null) : null,
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Load failed");
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const agentsById = useMemo(() => {
    const map = new Map<string, Agent>();
    store?.agents.forEach((a) => map.set(a.id, a));
    return map;
  }, [store]);

  async function runAction(taskId: string, body: Record<string, unknown>) {
    setBusyId(taskId);
    try {
      await patchTask(taskId, body);
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Action failed");
    } finally {
      setBusyId(null);
    }
  }

  return {
    store,
    error,
    selected,
    setSelected,
    busyId,
    agentsById,
    reload,
    runAction,
    approve: (id: string) => runAction(id, { action: "approve" }),
    reject: (id: string) =>
      runAction(id, { action: "reject", reason: "Needs revision" }),
    submitVerification: (id: string) =>
      runAction(id, {
        action: "submit_verification",
        implementationNotes: "Agent marked implementation complete.",
      }),
    verify: (id: string, ok: boolean) =>
      runAction(id, {
        action: "verify",
        ok,
        verificationNotes: ok
          ? "Pacman verified live change matches proposal."
          : "Verification failed — send back for rework.",
      }),
  };
}
