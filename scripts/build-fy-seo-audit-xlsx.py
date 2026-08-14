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
            "homepage",
            "brand + miami-head (conflict)",
            "Needs-rewrite",
            OWNER["brand"],
            "P0-Critical",
        )
        suggested = "Rewrite as brand roof (Miami + Panama). Move Miami H1 to /miami-yacht-rental/."
        flags.append("homepage-is-miami-money")
    elif p == "/es/" or p == "/es":
        page_type, cluster, role, owner, priority = (
            "homepage-es",
            "brand + miami-head (conflict)",
            "ES-twin",
            OWNER["brand"],
            "P1-High",
        )
        suggested = "After EN homepage rewrite, match Spanish roof. Do not keep 'Alquiler de yates en Miami' as corporate H1 unless approved."
        flags.append("es-homepage-miami-only")
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
            "brand-nap",
            "Needs-rewrite",
            OWNER["contact"],
            "P0-Critical",
        )
        suggested = "Reconcile Panama phone 202-1729 vs 202-1279 and US 954/754/786 before any other identity work."
        flags.append("nap-conflict")
    elif top in {"feeling-yachty-crew", "yacht-safety-protocols"}:
        page_type, cluster, role, owner, priority = (
            "identity-trust",
            "brand-trust",
            "Needs-rewrite",
            OWNER["crew"],
            "P1-High",
        )
        suggested = "One review integer. One inclusions rule. Crew SMS 754 must not fight 954."
        flags.append("trust-integer-conflict")
    elif top in {"feeling-yachty-reviews", "reviews"}:
        page_type, cluster, role, owner, priority = (
            "identity-reviews",
            "brand-reviews",
            "Duplicate" if top == "reviews" else "Needs-rewrite",
            OWNER["reviews"],
            "P1-High",
        )
        suggested = (
            "Merge /reviews/ into /feeling-yachty-reviews/. Remove jet-ski H1 on reviews URL. One review count."
        )
        flags.append("reviews-split")
    elif top == "book":
        page_type, cluster, role, owner, priority = (
            "account-login",
            "convert",
            "Utility-noindex",
            OWNER["book"],
            "P1-High",
        )
        suggested = "Live scrape is the account/login hub. noindex if it is not meant to rank. Do not use as a money clone."
        flags.append("book-is-login")
    elif top == "miami-yacht-rental":
        page_type, cluster, role, owner, priority = (
            "money-hub",
            "miami-head",
            "Owner",
            OWNER["miami_head"],
            "P0-Critical",
        )
        suggested = "KEEP as Miami owner. Absorb /miami-yacht-charters/ and other head clones after approval."
        flags.append("proposed-miami-owner")
    elif top in {
        "miami-yacht-charters",
        "miami-yacht-rentals-directory",
        "miami-yachts-booking",
        "luxury-yacht-rentals",
        "miami-mega-charter-rentals",
        "miami-superyacht-rentals",
    } or "feeling-yachty-2" in work:
        page_type, cluster, role, owner, priority = (
            "money-hub-duplicate",
            "miami-head",
            "Duplicate",
            OWNER["miami_head"],
            "P0-Critical",
        )
        suggested = "301 (or canonical+noindex if 301 unsafe) to /miami-yacht-rental/ after owner Approve."
        flags.append("miami-head-cannibal")
    elif top in {
        "cheap-yacht-rentals-miami",
        "affordable-yachts-rentals-miami",
        "yacht-specials",
        "miami-yacht-deals",
    }:
        page_type, cluster, role, owner, priority = (
            "money-hub-budget",
            "miami-budget",
            "Duplicate" if top != "cheap-yacht-rentals-miami" else "Needs-rewrite",
            "https://feelingyachty.com/cheap-yacht-rentals-miami/",
            "P0-Critical",
        )
        suggested = (
            "Keep ONE budget URL (recommend /cheap-yacht-rentals-miami/) or fold into owner as a filter. "
            "Fix 'all fees included' vs 'crew and fuel additional' on the same template."
        )
        flags.append("budget-cannibal")
        flags.append("inclusions-contradiction")
    elif top == "panama-yacht-rentals":
        page_type, cluster, role, owner, priority = (
            "money-hub",
            "panama-head",
            "Owner" if work.rstrip("/") == "/panama-yacht-rentals" else "Support",
            OWNER["panama_head"],
            "P1-High" if work.rstrip("/") == "/panama-yacht-rentals" else "P2-Medium",
        )
        suggested = (
            "KEEP hub. Vessel children support it. Do not clone Miami hub sprawl."
            if work.rstrip("/") == "/panama-yacht-rentals"
            else "Support listing under Panama owner. Confirm facts are Panama, not Miami."
        )
        flags.append("panama-keep")
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
        page_type, cluster, role, owner, priority = (
            "capacity-modifier",
            "miami-capacity",
            "Needs-rewrite",
            OWNER["miami_head"],
            "P1-High",
        )
        suggested = (
            "Fix slug /l00-person-yacht-rentals/ → 100-person. Prefer one capacity guide + filters over a page per integer."
            if top.startswith("l00")
            else "Candidate to merge into one capacity guide. Do not grow 40/60/80 clones."
        )
        if top.startswith("l00"):
            flags.append("typo-slug")
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
        page_type, cluster, role, owner, priority = (
            "class-hub-or-listing",
            "miami-superyacht",
            "Duplicate",
            OWNER["miami_head"],
            "P1-High",
        )
        suggested = "Overlaps mega/super/luxury. One class hub, listings under /fleet/."
        flags.append("class-folder-overlap")
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

    # sitewide issues (once)
    add_issue(
        "https://feelingyachty.com/",
        "Critical",
        "Source context",
        "Homepage H1 is Miami Yacht Rental. Panama is a founder footnote. Brand is not the roof.",
        "Rewrite / as brand + two destinations. Miami H1 lives on /miami-yacht-rental/.",
        "CHG-001",
    )
    add_issue(
        "SITEWIDE",
        "Critical",
        "Contradiction / NAP",
        "US phones 954-246-3636 (site) vs 754-325-3827 (crew SMS) vs 786-352-8857 (Yelp/Facebook snapshot). Panama 202-1729 vs 202-1279.",
        "One US number, one Panama number, align GBP/Yelp/FB/schema.",
        "CHG-002",
    )
    add_issue(
        "SITEWIDE",
        "Critical",
        "Contradiction / reviews",
        "On-site integers: 1,300+ / 1,700+ / 2,100+ / 2,300+ / 2,400+ / 2,500+ / 2,700+ across FTL, reviews, party, pink, cheap, home, crew.",
        "One audited sentence. No competing integers.",
        "CHG-002",
    )
    add_issue(
        "SITEWIDE",
        "Critical",
        "Contradiction / inclusions",
        "Cheap/affordable/FTL/sail say all fees or fuel included. Shared inventory widget says crew and fuel are additional.",
        "One inclusions block. Widget and H2 must match.",
        "CHG-002",
    )
    add_issue(
        "https://feelingyachty.com/fleet/miami/26ft-bayliner-fendi/",
        "Critical",
        "Contradiction / listing",
        "Hub card $800/4h max 13 vs listing $500 due today and passenger selector to 40.",
        "Lock price and legal capacity to ops truth. Selector max = real max.",
        "CHG-003",
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
            if "miami-head-cannibal" in extra_flags:
                add_issue(url, "Critical", "Cannibalization", "Competes with proposed Miami owner /miami-yacht-rental/.", cls["suggested"], "CHG-005")
            if "budget-cannibal" in extra_flags:
                add_issue(url, "Critical", "Cannibalization", "Budget/deals/specials cluster is overlapping.", cls["suggested"], "CHG-005")
            if "slug-content-mismatch" in extra_flags:
                add_issue(url, "Critical", "Wrong entity", "Slug and live H1/job do not match.", cls["suggested"], "CHG-007")
            if "city-identity-conflict" in extra_flags and cls["page_type"] == "money-hub-ftl":
                add_issue(url, "Critical", "Wrong city", "Fort Lauderdale URL talks North Miami.", cls["suggested"], "CHG-007")
            if "wrong-folder" in extra_flags:
                add_issue(url, "High", "IA / folder", "Panama asset under Miami catering folder.", cls["suggested"], "CHG-006")
            if "typo-slug" in extra_flags:
                add_issue(url, "High", "Slug typo", "l00-person should be 100-person.", cls["suggested"], "CHG-007")

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
        ["CHG-001", "P0-Critical", "Rewrite", OWNER["brand"], "Rewrite homepage as brand roof (Miami + Panama). Remove Miami-only H1. ES twin follows.", "Source context", "Pending", ""],
        ["CHG-002", "P0-Critical", "Fact lock", "SITEWIDE", "Lock NAP, review integer, inclusions/fuel rule. Update contact, crew, cheap/affordable, FTL, schema, GBP.", "Trust / Brand SERP", "Pending", ""],
        ["CHG-003", "P0-Critical", "Listing truth", "https://feelingyachty.com/fleet/miami/26ft-bayliner-fendi/", "Reconcile Fendi price and max guests. Audit selector max on all Woo listings.", "Safety + EAV", "Pending", ""],
        ["CHG-004", "P0-Critical", "noindex/prune", "test, cart, checkout, elementor leftovers", "noindex + drop from sitemap: /test/, /test-page/, CPT tests, /cart/, /checkout/, /confirmed/, /elementor-52093/, /12-2/.", "Cost of retrieval", "Pending", ""],
        ["CHG-005", "P0-Critical", "301 / merge hubs", OWNER["miami_head"], "Approve /miami-yacht-rental/ as Miami owner. 301 charters, luxury, directory, deals, specials, affordable (or keep one budget URL only).", "Cannibalization", "Pending", ""],
        ["CHG-006", "P1-High", "301 listings", "/fleet/miami/{slug}/", "One canonical per vessel. 301 cheapest/mega/super copies. Move Panama boats out of /fleet/miami-catering/.", "IA", "Pending", ""],
        ["CHG-007", "P0-Critical", "Rewrite wrong slugs", "FTL, destinations, panama-sales, l00-person", "Fix city/entity mismatches and typo slug.", "Entity identity", "Pending", ""],
        ["CHG-008", "P1-High", "Internal links", "SITEWIDE", "Replace alias anchors (/miami-yacht-rentals/, /yacht-specials/, /reviews/) with approved owners.", "Bridges", "Pending", ""],
        ["CHG-009", "P1-High", "Freeze auto-blog", "n8n gKezuNipPn2PjqTV + tip CPTs", "No net-new tips until map + ownership approved. Prune thin/automation posts. Keep birthday itinerary class.", "Map discipline", "Pending", ""],
        ["CHG-010", "P1-High", "ES inherit", "/es/*", "When an EN 301/noindex/rewrite is approved, do the Spanish twin in the same ticket.", "hreflang", "Pending", ""],
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
        "Framework: Koray / Corey Tongberg Holistic SEO as operationalized in skills/seo-corey-tongberg.",
        "No traffic, rankings, or revenue numbers are invented.",
        "",
        "HOW YOU APPROVE",
        "1. Read DASHBOARD for the pile sizes.",
        "2. Work CHANGE_QUEUE first (10 tickets). Set Approve_? to Approve or Reject. That is the gate.",
        "3. Use ALL_PAGES (filter Needs_change, Priority, Role) to see every URL the ticket touches.",
        "4. Use ISSUES as the evidence list (one problem per row). You can Approve/Reject a single issue if you want to split a ticket.",
        "5. BROKEN_OR_ALIASES is the link graph: internal targets that are aliases or missing from the sitemap.",
        "6. After you Approve a CHANGE_QUEUE row, Corey/Pacman may implement only that ticket.",
        "",
        "WHAT 'EVERY PAGE' MEANS",
        f"ALL_PAGES has {len(page_rows)} rows — every unique URL in the sitemap. Each row is classified (type, cluster, role, owner, suggested change).",
        "Deep live-scrape notes exist on the money/identity set (see SCRAPED_EVIDENCE). Remaining URLs are audited from URL/IA/sitemap signals plus inherited issues (NAP, cannibalization pattern, auto-blog folder).",
        "Spanish /es/ rows inherit the English decision on purpose so you do not approve 860 twins one-by-one.",
        "",
        "STATUS VALUES",
        "Pending = waiting on you. Approve = do it. Reject = do not. Hold = need ops fact. Done = shipped and Pacman-verified.",
    ]
    for i, line in enumerate(lines, 3):
        ws[f"A{i}"] = line
        ws[f"A{i}"].font = Font(name="Calibri", size=12, bold=line.startswith("HOW") or line.startswith("WHAT") or line.startswith("STATUS") or line.startswith("Generated") is False and line.isupper())
        if line.startswith("HOW") or line.startswith("WHAT") or line.startswith("STATUS"):
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
        if "homepage-is-miami-money" in r["flags"] or r["page_type"] == "homepage":
            chg.append("CHG-001")
        if any(x in r["flags"] for x in ("nap-conflict", "trust-integer-conflict", "inclusions-contradiction", "reviews-split")):
            chg.append("CHG-002")
        if "listing-needs-one-canonical" in r["flags"] or r["url"].endswith("26ft-bayliner-fendi/"):
            chg.append("CHG-003")
        if r["role"] in {"Prune-noindex", "Utility-noindex"}:
            chg.append("CHG-004")
        if any(x in r["flags"] for x in ("miami-head-cannibal", "budget-cannibal", "proposed-miami-owner")):
            chg.append("CHG-005")
        if any(x in r["flags"] for x in ("listing-duplicate-folder", "multi-url-vessel", "wrong-folder", "class-folder-overlap")):
            chg.append("CHG-006")
        if any(x in r["flags"] for x in ("slug-content-mismatch", "city-identity-conflict", "typo-slug")):
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
        "https://feelingyachty.com/": "H1 Miami Yacht Rental. Inventory 27 of 178. Tips labeled automation. Founder line 2,400+ and Panama mention late.",
        "https://feelingyachty.com/miami-yacht-rental/": "Proposed owner. Same widget family as home/charters. Card counts 27 of 49 vs 400+ copy.",
        "https://feelingyachty.com/miami-yacht-charters/": "Near-clone of rental hub. 27 of 178.",
        "https://feelingyachty.com/panama-yacht-rentals/": "Best money page. Route-based EAV. Phone 202-1729.",
        "https://feelingyachty.com/cheap-yacht-rentals-miami/": "All fees included vs widget fuel extra.",
        "https://feelingyachty.com/affordable-yachts-rentals-miami/": "Clone of cheap. Includes captain/fuel then widget contradicts.",
        "https://feelingyachty.com/fort-lauderdale-yacht-rentals/": "H1 FTL then Best North Miami. ONLY company free hour.",
        "https://feelingyachty.com/test/": "H1 TEST + 227-yacht clone. Indexed.",
        "https://feelingyachty.com/book/": "Is login/account, not a booking money page.",
        "https://feelingyachty.com/feeling-yachty-reviews/": "1,700+ then Jet Ski Rentals H1.",
        "https://feelingyachty.com/reviews/": "2,500+ reviews hub. Split from feeling-yachty-reviews.",
        "https://feelingyachty.com/miami-yacht-destinations/": "Slug destinations, content is List your boat.",
        "https://feelingyachty.com/panama-yacht-sales/": "Slug Panama sales, content Miami rentals.",
        "https://feelingyachty.com/yacht-specials/": "Resolves to cheap page content.",
        "https://feelingyachty.com/miami-yacht-deals/": "Resolves to cheap page content.",
        "https://feelingyachty.com/miami-yacht-rentals/": "Resolves to /miami-yacht-rental/ (alias).",
        "https://feelingyachty.com/l00-person-yacht-rentals/": "Typo slug; live page is 100+ group charters.",
        "https://feelingyachty.com/fleet/miami/26ft-bayliner-fendi/": "Price/capacity mismatch vs hub card.",
        "https://feelingyachty.com/contact-feeling-yachty/": "Panama 202-1279 vs money page 202-1729. Multiple Miami GBPs.",
        "https://feelingyachty.com/feeling-yachty-crew/": "2,700+ reviews. SMS 754. All-in pricing claim.",
        "https://feelingyachty.com/es/": "Spanish Miami homepage, not brand roof.",
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
            "Reject means do not implement — leave a note (e.g. 'keep /luxury-yacht-rentals/ as a real class hub').",
            "Hold means ops must answer Appendix facts (phones, inclusions, legal capacity, FTL product).",
            "ES twins: approving CHG-010 means every later EN 301 includes /es/ in the same deploy.",
            "Do not invent prices or fleet counts in copy while CHG-002/003 are open.",
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
