"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createLog, deleteTask, fetchStore, patchTask } from "@/lib/client";
import type { Agent, StoreData, Task, TaskStatus } from "@/lib/types";

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
    reject: (id: string, reason = "Needs revision") =>
      runAction(id, { action: "reject", reason }),
    submitVerification: (id: string, implementationNotes?: string) =>
      runAction(id, {
        action: "submit_verification",
        implementationNotes:
          implementationNotes || "Agent marked implementation complete.",
      }),
    verify: (id: string, ok: boolean, verificationNotes?: string) =>
      runAction(id, {
        action: "verify",
        ok,
        verificationNotes:
          verificationNotes ||
          (ok
            ? "Pacman verified live change matches proposal."
            : "Verification failed — send back for rework."),
      }),
    move: (id: string, status: TaskStatus) =>
      runAction(id, { action: "status", status }),
    addNote: async (task: Task, title: string, body: string) => {
      setBusyId(task.id);
      try {
        await createLog({
          agentId: task.agentId,
          taskId: task.id,
          kind: "note",
          title,
          body,
        });
        await reload();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Note failed");
      } finally {
        setBusyId(null);
      }
    },
    remove: async (id: string) => {
      setBusyId(id);
      try {
        await deleteTask(id);
        setSelected(null);
        await reload();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Remove failed");
      } finally {
        setBusyId(null);
      }
    },
  };
}
