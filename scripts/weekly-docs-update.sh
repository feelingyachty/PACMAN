#!/usr/bin/env bash
# Refresh WordPress, Elementor, and GoHighLevel documentation mirrors.
# Intended to run every Monday (America/Bogota morning / 14:00 UTC).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

export PATH="${HOME}/.npm-global/bin:${PATH}"

if ! command -v firecrawl >/dev/null 2>&1; then
  echo "Installing firecrawl-cli to ~/.npm-global ..."
  mkdir -p "${HOME}/.npm-global"
  npm config set prefix "${HOME}/.npm-global"
  npm install -g firecrawl-cli
fi

mkdir -p \
  docs/wordpress/official \
  docs/elementor/official \
  docs/ghl/official \
  .firecrawl \
  docs/ops

STAMP="$(date -u +%Y-%m-%dT%H:%MZ)"
LOG="docs/ops/CHANGELOG_UPDATES.md"

echo "## ${STAMP} — automated docs refresh" >> "$LOG"
echo "" >> "$LOG"

scrape_batch() {
  local dest="$1"; shift
  echo "Scraping $# URLs → ${dest}"
  firecrawl scrape "$@" --only-main-content
  # Copy newest matching markdown into destination
  shopt -s nullglob
  for f in .firecrawl/*.md; do
    base="$(basename "$f")"
    case "$base" in
      developer.wordpress.org*|wordpress.org*|wp-*)
        [[ "$dest" == docs/wordpress/official ]] && cp "$f" "$dest/" ;;
      developers.elementor.com*|elementor.com*)
        [[ "$dest" == docs/elementor/official ]] && cp "$f" "$dest/" ;;
      marketplace.gohighlevel.com*|highlevel.stoplight.io*|help.gohighlevel.com*|gohighlevel.com*|ideas.gohighlevel.com*)
        [[ "$dest" == docs/ghl/official ]] && cp "$f" "$dest/" ;;
    esac
  done
  shopt -u nullglob
}

# --- WordPress ---
scrape_batch docs/wordpress/official \
  "https://developer.wordpress.org/rest-api/" \
  "https://developer.wordpress.org/rest-api/reference/" \
  "https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/" \
  "https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/" \
  "https://developer.wordpress.org/themes/getting-started/" \
  "https://developer.wordpress.org/themes/basics/template-hierarchy/" \
  "https://developer.wordpress.org/plugins/plugin-basics/" \
  "https://developer.wordpress.org/plugins/hooks/" \
  "https://developer.wordpress.org/block-editor/" \
  "https://developer.wordpress.org/coding-standards/wordpress-coding-standards/" \
  "https://developer.wordpress.org/advanced-administration/wordpress/wp-config/" \
  "https://wordpress.org/documentation/article/wordpress-features/" \
  "https://wordpress.org/documentation/article/roles-and-capabilities/" \
  "https://wordpress.org/news/category/releases/"

# --- Elementor ---
scrape_batch docs/elementor/official \
  "https://developers.elementor.com/" \
  "https://developers.elementor.com/docs/" \
  "https://developers.elementor.com/docs/getting-started/" \
  "https://developers.elementor.com/docs/widgets/" \
  "https://developers.elementor.com/docs/hooks/" \
  "https://developers.elementor.com/docs/forms/" \
  "https://developers.elementor.com/docs/cli/" \
  "https://developers.elementor.com/docs/themes/" \
  "https://developers.elementor.com/docs/managers/" \
  "https://developers.elementor.com/docs/data-structure/" \
  "https://elementor.com/help/what-is-elementor/" \
  "https://elementor.com/help/elementor-editor/" \
  "https://elementor.com/help/elementor-flexbox-container/" \
  "https://elementor.com/blog/"

# --- GoHighLevel ---
scrape_batch docs/ghl/official \
  "https://marketplace.gohighlevel.com/docs/" \
  "https://highlevel.stoplight.io/docs/integrations/" \
  "https://highlevel.stoplight.io/docs/integrations/0443d7d1a4bd0-overview" \
  "https://highlevel.stoplight.io/docs/integrations/a172766c45bc8-contacts-api" \
  "https://highlevel.stoplight.io/docs/integrations/d0eb01c6aee47-opportunities-api" \
  "https://highlevel.stoplight.io/docs/integrations/4c8362223c17b-conversations-api" \
  "https://highlevel.stoplight.io/docs/integrations/00dec82fc79eb-location-api" \
  "https://highlevel.stoplight.io/docs/integrations/afbfa189de80b-custom-values" \
  "https://highlevel.stoplight.io/docs/integrations/00a65ed3ee360-oauth2-0" \
  "https://highlevel.stoplight.io/docs/integrations/1a1f4545cdc69-get-calendars" \
  "https://help.gohighlevel.com/support/home" \
  "https://www.gohighlevel.com/blog" \
  "https://ideas.gohighlevel.com/"

{
  echo "- WordPress pages: $(ls docs/wordpress/official | wc -l)"
  echo "- Elementor pages: $(ls docs/elementor/official | wc -l)"
  echo "- GHL pages: $(ls docs/ghl/official | wc -l)"
  echo "- Tip: with FIRECRAWL_API_KEY set, prefer \`firecrawl monitor\` for change alerts."
  echo ""
} >> "$LOG"

node "$ROOT/scripts/ensure-learning-week.mjs"

echo "Refresh complete at ${STAMP}"
echo "Review git diff and commit meaningful updates."
echo "Then log this week's study: scripts/log-learning.sh --agent pacman --topic seo ..."
