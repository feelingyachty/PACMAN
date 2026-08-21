# Koray technique database

Queryable distillation of **Koray Tuğberk GÜBÜR** (aka “Corey Tongberg”) public Semantic SEO framework, mapped to **feelingyachty.com**.

| Asset | Path |
|-------|------|
| Technique DB (JSON) | `techniques.json` |
| SQLite mirror | `../../data/seo/koray_techniques.sqlite` |
| Source white papers | `../koray-framework/` |
| Skill pack | `../../skills/seo-corey-tongberg/` |
| Daily briefs | `../daily-updates/` |

## How Koray (this agent) uses it

1. Pick a technique (`T01`–`T16`) aligned to open audit tickets.
2. Check **operator locks** in `techniques.json` → `meta.operator_locks`.
3. Ship a daily brief under `docs/seo/daily-updates/`.
4. Only implement WordPress changes after `CHANGE_QUEUE` approval.

## Rebuild SQLite

```bash
python3 scripts/build-koray-technique-db.py
```
