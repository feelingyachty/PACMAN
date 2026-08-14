#!/usr/bin/env bash
# Log a study session into data/learning/ (index + digest).
# Usage:
#   scripts/log-learning.sh --agent pacman --topic seo --title "..." \
#     --summary "..." --why "..." [--url URL] [--source NAME] [--repo PATH] \
#     [--takeaway "..."] [--week YYYY-MM-DD]
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
exec node "$ROOT/scripts/log-learning.mjs" "$@"
