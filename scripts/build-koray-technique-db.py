#!/usr/bin/env python3
"""Build SQLite mirror of docs/seo/koray-technique-db/techniques.json"""
from __future__ import annotations

import json
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "docs/seo/koray-technique-db/techniques.json"
OUT = ROOT / "data/seo/koray_techniques.sqlite"


def main() -> None:
    data = json.loads(SRC.read_text())
    OUT.parent.mkdir(parents=True, exist_ok=True)
    if OUT.exists():
        OUT.unlink()
    con = sqlite3.connect(OUT)
    cur = con.cursor()
    cur.executescript(
        """
        CREATE TABLE meta (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL
        );
        CREATE TABLE pillars (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          summary TEXT NOT NULL,
          fy_use TEXT NOT NULL,
          formula_public TEXT
        );
        CREATE TABLE techniques (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          pillar TEXT NOT NULL,
          priority TEXT NOT NULL,
          fy_application TEXT NOT NULL,
          related_playbook TEXT,
          steps_json TEXT NOT NULL,
          audit_refs_json TEXT,
          FOREIGN KEY (pillar) REFERENCES pillars(id)
        );
        CREATE TABLE fy_entity_types (name TEXT PRIMARY KEY);
        CREATE TABLE fy_query_templates (template TEXT PRIMARY KEY);
        CREATE TABLE operator_locks (idx INTEGER PRIMARY KEY, lock_text TEXT NOT NULL);
        """
    )
    meta = data["meta"]
    for k, v in meta.items():
        if isinstance(v, (list, dict)):
            v = json.dumps(v)
        cur.execute("INSERT INTO meta(key, value) VALUES (?, ?)", (k, str(v)))
    for lock in meta.get("operator_locks", []):
        cur.execute("INSERT INTO operator_locks(lock_text) VALUES (?)", (lock,))
    for p in data["pillars"]:
        cur.execute(
            "INSERT INTO pillars(id, name, summary, fy_use, formula_public) VALUES (?,?,?,?,?)",
            (
                p["id"],
                p["name"],
                p["summary"],
                p["fy_use"],
                p.get("formula_public"),
            ),
        )
    for t in data["techniques"]:
        cur.execute(
            """INSERT INTO techniques(
                id, name, pillar, priority, fy_application, related_playbook,
                steps_json, audit_refs_json
            ) VALUES (?,?,?,?,?,?,?,?)""",
            (
                t["id"],
                t["name"],
                t["pillar"],
                t["priority"],
                t["fy_application"],
                t.get("related_playbook"),
                json.dumps(t.get("steps", [])),
                json.dumps(t.get("audit_refs", [])),
            ),
        )
    for name in data.get("fy_entity_types_core", []):
        cur.execute("INSERT INTO fy_entity_types(name) VALUES (?)", (name,))
    for tmpl in data.get("fy_query_templates", []):
        cur.execute("INSERT INTO fy_query_templates(template) VALUES (?)", (tmpl,))
    con.commit()
    n = cur.execute("SELECT COUNT(*) FROM techniques").fetchone()[0]
    con.close()
    print(f"Wrote {OUT} with {n} techniques")


if __name__ == "__main__":
    main()
