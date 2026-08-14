#!/usr/bin/env python3
"""
Feeling Yachty — page-by-page SEO audit workbook.

Every sitemap URL gets a row. Issues and change tickets are separate
so Fernando can approve work without drowning in 1,721 identical notes.
"""

from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote

from openpyxl import Workbook
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.worksheet.table import Table, TableStyleInfo
from openpyxl.chart import BarChart, Reference

SITEMAP_DIR = Path("/tmp/fy-audit/sitemaps/.firecrawl")
PAGES_DIR = Path("/tmp/fy-audit/pages/.firecrawl")
OUT = Path("/workspace/docs/seo/audits/Feeling-Yachty-SEO-Page-Audit-Approval.xlsx")
JSON_OUT = Path("/workspace/docs/seo/audits/page-audit-data.json")

NAVY = "14160F"
GOLD = "F5C518"
PAPER = "FFF6D8"
RED = "F4C7C3"
AMBER = "FCE8B2"
GREEN = "C6E5B3"
BLUE = "D6E3F8"
GREY = "EEEEEE"

APPROVE_OPTS = '"Pending,Approve,Reject,Hold,Done"'
PRIORITY_OPTS = '"P0-Critical,P1-High,P2-Medium,P3-Low"'
ROLE_OPTS = '"Owner,Support,Duplicate,Prune-noindex,Utility-noindex,ES-twin,Needs-rewrite,Keep-as-is,Ops-fact-needed"'

OWNER = {
    "brand": "https://feelingyachty.com/",
    "miami_head": "https://feelingyachty.com/miami-yacht-rental/",
    "panama_head": "https://feelingyachty.com/panama-yacht-rentals/",
    "contact": "https://feelingyachty.com/contact-feeling-yachty/",
    "crew": "https://feelingyachty.com/feeling-yachty-crew/",
    "reviews": "https://feelingyachty.com/feeling-yachty-reviews/",
    "pink": "https://feelingyachty.com/miami-pink-yacht-rentals/",
    "party": "https://feelingyachty.com/miami-yacht-party/",
    "ftl": "https://feelingyachty.com/fort-lauderdale-yacht-rentals/",
    "book": "https://feelingyachty.com/book/",
}


def norm(url: str) -> str:
    u = unquote(url.strip()).split("#")[0].split("?")[0]
    if u.endswith("/") and u != "https://feelingyachty.com/":
        # keep trailing slash style as stored
        pass
    return u.rstrip() if u != "https://feelingyachty.com/" else "https://feelingyachty.com/"


def path_of(url: str) -> str:
    return urlparse(url).path or "/"


def parse_sitemaps() -> list[dict]:
    rows = []
    seen = {}
    for f in sorted(SITEMAP_DIR.glob("*")):
        text = f.read_text(errors="replace")
        blocks = re.findall(r"<url>(.*?)</url>", text, flags=re.S)
        if not blocks:
            # index
            continue
        for block in blocks:
            locs = re.findall(r"<loc>\s*(https://feelingyachty\.com[^<]+)\s*</loc>", block)
            if not locs:
                continue
            loc = locs[0].strip()
            if loc.endswith(".xml"):
                continue
            lastmod = ""
            m = re.search(r"<lastmod>\s*([^<]+)\s*</lastmod>", block)
            if m:
                lastmod = m.group(1).strip()
            rec = {
                "url": loc,
                "lastmod": lastmod,
                "sitemap": f.name.replace("feelingyachty.com-", "").replace(".md", ""),
            }
            key = loc
            if key not in seen:
                seen[key] = rec
                rows.append(rec)
            else:
                # keep earliest sitemap name, append
                if rec["sitemap"] not in seen[key]["sitemap"]:
                    seen[key]["sitemap"] += " | " + rec["sitemap"]
    return rows


def classify(url: str) -> dict:
    p = path_of(url).lower()
    es = p.startswith("/es/") or p == "/es/"
    work = p[3:] if p.startswith("/es/") else p
    folder = [x for x in work.split("/") if x]
    top = folder[0] if folder else ""

    page_type = "other"
    cluster = "unassigned"
    role = "Needs-rewrite"
    owner = OWNER["miami_head"]
    priority = "P2-Medium"
    suggested = ""
    flags = []

    if p in ("/",):
        page_type, cluster, role, owner, priority = (
            "homepage-miami-ranker",
            "miami-head (homepage owns it)",
            "Owner",
            OWNER["brand"],
            "P3-Low",
        )
        suggested = "KEEP. Operator call 14 Aug 2026: homepage is the Miami ranker on purpose. Do not rewrite away from Miami Yacht Rental."
        flags.append("operator-keep-miami-home")
    elif p == "/es/" or p == "/es":
        page_type, cluster, role, owner, priority = (
            "homepage-es",
            "miami-head (homepage owns it)",
            "ES-twin",
            OWNER["brand"],
            "P3-Low",
        )
        suggested = "KEEP as Miami ES twin of the homepage ranker. Not a Panama roof."
        flags.append("operator-keep-miami-home")
    elif any(x in work for x in ("/cart", "/checkout", "/confirmed", "/login")) or top in {
        "cart",
        "checkout",
        "confirmed",
    }:
        page_type, cluster, role, owner, priority = (
            "utility",
            "non-index",
            "Utility-noindex",
            OWNER["book"],
            "P0-Critical",
        )
        suggested = "noindex + remove from sitemap. Keep functional."
        flags.append("utility-indexed")
    elif (
        "test" in work
        or top in {"test", "test-page", "12-2", "elementor-52093", "3-party-form"}
        or work.endswith("/test/")
        or "/test-" in work
        or work.endswith("-test/")
    ):
        page_type, cluster, role, owner, priority = (
            "test-junk",
            "non-index",
            "Prune-noindex",
            OWNER["brand"],
            "P0-Critical",
        )
        suggested = "noindex, remove from sitemap, draft/trash in WP."
        flags.append("test-or-leftover")
    elif top in {"privacy-policy", "boat-tos", "charter-agreement"}:
        page_type, cluster, role, owner, priority = (
            "legal",
            "identity",
            "Keep-as-is",
            url if not es else OWNER["contact"],
            "P3-Low",
        )
        suggested = "Keep. Confirm NAP/legal names match contact page."
    elif top in {"contact-feeling-yachty", "connect"}:
        page_type, cluster, role, owner, priority = (
            "identity-contact",
            "brand-contact",
            "Keep-as-is",
            OWNER["contact"],
            "P3-Low",
        )
        suggested = "KEEP. Operator call: Miami numbers vs Panama numbers are intentional. Do not 'fix' city-specific phones."
        flags.append("operator-phones-ok")
    elif top in {"feeling-yachty-crew", "yacht-safety-protocols"}:
        page_type, cluster, role, owner, priority = (
            "identity-trust",
            "brand-trust",
            "Keep-as-is",
            OWNER["crew"],
            "P2-Medium",
        )
        suggested = "KEEP. Review integers will move to shortcodes (operator). Do not block on phone or inclusions copy."
        flags.append("operator-reviews-shortcode")
    elif top in {"feeling-yachty-reviews", "reviews"}:
        page_type, cluster, role, owner, priority = (
            "identity-reviews",
            "brand-reviews",
            "Needs-rewrite" if top == "feeling-yachty-reviews" else "Owner",
            url if not es else OWNER["reviews"],
            "P1-High" if top == "feeling-yachty-reviews" else "P2-Medium",
        )
        suggested = (
            "Wire review counts to the new shortcode. On /feeling-yachty-reviews/: remove the Jet Ski H1 so this URL can rank as reviews, not jet skis."
            if top == "feeling-yachty-reviews"
            else "KEEP as its own reviews URL if you want it ranking. Wire the shortcode here too."
        )
        if top == "feeling-yachty-reviews":
            flags.append("wrong-h1-jetski")
        flags.append("operator-reviews-shortcode")
    elif top == "book":
        page_type, cluster, role, owner, priority = (
            "account-login",
            "convert",
            "Utility-noindex",
            OWNER["book"],
            "P1-High",
        )
        suggested = "Live scrape is the account/login hub. noindex if it is not meant to rank."
        flags.append("book-is-login")
    elif top == "miami-yacht-rental":
        page_type, cluster, role, owner, priority = (
            "money-hub",
            "miami-rental",
            "Owner",
            OWNER["miami_head"],
            "P3-Low",
        )
        suggested = "KEEP. Ranks as its own page. Homepage is the other Miami ranker — that is intentional."
        flags.append("operator-own-page")
    elif top == "miami-yacht-rentals":
        page_type, cluster, role, owner, priority = (
            "alias-collapse",
            "miami-rental",
            "Needs-rewrite",
            OWNER["miami_head"],
            "P1-High",
        )
        suggested = "Live URL resolves to /miami-yacht-rental/. If this slug should rank on its own, give it unique H1/content. If not, leave it as the alias."
        flags.append("url-collapses-to-rental")
    elif top in {
        "miami-yacht-charters",
        "miami-yacht-rentals-directory",
        "miami-yachts-booking",
        "luxury-yacht-rentals",
        "miami-mega-charter-rentals",
        "miami-superyacht-rentals",
    } or "feeling-yachty-2" in work:
        page_type, cluster, role, owner, priority = (
            "money-hub-own-query",
            f"miami-{top}",
            "Owner",
            f"https://feelingyachty.com/{top}/" if top and "feeling-yachty-2" not in work else url,
            "P2-Medium",
        )
        suggested = "KEEP as its own ranking URL (operator: every page/city ranks on its own). Make H1/first passage unique to this query — do not 301 into the homepage."
        flags.append("operator-own-page")
    elif top in {
        "cheap-yacht-rentals-miami",
        "affordable-yachts-rentals-miami",
        "yacht-specials",
        "miami-yacht-deals",
    }:
        collapsed = top in {"yacht-specials", "miami-yacht-deals"}
        page_type, cluster, role, owner, priority = (
            "money-hub-own-query",
            f"miami-{top}",
            "Needs-rewrite" if collapsed else "Owner",
            f"https://feelingyachty.com/{top}/",
            "P1-High" if collapsed else "P3-Low",
        )
        suggested = (
            "This URL currently resolves to the cheap-page template, so it is not ranking on its own. Give it unique H1/content for its query, or accept it as an alias."
            if collapsed
            else "KEEP as its own ranking URL. Hub/widget pricing is out of scope (operator)."
        )
        if collapsed:
            flags.append("url-collapses-to-cheap")
        else:
            flags.append("operator-own-page")
    elif top == "panama-yacht-rentals":
        page_type, cluster, role, owner, priority = (
            "money-hub",
            "panama-head",
            "Owner" if work.rstrip("/") == "/panama-yacht-rentals" else "Support",
            OWNER["panama_head"],
            "P3-Low" if work.rstrip("/") == "/panama-yacht-rentals" else "P2-Medium",
        )
        suggested = (
            "KEEP. Operator: this URL already ranks in Panama. Do not merge into the homepage."
            if work.rstrip("/") == "/panama-yacht-rentals"
            else "Panama child. Keep city facts on Panama — not Miami paste."
        )
        flags.append("operator-panama-ranks")
    elif top == "panama-yacht-sales":
        page_type, cluster, role, owner, priority = (
            "wrong-entity",
            "panama-sales vs miami-rental",
            "Needs-rewrite",
            OWNER["panama_head"],
            "P0-Critical",
        )
        suggested = "Live scrape is Miami rental/event-planning copy on a Panama sales slug. Rewrite as real sales or 301 to Panama owner."
        flags.append("slug-content-mismatch")
    elif top == "miami-yacht-destinations":
        page_type, cluster, role, owner, priority = (
            "wrong-entity",
            "list-your-boat",
            "Needs-rewrite",
            "https://feelingyachty.com/list-your-yacht/",
            "P0-Critical",
        )
        suggested = "Live scrape is 'List your boat', not destinations. Retitle/slug or 301 to /list-your-yacht/."
        flags.append("slug-content-mismatch")
    elif top == "fort-lauderdale-yacht-rentals" or top in {
        "ftlauderdale-charter",
        "ft-lauderdale-events",
    }:
        page_type, cluster, role, owner, priority = (
            "money-hub-ftl",
            "fort-lauderdale",
            "Needs-rewrite" if top == "fort-lauderdale-yacht-rentals" else "Support",
            OWNER["ftl"],
            "P0-Critical" if top == "fort-lauderdale-yacht-rentals" else "P1-High",
        )
        suggested = "Hub H1 conflict: Fort Lauderdale vs North Miami. Rewrite as true FTL/Haulover or demote into Miami location IA."
        flags.append("city-identity-conflict")
    elif top == "miami-pink-yacht-rentals" or top.startswith("miami-pink"):
        page_type, cluster, role, owner, priority = (
            "money-hub",
            "miami-pink",
            "Owner" if work.rstrip("/") == "/miami-pink-yacht-rentals" else "Support",
            OWNER["pink"],
            "P1-High",
        )
        suggested = "Keep pink hub. Listings support it. Do not dump the full 400-yacht grid here."
    elif top == "miami-yacht-party":
        page_type, cluster, role, owner, priority = (
            "occasion-hub",
            "miami-occasion-party",
            "Owner" if len(folder) == 1 else "Support",
            OWNER["party"],
            "P1-High",
        )
        suggested = "Occasion owner. H1 must not be the Miami head term. Bridge to /miami-yacht-rental/."
    elif top in {
        "20-person-yacht-rental-miami",
        "30-person-yacht-rental-miami",
        "50-person-yacht-rental-miami",
        "l00-person-yacht-rentals",
    }:
        typo = top.startswith("l00")
        page_type, cluster, role, owner, priority = (
            "capacity-modifier",
            "miami-capacity",
            "Needs-rewrite" if typo else "Owner",
            f"https://feelingyachty.com/{top}/",
            "P1-High" if typo else "P3-Low",
        )
        suggested = (
            "Fix slug /l00-person-yacht-rentals/ → 100-person so this URL can rank for 100-person groups."
            if typo
            else "KEEP as its own ranking URL (operator: every page ranks on its own). H1/first passage must stay on this party size."
        )
        if typo:
            flags.append("typo-slug")
        else:
            flags.append("operator-own-page")
    elif top in {"miami-yacht-tips", "miami-sailing-tips", "miami-yacht-rental-tips"}:
        page_type, cluster, role, owner, priority = (
            "outer-tip",
            "miami-outer-know",
            "Support",
            OWNER["miami_head"],
            "P2-Medium",
        )
        suggested = "Keep only if it closes an information gap and bridges to the Miami owner (birthday itinerary bar). Else noindex/prune."
        flags.append("auto-blog-risk")
        if "birthday-yacht-itinerary" in work:
            role, priority = "Support", "P2-Medium"
            suggested = "KEEP. Model outer node. KNOW owner for birthday itinerary."
            flags.append("keep-model-tip")
    elif top == "panama-yacht-tips":
        page_type, cluster, role, owner, priority = (
            "outer-tip",
            "panama-outer-know",
            "Support",
            OWNER["panama_head"],
            "P2-Medium",
        )
        suggested = "Same gate as Miami tips. Facts must be Panama (no Miami sandbar paste)."
        flags.append("auto-blog-risk")
    elif top == "fleet" and len(folder) >= 2 and folder[1] == "miami-catering":
        page_type, cluster, role, owner, priority = (
            "woo-catering-sku",
            "add-on-catering",
            "Prune-noindex" if any(x in work for x in ("panama", "ocean-phoenix", "parker-monaco")) else "Support",
            "https://feelingyachty.com/miami-catering/",
            "P1-High",
        )
        if any(x in work for x in ("ocean-phoenix", "parker-monaco", "panama")):
            suggested = "Panama vessel parked under /fleet/miami-catering/. Move to Panama fleet folder."
            flags.append("wrong-folder")
        else:
            suggested = "Product SKU. Prefer category hub + noindex thin SKUs if they dilute charter identity. Prices in slugs will rot."
            flags.append("sku-in-index")
    elif top == "fleet":
        page_type, cluster, role, owner, priority = (
            "vessel-listing",
            "miami-vessel" if "panama" not in work else "panama-vessel",
            "Support",
            OWNER["panama_head"] if "panama" in work else OWNER["miami_head"],
            "P1-High",
        )
        suggested = "Canonical listing pattern. 301 cheapest/mega/super copies of this vessel here (or vice versa if this is the thin copy)."
        flags.append("listing-needs-one-canonical")
    elif top == "cheapest-yacht-rentals":
        page_type, cluster, role, owner, priority = (
            "vessel-listing-duplicate",
            "miami-vessel",
            "Duplicate",
            OWNER["miami_head"],
            "P1-High",
        )
        suggested = "Likely a second URL for a /fleet/miami/ boat. 301 to the fleet canonical after matching slugs."
        flags.append("listing-duplicate-folder")
    elif top in {
        "miami-mega-yachts",
        "miami-super-yacht-rentals",
        "msy_rentals",
    } or top.startswith("miami-super"):
        is_hub = len(folder) == 1
        page_type, cluster, role, owner, priority = (
            "class-hub-or-listing",
            "miami-superyacht",
            "Owner" if is_hub else "Support",
            f"https://feelingyachty.com/{top}/",
            "P3-Low" if is_hub else "P2-Medium",
        )
        suggested = (
            "KEEP as its own class/query URL. Do not 301 into the Miami rental hub."
            if is_hub
            else "Listing under a class folder. Keep if this URL is meant to rank; 301 only if it is a thin copy of the same boat on /fleet/."
        )
        flags.append("operator-own-page" if is_hub else "listing-needs-one-canonical")
    elif top in {"miami-yacht-location", "miami-yacht-venue", "miami-yacht-services", "miami-water-sports", "miami-menus", "miami-sailboat", "miami-fishing-boats", "miami-breakfast", "miami-catering"}:
        page_type, cluster, role, owner, priority = (
            "attribute-or-addon",
            f"miami-{top}",
            "Support",
            OWNER["miami_head"],
            "P2-Medium",
        )
        suggested = "Valid if facts are unique and H1 is not the Miami head term. Bridge to owner."
    elif top in {
        "panama-yacht-services",
        "panama-tours",
        "event-services-panama",
        "yacht-maintenance-panama",
        "yacht-detailing-panama",
        "routine-yacht-cleaning-panama",
        "marine-ready-yacht-care-panama",
        "pre-trip-preparation-panama",
        "post-trip-preparation-panama",
        "recurring-yacht-care-plans-panama",
        "visual-condition-checks-panama",
        "maintenance-tips",
    }:
        page_type, cluster, role, owner, priority = (
            "panama-outer-or-ops",
            "panama-adjacent",
            "Ops-fact-needed",
            OWNER["panama_head"],
            "P2-Medium",
        )
        suggested = "Park unless ops truly sells this line. Thin care/maintenance nodes dilute charter source context."
        flags.append("roof-context-gate")
    elif top in {"category", "product-category", "product"}:
        page_type, cluster, role, owner, priority = (
            "taxonomy",
            "taxonomy",
            "Support",
            OWNER["miami_head"],
            "P2-Medium",
        )
        suggested = "Audit taxonomy for merged slugs (e.g. 75ft-89ftall-miami-yachtsmiami-beach-yachts). noindex thin cats."
    elif top == "list-your-yacht":
        page_type, cluster, role, owner, priority = (
            "ops-recruit",
            "supply",
            "Keep-as-is",
            url if not es else "https://feelingyachty.com/list-your-yacht/",
            "P3-Low",
        )
        suggested = "Supply-side page. Keep out of charter money clusters."
    elif es:
        page_type, cluster, role, owner, priority = (
            "spanish-twin",
            "inherit-en",
            "ES-twin",
            OWNER["miami_head"],
            "P1-High",
        )
        suggested = "Do not decide separately. Apply the approved EN action (301/noindex/rewrite) to this twin in the same change."
        flags.append("es-inherit")
    else:
        page_type, cluster, role, owner, priority = (
            "other",
            "review",
            "Needs-rewrite",
            OWNER["brand"],
            "P2-Medium",
        )
        suggested = "Human review. Classify on map before writing more like it."

    if es and role != "ES-twin" and p != "/es/":
        role = "ES-twin"
        flags.append("es-inherit")
        suggested = "ES twin: apply the same approved action as the English URL. " + suggested
        priority = "P1-High" if priority.startswith("P0") else priority

    return {
        "page_type": page_type,
        "cluster": cluster,
        "role": role,
        "owner": owner,
        "priority": priority,
        "suggested": suggested,
        "flags": flags,
        "folder": top or "/",
        "language": "ES" if es or p == "/es/" else "EN",
    }


def extract_links_from_scrapes() -> tuple[dict[str, set[str]], dict[str, str]]:
    """page_url -> links; file stem guess -> first heading."""
    by_page: dict[str, set[str]] = defaultdict(set)
    titles: dict[str, str] = {}
    for f in PAGES_DIR.glob("*"):
        text = f.read_text(errors="replace")
        # canonical-ish from skip link
        m = re.search(r"https://feelingyachty\.com[^)\s\"]+", text[:800])
        page = m.group(0).split("#")[0] if m else ""
        if "Skip to content" in text or "Saltar" in text:
            m2 = re.search(r"\((https://feelingyachty\.com[^)]+)\)", text[:400])
            if m2:
                page = m2.group(1).split("#")[0]
        hm = re.search(r"^#\s+(.+)$", text, re.M)
        if page and hm:
            titles[page] = hm.group(1).strip()[:180]
        for href in re.findall(r"\((https?://[^)]+)\)", text):
            href = href.split()[0].rstrip(").,")
            if page:
                by_page[page].add(href)
        # json links format leftover
        if text.strip().startswith("{") or '"links"' in text[:200]:
            try:
                data = json.loads(text)
                for href in data.get("links") or []:
                    if page:
                        by_page[page].add(href)
            except Exception:
                pass
    return by_page, titles


def vessel_key(url: str) -> str:
    slug = path_of(url).rstrip("/").split("/")[-1]
    slug = re.sub(r"%[0-9a-fA-F]{2}", "", slug)
    slug = re.sub(r"[^a-z0-9]+", "-", slug.lower()).strip("-")
    # drop marketing tails
    slug = re.sub(r"-feeling-yachty.*$", "", slug)
    slug = re.sub(r"-luxury-yacht-charter.*$", "", slug)
    slug = re.sub(r"-yacht-rental.*$", "", slug)
    m = re.match(r"^(\d{2,3}ft-[a-z0-9-]+?)(?:-miami|-panama).*$", slug)
    if m:
        return m.group(1)[:48]
    return slug[:48]


def style_header(ws, row=1):
    fill = PatternFill("solid", fgColor=NAVY)
    font = Font(name="Calibri", bold=True, color=PAPER, size=10)
    for cell in ws[row]:
        cell.fill = fill
        cell.font = font
        cell.alignment = Alignment(vertical="center", wrap_text=True)
    ws.row_dimensions[row].height = 28
    ws.freeze_panes = "A2"
    ws.auto_filter.ref = ws.dimensions


def autosize(ws, widths: dict[int, int]):
    for i, w in widths.items():
        ws.column_dimensions[get_column_letter(i)].width = w


def fill_row(ws, r, values, fills=None):
    for i, v in enumerate(values, 1):
        cell = ws.cell(r, i, v)
        cell.font = Font(name="Calibri", size=10)
        cell.alignment = Alignment(vertical="center", wrap_text=True)
        if fills and i in fills:
            cell.fill = PatternFill("solid", fgColor=fills[i])


def add_dv(ws, formula, cells):
    dv = DataValidation(type="list", formula1=formula, allow_blank=True)
    ws.add_data_validation(dv)
    dv.add(cells)


def main():
    inventory = parse_sitemaps()
    existing = {r["url"].rstrip("/") for r in inventory}
    for loc, sm in (
        ("https://feelingyachty.com/yacht-specials/", "live-alias-not-in-sitemap"),
        ("https://feelingyachty.com/miami-yacht-deals/", "live-alias-not-in-sitemap"),
        ("https://feelingyachty.com/miami-yacht-rentals/", "live-alias-not-in-sitemap"),
    ):
        if loc.rstrip("/") not in existing:
            inventory.append({"url": loc, "lastmod": "", "sitemap": sm})
    sitemap_urls = {r["url"] for r in inventory}
    # also slash variants
    sitemap_loose = set(sitemap_urls)
    for u in list(sitemap_urls):
        sitemap_loose.add(u.rstrip("/") + "/")
        sitemap_loose.add(u.rstrip("/"))

    link_map, titles = extract_links_from_scrapes()
    scraped_urls = set(link_map) | set(titles)

    # vessel collisions
    vessels = defaultdict(list)
    for rec in inventory:
        p = path_of(rec["url"])
        if rec["url"].count("/") >= 5 or "/fleet/" in p or "/cheapest-yacht-rentals/" in p or "/miami-mega-yachts/" in p:
            if "/es/" in p:
                continue
            key = vessel_key(rec["url"])
            if key and re.search(r"\d{2}ft", key):
                vessels[key].append(rec["url"])
    multi_vessels = {k: v for k, v in vessels.items() if len(set(v)) > 1}

    issues = []
    issue_n = 0

    def add_issue(url, severity, category, detail, fix, change_id=""):
        nonlocal issue_n
        issue_n += 1
        issues.append(
            {
                "id": f"ISS-{issue_n:04d}",
                "url": url,
                "severity": severity,
                "category": category,
                "detail": detail,
                "fix": fix,
                "change_id": change_id,
                "approve": "Pending",
            }
        )

    # Operator-accepted items are logged once so they are not re-litigated.
    add_issue(
        "https://feelingyachty.com/",
        "Info",
        "Operator accepted",
        "Homepage H1 is Miami Yacht Rental because that URL is the main Miami ranker. Panama is a separate ranking URL.",
        "Do not rewrite the homepage away from Miami.",
        "OP-001",
    )
    add_issue(
        "https://feelingyachty.com/panama-yacht-rentals/",
        "Info",
        "Operator accepted",
        "Panama yacht rentals already ranks in Panama. It stays its own city page.",
        "Do not merge Panama into the homepage.",
        "OP-001",
    )
    add_issue(
        "SITEWIDE",
        "Info",
        "Operator accepted",
        "Miami vs Panama phone numbers are intentional. Hub/widget pricing is out of scope.",
        "Leave city phones and hub pricing alone.",
        "OP-002",
    )
    add_issue(
        "SITEWIDE",
        "Medium",
        "Reviews shortcode",
        "Review integers differ across templates because they were hard-coded while the brand grew. Operator will replace with shortcodes.",
        "Implement one review shortcode and drop it on every template that shows a count.",
        "CHG-011",
    )

    page_rows = []
    for rec in inventory:
        url = rec["url"]
        cls = classify(url)
        scraped = "Yes" if any(url.rstrip("/") == s.rstrip("/") for s in scraped_urls) else "No"
        title = ""
        for s, t in titles.items():
            if s.rstrip("/") == url.rstrip("/"):
                title = t
                break

        extra_flags = list(cls["flags"])
        extra_notes = []

        vk = vessel_key(url)
        if vk in multi_vessels and cls["page_type"] in {
            "vessel-listing",
            "vessel-listing-duplicate",
            "class-hub-or-listing",
        }:
            extra_flags.append("multi-url-vessel")
            others = [u for u in multi_vessels[vk] if u.rstrip("/") != url.rstrip("/")]
            extra_notes.append("Same vessel key also at: " + " | ".join(others[:4]))
            if cls["language"] == "EN":
                add_issue(
                    url,
                    "High",
                    "Cannibalization / listing",
                    f"Vessel key '{vk}' has {len(multi_vessels[vk])} URLs.",
                    "Keep one canonical (prefer /fleet/…). 301 the rest.",
                    "CHG-006",
                )

        if cls["language"] == "EN" and (
            cls["role"] in {"Duplicate", "Prune-noindex", "Utility-noindex", "Needs-rewrite"} or extra_flags
        ):
            if "test-or-leftover" in extra_flags:
                add_issue(url, "Critical", "Indexed junk", "Test/leftover URL is in the sitemap.", cls["suggested"], "CHG-004")
            if "utility-indexed" in extra_flags:
                add_issue(url, "Critical", "Indexed junk", "Cart/checkout/account URL is in the sitemap.", cls["suggested"], "CHG-004")
            if "url-collapses-to-cheap" in extra_flags or "url-collapses-to-rental" in extra_flags:
                add_issue(url, "High", "Not ranking on its own", "URL resolves to another template, so it cannot rank as its own page/city query.", cls["suggested"], "CHG-012")
            if "wrong-h1-jetski" in extra_flags:
                add_issue(url, "High", "Wrong entity", "Reviews URL carries a Jet Ski H1.", cls["suggested"], "CHG-007")
            if "slug-content-mismatch" in extra_flags:
                add_issue(url, "Critical", "Wrong entity", "Slug and live H1/job do not match — this URL cannot rank for the query on the slug.", cls["suggested"], "CHG-007")
            if "city-identity-conflict" in extra_flags and cls["page_type"] == "money-hub-ftl":
                add_issue(url, "High", "Wrong city", "Fort Lauderdale URL talks North Miami. If FTL is meant to rank as its own city, the H1/body must stay FTL.", cls["suggested"], "CHG-007")
            if "wrong-folder" in extra_flags:
                add_issue(url, "High", "IA / folder", "Panama asset under Miami catering folder.", cls["suggested"], "CHG-006")
            if "typo-slug" in extra_flags:
                add_issue(url, "High", "Slug typo", "l00-person should be 100-person if this page is meant to rank for 100-person groups.", cls["suggested"], "CHG-007")

        needs_change = "Yes" if cls["role"] not in {"Keep-as-is", "Owner"} or extra_flags else "Review"
        if cls["role"] == "Owner":
            needs_change = "Owner — protect / still may need copy fixes"
        if cls["role"] == "ES-twin":
            needs_change = "Yes — inherit EN"
        if cls["role"] == "Support" and "auto-blog-risk" in extra_flags and "keep-model-tip" not in extra_flags:
            needs_change = "Review — prune if thin"

        page_rows.append(
            {
                **rec,
                **cls,
                "scraped": scraped,
                "title": title,
                "flags": ", ".join(dict.fromkeys(extra_flags)),
                "notes": " ".join(extra_notes),
                "needs_change": needs_change,
                "approve": "Pending",
                "approver_notes": "",
            }
        )

    def clean_href(href: str) -> str:
        h = href.replace("\\", "").split("#")[0].split("?")[0].strip().rstrip(".,)")
        if h.endswith("/") and h != "https://feelingyachty.com/":
            return h
        if h.startswith("https://feelingyachty.com") and not h.endswith("/") and "." not in path_of(h).split("/")[-1]:
            return h + "/"
        return h

    sitemap_norm = {clean_href(u) for u in sitemap_urls}
    sitemap_norm |= {u.rstrip("/") for u in sitemap_norm}

    # broken / redirect-ish from scrapes
    link_issues = []
    alias_paths = {
        "/miami-yacht-rentals",
        "/miami-yacht-deals",
        "/yacht-specials",
        "/reviews",
        "/miami-yacht-rentals-directory",
    }
    for page, hrefs in link_map.items():
        for href in sorted(hrefs):
            if "feelingyachty.com" not in href:
                continue
            if "/wp-content/" in href or href.startswith("mailto:") or "youtube.com" in href:
                continue
            clean = clean_href(href)
            pth = path_of(clean).rstrip("/")
            in_map = clean in sitemap_norm or clean.rstrip("/") in sitemap_norm
            if pth in alias_paths:
                link_issues.append(
                    (
                        page,
                        clean,
                        "Redirect/alias",
                        "Alias or split URL. Link the approved owner instead.",
                    )
                )
                continue
            if in_map:
                continue
            if re.search(r"\.(jpg|jpeg|png|webp|gif|mp4|pdf|kml)$", clean, re.I):
                continue
            if "/cdn-cgi/" in clean or "tel:" in clean:
                continue
            link_issues.append(
                (
                    page,
                    clean,
                    "Not in sitemap",
                    "Linked internally but missing from sitemap_index. Confirm 200 vs 404 vs leftover.",
                )
            )

    # de-dupe link issues
    seen_li = set()
    for src, dest, kind, detail in link_issues:
        key = (dest, kind)
        if key in seen_li:
            continue
        seen_li.add(key)
        add_issue(dest, "High" if kind == "Redirect/alias" else "Medium", f"Link / {kind}", f"Linked from {src}. {detail}", "Point anchors to the approved owner URL. 301 alias if it must exist.", "CHG-008")

    changes = [
        ["OP-001", "Accepted", "Keep", "Homepage + Panama hub", "Homepage stays the Miami ranker. /panama-yacht-rentals/ stays the Panama ranker. Every city/page is allowed to rank on its own — do not 301 hubs together.", "Operator call 14 Aug 2026", "Accepted", ""],
        ["OP-002", "Accepted", "Out of scope", "Phones + hub pricing", "City-specific phones are intentional. Hub/widget pricing is not part of this audit.", "Operator call 14 Aug 2026", "Accepted", ""],
        ["CHG-011", "P1-High", "Shortcode", "Review counts sitewide", "Replace hard-coded review integers with one shortcode so you can update every template as you grow.", "Operator request", "Pending", ""],
        ["CHG-004", "P0-Critical", "noindex/prune", "test, cart, checkout, leftovers", "noindex + drop from sitemap: /test/, /test-page/, CPT tests, /cart/, /checkout/, /confirmed/, /elementor-52093/, /12-2/.", "Indexed junk", "Pending", ""],
        ["CHG-007", "P0-Critical", "Rewrite slug/H1", "Wrong-entity URLs", "If a page is meant to rank for its own query/city, the live H1 must match: FTL≠North Miami, /miami-yacht-destinations/≠list-your-boat, /panama-yacht-sales/≠Miami rental, reviews≠jet ski, /l00-person/ typo.", "Each page ranks on its own", "Pending", ""],
        ["CHG-012", "P1-High", "Un-collapse", "/yacht-specials/ + /miami-yacht-deals/ + /miami-yacht-rentals/", "These currently resolve to another template, so they are not ranking as their own pages. Unique content or accept as aliases.", "Each page ranks on its own", "Pending", ""],
        ["CHG-006", "P2-Medium", "Folder fix", "Panama boats under /fleet/miami-catering/", "Move Panama vessels out of the Miami catering folder so the URL matches the city.", "Each city on its own", "Pending", ""],
        ["CHG-008", "P2-Medium", "Internal links", "Orphan /miami-yacht-rental/{boat}/ links", "Many listing links are not in the sitemap (possible 404s). Fix or 301 so each vessel page that should rank actually exists.", "Broken/orphan URLs", "Pending", ""],
        ["CHG-009", "P2-Medium", "Tips quality", "miami/panama yacht tips", "Keep tips that help a city/page rank (birthday itinerary class). Prune TEST and thin automation posts.", "Cost of retrieval", "Pending", ""],
        ["CHG-010", "P1-High", "ES inherit", "/es/*", "Spanish twin follows the English page it translates. Do not merge ES Panama into ES Miami home.", "hreflang", "Pending", ""],
    ]

    # workbook
    wb = Workbook()

    # --- START_HERE ---
    ws = wb.active
    ws.title = "START_HERE"
    ws.sheet_properties.tabColor = GOLD
    ws["A1"] = "Feeling Yachty — page audit & approval system"
    ws["A1"].font = Font(name="Calibri", size=20, bold=True, color=NAVY)
    ws.merge_cells("A1:F1")
    lines = [
        "",
        f"Generated {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')} by PACMAN / Megaman.",
        "Source: live sitemap_index.xml (every <loc>) + live scrapes of money/identity/problem URLs.",
        "Framework: Koray / Corey Tongberg, adjusted by Fernando's operator lock of 14 Aug 2026.",
        "No traffic, rankings, or revenue numbers are invented.",
        "",
        "OPERATOR LOCK — DO NOT REOPEN",
        "- Homepage H1 Miami Yacht Rental stays. Home is the Miami ranker.",
        "- /panama-yacht-rentals/ already ranks in Panama. It stays its own city page.",
        "- Goal: every page and every city ranks on its own. Do not 301 Miami hubs together.",
        "- Review counts: operator will add shortcodes (CHG-011) so one edit updates every template.",
        "- Phone numbers: Miami vs Panama lines are intentional. Do not unify.",
        "- Hub / listing price mismatches: out of scope. Do not ticket.",
        "",
        "HOW YOU APPROVE",
        "1. Read DASHBOARD for the pile sizes.",
        "2. Work CHANGE_QUEUE first (10 tickets). OP-001 and OP-002 are already Accepted.",
        "3. Set Approve_? to Approve or Reject on the remaining tickets. That is the gate.",
        "4. Use ALL_PAGES (filter Needs_change, Priority, Role) to see every URL the ticket touches.",
        "5. Use ISSUES as the evidence list (one problem per row). You can Approve/Reject a single issue if you want to split a ticket.",
        "6. BROKEN_OR_ALIASES is the link graph: internal targets that are aliases or missing from the sitemap.",
        "7. After you Approve a CHANGE_QUEUE row, Corey/Pacman may implement only that ticket.",
        "",
        "WHAT 'EVERY PAGE' MEANS",
        f"ALL_PAGES has {len(page_rows)} rows — every unique URL in the sitemap, plus live aliases that collapse to another template.",
        "A URL that collapses to another template is not ranking on its own — that is CHG-012.",
        "A URL whose H1 is a different city/entity cannot rank for its own slug — that is CHG-007.",
        "Spanish /es/ rows inherit the English decision on purpose so you do not approve 860 twins one-by-one.",
        "",
        "STATUS VALUES",
        "Pending = waiting on you. Approve = do it. Reject = do not. Hold = need a WP/GSC check. Done = shipped and Pacman-verified.",
        "Accepted = operator already locked this. Do not reopen.",
    ]
    for i, line in enumerate(lines, 3):
        ws[f"A{i}"] = line
        ws[f"A{i}"].font = Font(name="Calibri", size=12, bold=line.startswith("HOW") or line.startswith("WHAT") or line.startswith("STATUS") or line.startswith("Generated") is False and line.isupper())
        if line.startswith("HOW") or line.startswith("WHAT") or line.startswith("STATUS") or line.startswith("OPERATOR"):
            ws[f"A{i}"].font = Font(name="Calibri", size=14, bold=True, color="C49200")
        else:
            ws[f"A{i}"].font = Font(name="Calibri", size=11)
        ws.merge_cells(f"A{i}:F{i}")
    ws.column_dimensions["A"].width = 120
    ws.row_dimensions[1].height = 28

    # --- DASHBOARD ---
    dash = wb.create_sheet("DASHBOARD")
    dash.sheet_properties.tabColor = "1AA6A1"
    dash["A1"] = "Counts"
    dash["A1"].font = Font(name="Calibri", size=16, bold=True)
    counts_role = Counter(r["role"] for r in page_rows)
    counts_pri = Counter(r["priority"] for r in page_rows)
    counts_lang = Counter(r["language"] for r in page_rows)
    counts_need = Counter(r["needs_change"] for r in page_rows)
    dash["A3"] = "Role"
    dash["B3"] = "Pages"
    r = 4
    for k, v in counts_role.most_common():
        dash[f"A{r}"] = k
        dash[f"B{r}"] = v
        r += 1
    dash["D3"] = "Priority"
    dash["E3"] = "Pages"
    r = 4
    for k, v in counts_pri.most_common():
        dash[f"D{r}"] = k
        dash[f"E{r}"] = v
        r += 1
    dash["G3"] = "Language"
    dash["H3"] = "Pages"
    dash["G4"] = "EN"
    dash["H4"] = counts_lang.get("EN", 0)
    dash["G5"] = "ES"
    dash["H5"] = counts_lang.get("ES", 0)
    dash["G7"] = "Needs change"
    dash["H7"] = "Pages"
    r = 8
    for k, v in counts_need.most_common():
        dash[f"G{r}"] = k
        dash[f"H{r}"] = v
        r += 1
    dash["A16"] = "Issues by severity"
    dash["A16"].font = Font(name="Calibri", size=14, bold=True)
    sev = Counter(i["severity"] for i in issues)
    dash["A17"] = "Severity"
    dash["B17"] = "Count"
    r = 18
    for k in ("Critical", "High", "Medium", "Low"):
        dash[f"A{r}"] = k
        dash[f"B{r}"] = sev.get(k, 0)
        r += 1
    dash["A24"] = "Open CHANGE_QUEUE tickets"
    dash["B24"] = len(changes)
    dash["A25"] = "ALL_PAGES rows"
    dash["B25"] = len(page_rows)
    dash["A26"] = "ISSUES rows"
    dash["B26"] = len(issues)
    dash["A28"] = "Filter ALL_PAGES: Priority = P0-Critical AND Language = EN to start."
    dash["A28"].font = Font(name="Calibri", italic=True)
    for col in "ABDEGH":
        dash.column_dimensions[col].width = 28

    # --- CHANGE_QUEUE ---
    ch = wb.create_sheet("CHANGE_QUEUE")
    ch.sheet_properties.tabColor = "E85D3A"
    headers = [
        "Change_ID",
        "Priority",
        "Action_type",
        "Primary_target",
        "Proposed_change",
        "Why_framework",
        "Approve_?",
        "Fernando_notes",
        "Assigned_agent",
        "Pacman_verify",
    ]
    ch.append(headers)
    style_header(ch)
    for row in changes:
        ch.append(list(row) + ["Corey (gated) / Pacman verify", "Pending"])
    add_dv(ch, APPROVE_OPTS, "G2:G50")
    add_dv(ch, '"Pending,Verified,Blocked"', "J2:J50")
    autosize(ch, {1: 12, 2: 14, 3: 16, 4: 42, 5: 70, 6: 22, 7: 14, 8: 28, 9: 24, 10: 14})
    for row in ch.iter_rows(min_row=2, max_row=ch.max_row, min_col=7, max_col=7):
        for cell in row:
            cell.fill = PatternFill("solid", fgColor=AMBER)

    # --- ALL_PAGES ---
    ap = wb.create_sheet("ALL_PAGES")
    ap.sheet_properties.tabColor = GOLD
    ph = [
        "Page_ID",
        "URL",
        "Language",
        "Lastmod",
        "Sitemap",
        "Folder",
        "Page_type",
        "Query_cluster",
        "Role",
        "Recommended_owner",
        "Priority",
        "Needs_change",
        "Suggested_change",
        "Flags",
        "Live_H1_if_scraped",
        "Scraped",
        "Notes",
        "Approve_?",
        "Change_IDs",
        "Fernando_notes",
    ]
    ap.append(ph)
    style_header(ap)
    for i, r in enumerate(sorted(page_rows, key=lambda x: (x["priority"], x["language"], x["url"])), 1):
        chg = []
        if any(
            x in r["flags"]
            for x in ("operator-keep-miami-home", "operator-panama-ranks", "operator-own-page")
        ):
            chg.append("OP-001")
        if "operator-phones-ok" in r["flags"]:
            chg.append("OP-002")
        if "operator-reviews-shortcode" in r["flags"]:
            chg.append("CHG-011")
        if r["role"] in {"Prune-noindex", "Utility-noindex"}:
            chg.append("CHG-004")
        if any(x in r["flags"] for x in ("url-collapses-to-cheap", "url-collapses-to-rental")):
            chg.append("CHG-012")
        if any(x in r["flags"] for x in ("listing-duplicate-folder", "multi-url-vessel", "wrong-folder", "class-folder-overlap")):
            chg.append("CHG-006")
        if any(x in r["flags"] for x in ("slug-content-mismatch", "city-identity-conflict", "typo-slug", "wrong-h1-jetski")):
            chg.append("CHG-007")
        if r["role"] == "ES-twin":
            chg.append("CHG-010")
        if "auto-blog-risk" in r["flags"]:
            chg.append("CHG-009")
        fills = {}
        if r["priority"].startswith("P0"):
            fills[11] = RED
        elif r["priority"].startswith("P1"):
            fills[11] = AMBER
        if r["role"] in {"Prune-noindex", "Utility-noindex", "Duplicate"}:
            fills[9] = RED
        elif r["role"] == "Owner":
            fills[9] = GREEN
        elif r["role"] == "ES-twin":
            fills[9] = BLUE
        vals = [
            f"PG-{i:04d}",
            r["url"],
            r["language"],
            r["lastmod"],
            r["sitemap"],
            r["folder"],
            r["page_type"],
            r["cluster"],
            r["role"],
            r["owner"],
            r["priority"],
            r["needs_change"],
            r["suggested"],
            r["flags"],
            r["title"],
            r["scraped"],
            r["notes"],
            "Pending",
            ", ".join(dict.fromkeys(chg)),
            "",
        ]
        fill_row(ap, i + 1, vals, fills)
        ap.row_dimensions[i + 1].height = 36
    add_dv(ap, APPROVE_OPTS, f"R2:R{ap.max_row}")
    add_dv(ap, ROLE_OPTS, f"I2:I{ap.max_row}")
    add_dv(ap, PRIORITY_OPTS, f"K2:K{ap.max_row}")
    autosize(
        ap,
        {
            1: 10,
            2: 58,
            3: 10,
            4: 22,
            5: 28,
            6: 26,
            7: 22,
            8: 26,
            9: 18,
            10: 42,
            11: 14,
            12: 28,
            13: 62,
            14: 28,
            15: 36,
            16: 10,
            17: 36,
            18: 12,
            19: 18,
            20: 24,
        },
    )
    ap.auto_filter.ref = f"A1:T{ap.max_row}"

    # --- ISSUES ---
    iss = wb.create_sheet("ISSUES")
    iss.sheet_properties.tabColor = "E85D3A"
    ih = ["Issue_ID", "Severity", "Category", "URL_or_scope", "What_is_wrong", "Suggested_fix", "Change_ID", "Approve_?", "Fernando_notes"]
    iss.append(ih)
    style_header(iss)
    for i, item in enumerate(issues, 1):
        fills = {2: RED if item["severity"] == "Critical" else AMBER if item["severity"] == "High" else GREY}
        fill_row(
            iss,
            i + 1,
            [
                item["id"],
                item["severity"],
                item["category"],
                item["url"],
                item["detail"],
                item["fix"],
                item["change_id"],
                "Pending",
                "",
            ],
            fills,
        )
        iss.row_dimensions[i + 1].height = 32
    add_dv(iss, APPROVE_OPTS, f"H2:H{iss.max_row}")
    autosize(iss, {1: 12, 2: 12, 3: 24, 4: 52, 5: 62, 6: 52, 7: 12, 8: 12, 9: 24})
    iss.auto_filter.ref = f"A1:I{iss.max_row}"

    # --- BROKEN ---
    br = wb.create_sheet("BROKEN_OR_ALIASES")
    br.sheet_properties.tabColor = "8A8468"
    br.append(["Target_URL", "Kind", "Times_linked", "Sample_source_pages", "What_to_do", "Approve_?"])
    style_header(br)
    grouped = defaultdict(lambda: {"kind": "", "detail": "", "sources": []})
    for src, dest, kind, detail in link_issues:
        dest_n = dest.rstrip("/") + ("/" if dest != "https://feelingyachty.com/" else "")
        g = grouped[(dest_n, kind)]
        g["kind"] = kind
        g["detail"] = detail
        if src not in g["sources"]:
            g["sources"].append(src)
    uniq = []
    for i, ((dest, kind), g) in enumerate(sorted(grouped.items(), key=lambda kv: (-len(kv[1]["sources"]), kv[0][0])), 1):
        uniq.append((dest, kind, len(g["sources"]), " | ".join(g["sources"][:6]), g["detail"]))
        fill_row(
            br,
            i + 1,
            [dest, kind, len(g["sources"]), " | ".join(g["sources"][:6]), g["detail"], "Pending"],
            {2: AMBER if kind == "Redirect/alias" else BLUE},
        )
    add_dv(br, APPROVE_OPTS, f"F2:F{max(2, br.max_row)}")
    autosize(br, {1: 58, 2: 16, 3: 14, 4: 70, 5: 56, 6: 12})
    br.auto_filter.ref = f"A1:F{br.max_row}"

    # --- OWNERSHIP ---
    ow = wb.create_sheet("OWNERSHIP")
    ow.sheet_properties.tabColor = "2F6FED"
    ow.append(["Query_cluster", "Recommended_owner", "Competing_page_count_EN", "Approve_owner_?", "Notes"])
    style_header(ow)
    en_rows = [r for r in page_rows if r["language"] == "EN"]
    by_cluster = defaultdict(list)
    for r in en_rows:
        by_cluster[r["cluster"]].append(r)
    r_i = 2
    for cluster, rows in sorted(by_cluster.items(), key=lambda kv: -len(kv[1])):
        owners = Counter(x["owner"] for x in rows)
        owner = owners.most_common(1)[0][0]
        fill_row(ow, r_i, [cluster, owner, len(rows), "Pending", f"{sum(1 for x in rows if x['role']=='Duplicate')} marked Duplicate"])
        r_i += 1
    add_dv(ow, APPROVE_OPTS, f"D2:D{ow.max_row}")
    autosize(ow, {1: 32, 2: 52, 3: 22, 4: 16, 5: 36})

    # --- SCRAPED ---
    sc = wb.create_sheet("SCRAPED_EVIDENCE")
    sc.sheet_properties.tabColor = "5B8C5A"
    sc.append(["Live_URL", "H1_or_title", "Outbound_internal_links", "Notes"])
    style_header(sc)
    evidence_notes = {
        "https://feelingyachty.com/": "H1 Miami Yacht Rental — operator-kept Miami ranker. Inventory widget. Panama in founder line. Tips labeled automation.",
        "https://feelingyachty.com/miami-yacht-rental/": "Own ranking URL (operator). Same widget family as home/charters is allowed. Hub pricing out of scope.",
        "https://feelingyachty.com/miami-yacht-charters/": "Own ranking URL (operator). Do not 301 into rental or home.",
        "https://feelingyachty.com/panama-yacht-rentals/": "Already ranks in Panama. Route-based prices. Stays its own city page.",
        "https://feelingyachty.com/cheap-yacht-rentals-miami/": "Own ranking URL (operator). Hub/widget pricing out of scope.",
        "https://feelingyachty.com/affordable-yachts-rentals-miami/": "Own ranking URL (operator). Do not merge into cheap.",
        "https://feelingyachty.com/fort-lauderdale-yacht-rentals/": "H1 FTL then Best North Miami. ONLY company free hour.",
        "https://feelingyachty.com/test/": "H1 TEST + 227-yacht clone. Indexed.",
        "https://feelingyachty.com/book/": "Is login/account, not a booking money page.",
        "https://feelingyachty.com/feeling-yachty-reviews/": "Review integer will move to shortcode. Live H1 is Jet Ski — this URL cannot rank as reviews until that H1 is fixed.",
        "https://feelingyachty.com/reviews/": "Separate reviews URL. Wire the same shortcode here.",
        "https://feelingyachty.com/miami-yacht-destinations/": "Slug destinations, content is List your boat — cannot rank for destinations.",
        "https://feelingyachty.com/panama-yacht-sales/": "Slug Panama sales, content Miami rentals — cannot rank as Panama sales.",
        "https://feelingyachty.com/yacht-specials/": "Resolves to cheap page content, so it is not ranking on its own.",
        "https://feelingyachty.com/miami-yacht-deals/": "Resolves to cheap page content, so it is not ranking on its own.",
        "https://feelingyachty.com/miami-yacht-rentals/": "Resolves to /miami-yacht-rental/ (alias), so it is not ranking on its own.",
        "https://feelingyachty.com/l00-person-yacht-rentals/": "Typo slug; live page is 100+ group charters.",
        "https://feelingyachty.com/fleet/miami/26ft-bayliner-fendi/": "Hub vs listing price noted; operator said hub/pricing is out of scope.",
        "https://feelingyachty.com/contact-feeling-yachty/": "City-specific phones are intentional (operator). Do not unify Miami and Panama numbers.",
        "https://feelingyachty.com/feeling-yachty-crew/": "Review integer will move to shortcode. SMS is a Miami line — leave phones.",
        "https://feelingyachty.com/es/": "Spanish twin of the Miami homepage ranker. Correct under the operator lock.",
    }
    r_i = 2
    for page in sorted(set(list(titles) + list(evidence_notes))):
        internal = [h for h in link_map.get(page, []) if "feelingyachty.com" in h and "/wp-content/" not in h]
        fill_row(
            sc,
            r_i,
            [
                page,
                titles.get(page, ""),
                len(internal),
                evidence_notes.get(page, "Live scrape on file."),
            ],
        )
        r_i += 1
    autosize(sc, {1: 62, 2: 48, 3: 14, 4: 80})

    # --- HOW ---
    how = wb.create_sheet("HOW_TO_APPROVE")
    how["A1"] = "Approval doctrine (PACMAN)"
    how["A1"].font = Font(name="Calibri", size=16, bold=True)
    for i, t in enumerate(
        [
            "Corey proposes. You Approve. Only then implement. Pacman verifies live.",
            "Approve CHANGE_QUEUE rows, not random ALL_PAGES cells, unless you are splitting a ticket.",
            "OP-001 and OP-002 are already Accepted. Do not reopen homepage-as-Miami, Panama-as-own-city, phones, or hub pricing.",
            "Reject if a ticket would merge Miami hubs, rewrite the homepage off Miami, or unify Miami/Panama phones.",
            "Hold only if you need a live GSC screenshot or a WP admin check — not for phones or prices.",
            "ES twins: approving CHG-010 means every later EN change includes /es/ in the same deploy.",
            "CHG-011 is the review shortcode. Do not invent a review integer in copy; wire the shortcode so one edit updates every template.",
            "After Approve, implementation should be a WP/Elementor + redirect ticket, then Pacman spot-checks the live URL.",
        ],
        3,
    ):
        how[f"A{i}"] = t
        how[f"A{i}"].font = Font(name="Calibri", size=12)
        how.merge_cells(f"A{i}:E{i}")
    how.column_dimensions["A"].width = 110

    # print settings
    for sheet in wb.worksheets:
        sheet.page_setup.orientation = "landscape"
        sheet.page_setup.fitToPage = True
        sheet.page_setup.fitToWidth = 1
        sheet.page_setup.fitToHeight = 0
        sheet.sheet_view.showGridLines = True

    OUT.parent.mkdir(parents=True, exist_ok=True)
    wb.save(OUT)

    JSON_OUT.write_text(
        json.dumps(
            {
                "generated": datetime.now(timezone.utc).isoformat(),
                "pages": len(page_rows),
                "issues": len(issues),
                "changes": len(changes),
                "link_flags": len(uniq),
                "roles": counts_role,
                "priorities": counts_pri,
            },
            indent=2,
            default=str,
        )
    )
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")
    print(f"pages={len(page_rows)} issues={len(issues)} changes={len(changes)} link_flags={len(uniq)}")
    print("roles", dict(counts_role))
    print("priority", dict(counts_pri))


if __name__ == "__main__":
    main()
