#!/usr/bin/env bash
# Helper: remind agents how to log learning.
# Usage docs only — entries are edited as JSON/MD in data/learning/
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
echo "Learning archive: $ROOT/data/learning"
echo "1) Add an object to data/learning/index.json"
echo "2) Append a bullet to data/learning/digests/{agentId}/{weekOf}.md"
echo "3) weekOf = Monday YYYY-MM-DD of the study week"
echo "4) Commit so Fernando can read history in git + /learning UI"
ls -la "$ROOT/data/learning/digests" 2>/dev/null || true
