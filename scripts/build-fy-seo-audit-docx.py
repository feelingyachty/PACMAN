#!/usr/bin/env python3
"""Build the Feeling Yachty Koray/Tongberg SEO audit Word document."""

from datetime import date
from pathlib import Path

from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor

OUT = Path("/workspace/docs/seo/audits/Feeling-Yachty-SEO-Framework-Audit-2026-08-14.docx")
NAVY = RGBColor(0x14, 0x16, 0x0F)
GOLD = RGBColor(0xC4, 0x92, 0x00)
MUTED = RGBColor(0x5C, 0x57, 0x40)
ALERT = RGBColor(0xB4, 0x3A, 0x1F)


def set_run(run, *, size=11, bold=False, color=NAVY, italic=False):
    run.font.name = "Calibri"
    run._element.rPr.rFonts.set(qn("w:eastAsia"), "Calibri")
    run.font.size = Pt(size)
    run.bold = bold
    run.italic = italic
    run.font.color.rgb = color


def add_p(doc, text, *, size=11, bold=False, color=NAVY, italic=False, space_after=8, space_before=0):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.line_spacing = 1.15
    run = p.add_run(text)
    set_run(run, size=size, bold=bold, color=color, italic=italic)
    return p


def heading(doc, text, level=1):
    p = doc.add_heading(text, level=level)
    for run in p.runs:
        run.font.color.rgb = NAVY if level > 1 else GOLD
        run.font.name = "Calibri"
    return p


def bullet(doc, text, bold_lead=None):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.space_after = Pt(4)
    if bold_lead:
        r = p.add_run(bold_lead)
        set_run(r, bold=True)
        r = p.add_run(text)
        set_run(r)
    else:
        r = p.add_run(text)
        set_run(r)
    return p


def shade_header(cell, hex_color="14160F"):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    shd = tcPr.makeelement(qn("w:shd"), {qn("w:fill"): hex_color, qn("w:val"): "clear"})
    tcPr.append(shd)


def add_table(doc, headers, rows):
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    for i, h in enumerate(headers):
        cell = table.rows[0].cells[i]
        cell.text = ""
        p = cell.paragraphs[0]
        run = p.add_run(h)
        set_run(run, size=10, bold=True, color=RGBColor(0xFF, 0xF6, 0xD8))
        shade_header(cell)
    for r_i, row in enumerate(rows):
        for c_i, val in enumerate(row):
            cell = table.rows[r_i + 1].cells[c_i]
            cell.text = ""
            p = cell.paragraphs[0]
            run = p.add_run(str(val))
            set_run(run, size=10)
    doc.add_paragraph()
    return table


def score_row(name, score, note):
    return [name, f"{score} / 5", note]


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc = Document()
    section = doc.sections[0]
    section.top_margin = Inches(0.85)
    section.bottom_margin = Inches(0.85)
    section.left_margin = Inches(0.95)
    section.right_margin = Inches(0.95)

    footer = section.footer.paragraphs[0]
    footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
    fr = footer.add_run(
        "Feeling Yachty  ·  Confidential SEO audit  ·  PACMAN / Megaman  ·  14 August 2026  ·  Page "
    )
    set_run(fr, size=8, color=MUTED)
    # page number field
    from docx.oxml import OxmlElement

    fld1 = OxmlElement("w:fldChar")
    fld1.set(qn("w:fldCharType"), "begin")
    instr = OxmlElement("w:instrText")
    instr.set(qn("xml:space"), "preserve")
    instr.text = " PAGE "
    fld2 = OxmlElement("w:fldChar")
    fld2.set(qn("w:fldCharType"), "end")
    fr2 = footer.add_run()
    set_run(fr2, size=8, color=MUTED)
    fr2._r.append(fld1)
    fr2._r.append(instr)
    fr2._r.append(fld2)

    add_p(doc, "PACMAN  ·  MEGAMAN", size=12, bold=True, color=GOLD, space_after=2)
    add_p(
        doc,
        "Feeling Yachty SEO Framework Audit",
        size=26,
        bold=True,
        space_after=4,
    )
    add_p(
        doc,
        "Koray Tuğberk GÜBÜR / Corey Tongberg Holistic SEO  ·  feelingyachty.com",
        size=13,
        italic=True,
        color=MUTED,
        space_after=12,
    )
    add_p(
        doc,
        "Prepared for Fernando  ·  14 August 2026  ·  Live site + sitemap_index.xml",
        size=11,
        color=MUTED,
        space_after=6,
    )
    add_p(
        doc,
        "This is an operator audit, not a traffic forecast. No rankings, sessions, or revenue "
        "figures are invented. Every claim below is tied to a live URL, a sitemap count, or a "
        "search snapshot taken the same day.",
        size=11,
        italic=True,
        space_after=16,
    )

    heading(doc, "0. Operator lock (Fernando, 14 August 2026)", 1)
    add_p(
        doc,
        "This lock supersedes the first-pass “merge the Miami hubs / rewrite the homepage as a "
        "brand roof / unify phones” reading. The Excel CHANGE_QUEUE is the working system. "
        "Do not reopen the items below.",
        bold=True,
    )
    bullet(
        doc,
        " Homepage H1 “Miami Yacht Rental” stays. The homepage is what ranks most for Miami. "
        "Do not move Miami off /.",
        bold_lead="Miami home.",
    )
    bullet(
        doc,
        " /panama-yacht-rentals/ already ranks in Panama. It stays its own city money page. "
        "Do not merge Panama into the homepage.",
        bold_lead="Panama hub.",
    )
    bullet(
        doc,
        " Every page and every city is allowed to rank on its own. Do not 301 Miami hubs "
        "together (charters, cheap, affordable, luxury, directory, capacity pages).",
        bold_lead="Own-page ranking.",
    )
    bullet(
        doc,
        " Review integers are stale because the brand grew. Operator will add shortcodes so "
        "one edit updates every template (Excel CHG-011).",
        bold_lead="Reviews.",
    )
    bullet(
        doc,
        " Some numbers are for Panama pages and some are for Miami pages. That is intentional. "
        "Do not unify NAP.",
        bold_lead="Phones.",
    )
    bullet(
        doc,
        " Inventory widget vs listing prices, inclusions copy, Fendi hub-vs-listing — out of "
        "scope. Do not ticket.",
        bold_lead="Hub / pricing.",
    )
    add_p(
        doc,
        "What remains a ticket: indexed junk; a URL whose live H1 is a different city or entity "
        "than the slug; a URL that collapses to another template (so it is not ranking on its "
        "own); orphan/404 listing links; Panama assets in a Miami folder; thin TEST tips.",
    )

    heading(doc, "1. Verdict", 1)
    add_p(
        doc,
        "The site is a strong commercial catalog. Feeling Yachty already has the hard parts of "
        "charter SEO: real inventory, visible prices, WhatsApp and GHL booking paths, reviews, "
        "and two real destinations that each have a ranking URL. Under the operator lock, the "
        "next test is not “one owner per cluster.” It is: can every page and every city rank on "
        "its own, with an H1 that matches the slug, and without junk or collapsed aliases in the way."
    )
    add_p(
        doc,
        "In plain language under the operator lock: home is the Miami ranker, Panama is its own "
        "ranker, and every other city/page is allowed to rank too. Cost of retrieval now is a URL "
        "that cannot rank for itself — wrong-city H1, collapsed alias, or indexed junk — not "
        "“too many Miami hubs.”",
    )

    add_table(
        doc,
        ["Lens", "Score", "What I saw"],
        [
            score_row("Source context", 4, "Operator lock: homepage is the Miami ranker. Panama is its own ranking URL. That is the intended two-city map."),
            score_row("EAV completeness (listings)", 4, "Cards and Panama routes expose size, capacity, hours, price. Strong."),
            score_row("EAV completeness (money hubs)", 3, "Hubs share a widget (out of scope). Remaining issue is unique H1/first passage per query."),
            score_row("Intent / format match", 3, "Catalog + filters match DO intent. KNOW answers are late or duplicated."),
            score_row("Information gain", 3, "Birthday itinerary tip is excellent. Most hubs do not add unique facts."),
            score_row("Internal bridges", 2, "Many folders, same boats. Orphan /miami-yacht-rental/{boat}/ links are still a ticket."),
            score_row("Own-page ranking", 2, "Specials/deals/rentals-plural collapse to another template. FTL/destinations/sales/reviews H1s are the wrong entity."),
            score_row("Trust / identity", 3, "City phones intentional. Review integers move to shortcodes. Hub pricing out of scope."),
        ],
    )
    add_p(
        doc,
        "Overall (operator-adjusted): strategy is locked. Remaining work is subtraction of junk, "
        "un-collapsing aliases, and making each slug’s live H1 match the city/query it is supposed "
        "to rank for. Do not merge hubs. Do not rewrite the homepage off Miami.",
        bold=True,
    )

    heading(doc, "2. Method and limits", 1)
    bullet(doc, "Sitemap source: https://feelingyachty.com/sitemap_index.xml (28 child sitemaps).")
    bullet(doc, "Parsed 1,721 unique <loc> URLs on 14 August 2026 (861 English, 860 Spanish /es/).")
    bullet(
        doc,
        "Scraped live pages including home, Miami rental, Miami charters, Panama rentals, cheap, "
        "affordable, Fort Lauderdale, contact, crew, reviews, pink rentals, book, a vessel listing "
        "(/fleet/miami/26ft-bayliner-fendi/), a tip (/miami-yacht-tips/birthday-yacht-itinerary-miami/), "
        "/test/, and /es/.",
    )
    bullet(
        doc,
        "Brand and head-term search snapshots via Firecrawl (not Google Search Console). A snapshot "
        "is not a ranking history.",
    )
    bullet(
        doc,
        "Framework: skills/seo-corey-tongberg (public Holistic SEO / Topical Authority materials by "
        "Koray Tuğberk GÜBÜR, operationalized for Feeling Yachty). Playbooks A–E and C scorecards.",
    )
    bullet(
        doc,
        "Cloudflare blocked raw datacenter curl. Pages were read through a browser scrape. Utility "
        "pages (cart, checkout) were confirmed in the sitemap, not fully shop-tested.",
    )
    add_p(
        doc,
        "I did not have GSC, GBP admin, or a full crawl of all 1,721 bodies. I did not invent "
        "which pages “rank.” I did inventory the graph and read the URLs that decide source context.",
        italic=True,
    )

    heading(doc, "3. Source context — operator-locked map", 1)
    add_p(
        doc,
        "Koray’s first rule is still lock source context. Feeling Yachty’s operating truth is a "
        "private yacht charter / experience brand serving Miami and Panama. The operator lock "
        "says how that map is expressed in URLs:",
    )
    add_p(
        doc,
        "The live homepage H1 is “Miami Yacht Rental.” That is intentional. Home is the URL that "
        "ranks most for Miami. Panama is not a homepage footnote problem — /panama-yacht-rentals/ "
        "already ranks in Panama and stays its own city page. Spanish /es/ is the Miami homepage "
        "twin, which is correct under this lock. hreflang (en-US, es-CO, en, es) is fine.",
    )
    heading(doc, "What “good” looks like under the lock", 2)
    bullet(doc, "Homepage keeps the Miami H1 and remains the Miami ranker.")
    bullet(doc, "/miami-yacht-rental/, /miami-yacht-charters/, cheap, affordable, luxury, directory, and capacity pages each rank for their own query. Do not 301 them together.")
    bullet(doc, "/panama-yacht-rentals/ stays the Panama ranker. Do not merge it into home.")
    bullet(doc, "Fort Lauderdale can rank as its own city only if the live H1/body stay FTL (today the next H1 is North Miami).")
    bullet(doc, "A URL that collapses to another template is not ranking on its own — un-collapse it or accept it as an alias.")

    heading(doc, "4. Sitemap inventory (facts)", 1)
    add_p(doc, "Child sitemaps in the index (Yoast-style WordPress + custom post types + WooCommerce):")
    add_table(
        doc,
        ["Child sitemap", "URLs in file", "What it is"],
        [
            ["product-sitemap.xml", "592", "Woo products — yachts and catering SKUs"],
            ["miami_yacht_tips-sitemap.xml", "248", "Miami tips / auto-blog layer"],
            ["panama_yacht_tips-sitemap.xml", "192", "Panama tips / auto-blog layer"],
            ["page-sitemap.xml", "152", "WordPress pages (hubs, utilities, tests)"],
            ["msy_rentals-sitemap.xml", "74", "Miami super-yacht rentals CPT"],
            ["miami-mega-yachts-sitemap.xml", "56", "Mega yacht CPT"],
            ["miami-yacht-location-sitemap.xml", "48", "Location / neighborhood pages"],
            ["miami-yacht-specials-sitemap.xml", "44", "Specials / cheap-folder listings"],
            ["ft-lauderdale-events-sitemap.xml", "42", "Fort Lauderdale events"],
            ["miami-yacht-venue-sitemap.xml", "40", "Event-venue yachts"],
            ["video-sitemap.xml", "38", "Video attachments"],
            ["category-sitemap.xml", "34", "Blog / fleet categories"],
            ["panama_yacht_cpt-sitemap.xml", "28", "Panama yacht CPT"],
            ["miami-yacht-party-sitemap.xml", "28", "Occasion / party CPT"],
            ["ftlauderdale-charter-sitemap.xml", "26", "FTL charter CPT"],
            ["miami-yacht-charters-sitemap.xml", "26", "Charter CPT"],
            ["miami-yacht-services-sitemap.xml", "22", "DJ, catering, photo, chef…"],
            ["miami-water-sports-sitemap.xml", "18", "Water sports"],
            ["product_cat-sitemap.xml", "14", "Woo categories"],
            ["Other CPTs / tips / local", "—", "Pink yacht, menus, tours, maintenance, KML"],
        ],
    )
    add_p(doc, "English URL folder counts (unique EN paths):")
    add_table(
        doc,
        ["Folder / stem", "EN URLs", "Framework note"],
        [
            ["/fleet/…", "296", "Real vessels + catering products. Prices baked into slugs."],
            ["/miami-yacht-tips/…", "125", "Outer section. Homepage cards labeled “automation”."],
            ["/panama-yacht-tips/…", "97", "Outer section. Same risk as Miami tips."],
            ["/miami-super-yacht-rentals/…", "37", "Overlaps mega / luxury / 75ft+ hubs."],
            ["/miami-mega-yachts/…", "28", "Same entity type, second folder."],
            ["/miami-yacht-location/…", "24", "Valid attribute expansion if facts stay local."],
            ["/cheapest-yacht-rentals/…", "22", "Third copy of many Miami boats."],
            ["/ft-lauderdale-events/…", "21", "City identity must stay Fort Lauderdale."],
            ["/miami-yacht-venue/…", "20", "Occasion/venue vs rental cannibalization risk."],
            ["/panama-yacht-rentals/…", "16", "Core. Keep and reinforce."],
            ["/miami-yacht-party/…", "15", "Occasion cluster — assign one owner."],
            ["/miami-yacht-charters/…", "14", "Near-duplicate of /miami-yacht-rental/."],
        ],
    )
    add_p(
        doc,
        "1,721 indexable URLs is not automatically “topical authority.” Koray’s cost-of-retrieval "
        "warning applies: a newsfirehose or SKU firehose raises crawl cost without raising "
        "competence. Catering SKUs such as "
        "/fleet/miami-catering/fettuccine-alfredo-350-serves-13-guests-italian-catering-by-feeling-yachty/ "
        "are products, not topical nodes. Panama vessels sitting under /fleet/miami-catering/ "
        "(Ocean Phoenix, Parker Monaco) are folder-level identity errors.",
    )

    heading(doc, "5. Own-page registry (operator-adjusted)", 1)
    add_p(
        doc,
        "Operator lock: every page and every city ranks on its own. The table below is not a merge "
        "list. It is which URL is allowed to rank for which query, and what still blocks that URL "
        "from ranking for itself.",
    )
    add_table(
        doc,
        ["Query / page", "Ranking URL (keep)", "What still blocks own-page ranking", "Decision"],
        [
            [
                "Miami yacht rental (home)",
                "https://feelingyachty.com/",
                "Nothing strategic. H1 Miami Yacht Rental is the point.",
                "KEEP. Do not rewrite off Miami.",
            ],
            [
                "Miami yacht rental (hub)",
                "/miami-yacht-rental/",
                "Plural /miami-yacht-rentals/ collapses here, so the plural slug is not ranking on its own.",
                "KEEP hub. Un-collapse or accept the alias (CHG-012).",
            ],
            [
                "Miami yacht charters",
                "/miami-yacht-charters/",
                "Shared widget is out of scope. Needs a unique H1/first passage for “charters.”",
                "KEEP as its own ranker. Do not 301.",
            ],
            [
                "Cheap / affordable Miami",
                "Both URLs keep their own slug",
                "/yacht-specials/ and /miami-yacht-deals/ resolve to the cheap template.",
                "KEEP cheap and affordable. Un-collapse specials/deals or accept as aliases.",
            ],
            [
                "Pink yacht Miami",
                "/miami-pink-yacht-rentals/",
                "Listings support it. Fine.",
                "KEEP.",
            ],
            [
                "Capacity (20 / 30 / 50 / 100)",
                "Each capacity URL",
                "/l00-person-yacht-rentals/ is a typo, so it cannot rank for 100-person.",
                "KEEP 20/30/50. Fix the 100-person slug.",
            ],
            [
                "Fort Lauderdale charter",
                "/fort-lauderdale-yacht-rentals/",
                "Next H1 is “Best North Miami Yacht Rentals.”",
                "Rewrite body to stay FTL if this city is meant to rank on its own.",
            ],
            [
                "Panama yacht rental",
                "/panama-yacht-rentals/",
                "Already ranks. Sales slug is Miami copy.",
                "KEEP hub. Fix /panama-yacht-sales/ if that page should rank.",
            ],
            [
                "Single vessel (example: Fendi)",
                "/fleet/miami/26ft-bayliner-fendi/",
                "Hub vs listing price noted; operator said hub/pricing is out of scope.",
                "Leave pricing. 301 only a thin second URL for the same boat.",
            ],
        ],
    )

    heading(doc, "6. Page scorecards (Playbook C)", 1)
    heading(doc, "6.1 Homepage  ·  feelingyachty.com/", 2)
    add_p(
        doc,
        "Central entity claimed: Miami yacht rental. That matches the operator lock — home is the "
        "Miami ranker. Same pricing widget as other Miami hubs (out of scope). Tips module is tagged "
        "“automation” in the scrape (bachelor cost, bachelorette decorations). That is the n8n "
        "auto-blog leaking onto the Miami ranker; prune thin tips, do not change the H1.",
    )
    add_table(
        doc,
        ["Dimension", "Score", "Note"],
        [
            score_row("Source context", 4, "Miami H1 on purpose. Panama has its own ranking URL."),
            score_row("EAV", 3, "Widget has size/price/capacity. Hub pricing out of scope."),
            score_row("Intent / format", 4, "DO catalog on the URL that already ranks for Miami."),
            score_row("Information gain", 2, "Trust badges + founder line. Tips labeled automation."),
            score_row("Bridges", 2, "Tips all point at /miami-yacht-tips/. Panama is a separate city page."),
            score_row("Own-page ranking", 4, "This is the Miami ranker. Do not move Miami off /."),
            score_row("Trust", 3, "Review integers move to the shortcode. Phones stay city-specific."),
        ],
    )
    add_p(doc, "Decision: KEEP. Homepage stays the Miami ranker.", bold=True)

    heading(doc, "6.2 Miami money pair  ·  /miami-yacht-rental/  and  /miami-yacht-charters/", 2)
    add_p(
        doc,
        "These are the same page with different lipstick. Both open with 400+ boats, the same "
        "WhatsApp script, the same GHL booking widget, the same “How Miami Yacht Rental Pricing Works” "
        "block, and the same filter UI. Counts on the scrape: rental hub “27 of 49 yachts”; charters "
        "hub “27 of 178 yachts”; homepage “27 of 178.” If those numbers are filters, the copy still "
        "says 400+ everywhere. That is an information-gap and a trust gap.",
    )
    add_p(doc, "Decision: KEEP both. Each ranks for its own query. Unique H1/first passage — do not 301.", bold=True)

    heading(doc, "6.3 Cheap vs affordable", 2)
    add_p(
        doc,
        "/cheap-yacht-rentals-miami/ H1: “Cheap Yacht Rentals in Miami With All Fees Included.” "
        "/affordable-yachts-rentals-miami/ H1: “Affordable Yacht Rentals in Miami With All Fees Included.” "
        "Same four benefit blocks, same payment line (Klarna / Affirm / crypto), same inventory widget. "
        "Affordable adds “Every Charter Includes: Captain, Crew, Fuel…” and then the shared widget says "
        "“Crew and fuel are additional.” That is a contradiction on the same URL.",
    )
    add_p(doc, "Decision: KEEP both as own rankers. Hub/widget pricing is out of scope. Specials/deals that collapse here are CHG-012.", bold=True)

    heading(doc, "6.4 Panama  ·  /panama-yacht-rentals/", 2)
    add_p(
        doc,
        "This is the best money page I read. Central entity is clear. Pricing is route-based "
        "(Panama Bay vs Taboga vs Contadora vs Colón) — that is real EAV, not synonym stuffing. "
        "Filters by vessel type, size, and group size. WhatsApp uses +507 202-1729. "
        "Keep this pattern. Do not let Panama tips and maintenance pages outgrow it.",
    )
    add_table(
        doc,
        ["Dimension", "Score", "Note"],
        [
            score_row("Source context", 4, "Panama charter operator. Distinct from Miami."),
            score_row("EAV", 4, "Route × duration × price on cards."),
            score_row("Intent / format", 4, "Catalog matches commercial-investigation."),
            score_row("Information gain", 3, "Route pricing is the unique gain. Deepen inclusions/exclusions."),
            score_row("Bridges", 3, "Needs tighter links from tips and tours back to this owner."),
            score_row("Cannibalization safety", 3, "Directory / party / sales exist but are not clones of this hub."),
            score_row("Trust", 4, "City phone on this page is intentional (operator)."),
        ],
    )
    add_p(doc, "Decision: KEEP. Already ranks in Panama. Do not merge into the homepage.", bold=True)

    heading(doc, "6.5 Fort Lauderdale  ·  /fort-lauderdale-yacht-rentals/", 2)
    add_p(
        doc,
        "First H1: Fort Lauderdale yacht rentals. Immediate second H1: “Best North Miami Yacht Rentals.” "
        "Body: Haulover, Sunny Isles, Bal Harbour, then links to Miami Beach and Fort Lauderdale. "
        "“We are the ONLY company in Miami that gives away A FREE HOUR.” Superlative + wrong city "
        "on a Fort Lauderdale slug. Typos (“Avaliable”). Older template than the Miami neon inventory.",
    )
    add_p(doc, "Decision: rewrite so this URL can rank as Fort Lauderdale. If the next H1 stays North Miami, FTL cannot rank on its own.", bold=True)

    heading(doc, "6.6 Vessel listing  ·  /fleet/miami/26ft-bayliner-fendi/", 2)
    add_p(
        doc,
        "Gallery-first listing with Woo booker. Attributes exist (duration, passenger count, deposit rule). "
        "Problems: the Miami rental hub card for the same boat says From $800 / 4 hours / max 13 guests. "
        "The listing shows $500.00 due today and a passenger selector that goes to 40. If 13 is the legal "
        "cap, a 40-person selector is a safety and trust defect, not an SEO nit. "
        "A cheapest-folder twin also exists. One vessel, one URL.",
    )
    add_p(doc, "Decision: hub/listing price is out of scope (operator). 301 only a thin second URL for the same boat.", bold=True)

    heading(doc, "6.7 Outer node that works  ·  /miami-yacht-tips/birthday-yacht-itinerary-miami/", 2)
    add_p(
        doc,
        "This is what Koray actually wants from outer content. Quick answer in the first screen. "
        "Duration, group size, boarding, itinerary templates (4-hour / 6-hour / sunset). Bridges to "
        "/30-person-yacht-rental-miami/ and /yacht-safety-protocols/. Operator tone, not encyclopedia tourism. "
        "Use this as the quality gate for every tip. Most of the 222 tip URLs will not pass it.",
    )
    add_p(doc, "Decision: keep. Make it the KNOW owner for birthday itinerary. Do not let a second birthday guide spawn.", bold=True)

    heading(doc, "6.8 Indexed junk", 2)
    add_p(doc, "These are in the sitemap. They should not be:")
    bullet(doc, "https://feelingyachty.com/test/ — H1 “TEST” plus a 227-yacht inventory clone.")
    bullet(doc, "https://feelingyachty.com/test-page/")
    bullet(doc, "https://feelingyachty.com/miami-sailing-tips/test/")
    bullet(doc, "https://feelingyachty.com/maintenance-tips/test-yacht-maintenance-tips/")
    bullet(doc, "https://feelingyachty.com/event-services-panama/test-event-services/")
    bullet(doc, "https://feelingyachty.com/panama-yacht-services/panama-yacht-services-test/")
    bullet(doc, "https://feelingyachty.com/cart/ and /checkout/ and /confirmed/")
    bullet(doc, "https://feelingyachty.com/elementor-52093/ and /12-2/ and /3-party-form/")
    bullet(doc, "https://feelingyachty.com/l00-person-yacht-rentals/ — typo of 100.")
    add_p(doc, "Decision: noindex + remove from sitemap this week. Tests are not “content.”", bold=True)

    heading(doc, "7. Brand identity and Brand SERP", 1)
    add_p(
        doc,
        "Playbook E: the brand query should resolve to a yacht charter operator with a stable story. "
        "Snapshot for “Feeling Yachty” (Firecrawl search, 14 August 2026): official site, "
        "Instagram @feeling.yachty, Yelp, Tripadvisor, Trustpilot, Facebook. Panama is an emoji on "
        "Instagram, not a second Brand SERP estate. Operator lock: Miami vs Panama phone numbers "
        "are intentional. Do not unify them."
    )
    add_table(
        doc,
        ["Surface", "Identifier seen", "Conflict"],
        [
            ["Site CTAs (Miami)", "+1 (954) 246-3636", "Primary on-site Miami number"],
            ["Crew page SMS", "+1 (754) 325-3827", "Third US number on an identity page"],
            ["Yelp + Facebook snapshot", "(786) 352-8857", "Does not match the site hero number"],
            ["Yelp address snapshot", "3201 NW 24th Street Rd, Fl 2, Miami, FL 33142", "Must match GBP + footer + schema or be removed"],
            ["Panama rentals page", "+507 202-1729", "WhatsApp and tel on the money page"],
            ["Contact page Panama", "+507 202-1279", "Two digits swapped vs the money page"],
            ["Review counts on-site", "1,300+ / 2,400+ / 2,500+ / 2,700+", "Four different claims across FTL, home, cheap, crew"],
            ["Fleet size on-site", "400+ vs 178 vs 49 vs 31 vs 227", "Pick a definition (unique bookable vessels) and use it"],
        ],
    )
    add_p(
        doc,
        "Jason Barnard’s Brand SERP point (as Koray cites it): corroboration. Third-party profiles "
        "may still show older Miami numbers. That is a listings-cleanup item if you want it later — "
        "not a reason to change the city-specific numbers on the site. Review integers go to the shortcode."
    )
    add_p(
        doc,
        "Head-term snapshot: “private yacht charter Miami” returned directories and competitors "
        "(YachtCharterFleet, Tropicalboat, Miami Charters, Prime Luxury, Biscayne Lady, Getmyboat) "
        "in the first results of this pull. feelingyachty.com did not appear in that short snapshot. "
        "That is not a GSC report. It is a reminder that synonym hubs are not the same as winning the "
        "query network.",
        italic=True,
    )
    add_p(
        doc,
        "“yacht charter Panama” snapshot was international crewed-week directories and a Panama City Beach, "
        "Florida false friend. Your Panama page’s route-level EAV is the correct counter to that SERP. "
        "Use Taboga / Contadora / San Blas facts you can stand behind — do not copy Miami sandbar copy.",
    )

    heading(doc, "8. What still blocks a URL from ranking on its own", 1)
    add_p(
        doc,
        "Operator lock: phones and hub/pricing are out of scope. Review integers move to shortcodes. "
        "These rows are the remaining own-page blockers.",
    )
    add_table(
        doc,
        ["Fact", "Version A", "Version B", "Disposition"],
        [
            ["Reviews", "1,300+ / 2,400+ / 2,500+ / 2,700+", "Hard-coded while the brand grew", "CHG-011 shortcode. Operator will add."],
            ["City", "FTL slug", "North Miami H1", "CHG-007. FTL cannot rank as FTL until the body stays FTL."],
            ["Destinations slug", "/miami-yacht-destinations/", "Live content is List your boat", "CHG-007. Cannot rank for destinations."],
            ["Panama sales slug", "/panama-yacht-sales/", "Live content is Miami rental", "CHG-007. Cannot rank as Panama sales."],
            ["Reviews slug", "/feeling-yachty-reviews/", "Jet Ski H1", "CHG-007. Cannot rank as reviews."],
            ["Collapsed URLs", "/yacht-specials/, /miami-yacht-deals/, /miami-yacht-rentals/", "Resolve to another template", "CHG-012. Not ranking on their own."],
            ["Indexed junk", "/test/, cart, checkout, Elementor leftovers", "In the sitemap", "CHG-004. noindex / drop."],
            ["Inclusions / Fendi price / phones", "Seen on scrape", "Operator lock", "Out of scope. Do not ticket."],
        ],
    )

    heading(doc, "9. Topical map as it exists vs as it should", 1)
    heading(doc, "Core today (keep)", 2)
    bullet(doc, "Miami charter inventory (one hub + /fleet/miami/{vessel}/).")
    bullet(doc, "Panama charter inventory (keep /panama-yacht-rentals/ + Panama vessel CPTs).")
    bullet(doc, "Occasions that you actually sell: birthday, bachelorette, corporate, party — one hub each.")
    bullet(doc, "Yacht classes you actually sell: pink, sail, fishing, mega/superyacht — one hub each, not three.")
    bullet(doc, "Services that attach to a charter: catering, DJ, photo — as add-on hubs, not 100 SKU URLs if they dilute.")
    bullet(doc, "Identity: contact, crew/safety, reviews, charter agreement.")
    heading(doc, "Outer today (keep only with bridges)", 2)
    bullet(doc, "Tips that look like the birthday itinerary: process, routes, objections, what to bring.")
    bullet(doc, "Location pages with real marina/pickup facts (Miami Beach, River, Haulover) — not keyword mirrors.")
    bullet(doc, "Panama routes: Taboga, Contadora, Colón, San Blas — only if ops runs them.")
    heading(doc, "Reject / prune / noindex", 2)
    bullet(doc, "Test URLs, Elementor leftovers, cart/checkout, typo slugs.")
    bullet(doc, "Second and third copies of the same vessel in /cheapest-yacht-rentals/ and mega/super twins.")
    bullet(doc, "Tips that exist only because the auto-blog fired (homepage already labels them “automation”).")
    bullet(doc, "Panama maintenance / cleaning / visual-check pages unless you truly sell yacht care as a line of business with a roof context. If they are thin, they dilute charter identity.")
    bullet(doc, "Horseback riding Panama as a yacht-site node unless it is a real packaged add-on with a booking path.")

    heading(doc, "10. Auto-blogging and cost of retrieval", 1)
    add_p(
        doc,
        "n8n workflow “Feeling Yachty - WordPress Auto Blogging” (gKezuNipPn2PjqTV) is active in your "
        "ops docs. The homepage tip cards scrape with the word “automation.” Miami + Panama tip sitemaps "
        "were rewritten 14 August 2026 (same day as this audit). That is a publishing firehose.",
    )
    add_p(
        doc,
        "Koray’s SaaS / newsfirehose warning applies. 222 tip URLs can help if each one closes an "
        "information gap and bridges to a money owner. They hurt if they repeat “yacht rental Miami” "
        "with a new title. PACMAN rule already on file: n8n topics must be on the map. Until the map "
        "and ownership table exist, pause net-new tip publishing. Prune or noindex the tests. Keep "
        "the birthday itinerary class of post.",
    )

    heading(doc, "11. Spanish / hreflang", 1)
    add_p(
        doc,
        "Almost 1:1 EN/ES URL count (861 / 860) means you cloned the graph, including the problems. "
        "hreflang tags on the page sitemap are present. Good. Do not translate junk. Spanish home "
        "is the Miami homepage twin (“Alquiler de yates en Miami”) — that is correct under the "
        "operator lock. When you change an English URL, apply the same action to its /es/ twin "
        "in the same deploy. Do not merge ES Panama into ES Miami home."
    )

    heading(doc, "12. What is already working (do not break)", 1)
    bullet(doc, "Commercial machinery: WhatsApp deep links, click-to-call, GHL scheduling widget (LeadConnector).")
    bullet(doc, "Listing cards with duration × price tables. Panama route × price tables.")
    bullet(doc, "Filters (size, pink, free hour, budget) — keep them; do not use filters as a reason to 301 hubs.")
    bullet(doc, "Founder attribution and Tripadvisor / review surfaces — wire counts to the shortcode.")
    bullet(doc, "hreflang scaffolding.")
    bullet(doc, "The birthday itinerary tip as a model outer node.")
    bullet(doc, "Panama money page structure — keep it; do not fold it into the homepage.")

    heading(doc, "13. Priority queue (operator-adjusted)", 1)
    add_p(doc, "Tier 0 — junk and shortcodes. Ship before any new blog node.", bold=True)
    bullet(doc, "Noindex tests, cart, checkout, Elementor leftovers (Excel CHG-004).")
    bullet(doc, "Review shortcode so one edit updates every template (Excel CHG-011). Operator is adding this.")
    bullet(doc, "Leave city phones and hub/listing prices alone.")
    add_p(doc, "Tier 1 — each page/city ranks on its own.", bold=True)
    bullet(doc, "Homepage stays the Miami ranker. Panama hub stays the Panama ranker.")
    bullet(doc, "Do not 301 Miami hubs together. Give each URL a unique H1/first passage for its query.")
    bullet(doc, "Un-collapse /yacht-specials/, /miami-yacht-deals/, /miami-yacht-rentals/ or accept them as aliases (CHG-012).")
    bullet(doc, "Fix wrong-entity slugs so they can rank for themselves: FTL≠North Miami, destinations≠list-your-boat, panama-sales≠Miami rental, reviews≠jet ski, /l00-person/ typo (CHG-007).")
    add_p(doc, "Tier 2 — map and outer.", bold=True)
    bullet(doc, "Keep/upgrade tips that help a city/page rank (birthday-itinerary bar). Prune TEST and thin automation posts.")
    bullet(doc, "Move Panama vessels out of /fleet/miami-catering/.")
    bullet(doc, "Fix orphan /miami-yacht-rental/{boat}/ links that are not in the sitemap.")
    add_p(doc, "Tier 3 — reinforcement.", bold=True)
    bullet(doc, "Deepen unique facts on each ranking URL (not a single merged owner).")
    bullet(doc, "Spanish twin follows the English page it translates. Do not merge ES Panama into ES Miami home.")

    heading(doc, "14. Open facts needed from ops (do not invent)", 1)
    bullet(doc, "Which review integer the shortcode should print, and which platforms it includes.")
    bullet(doc, "Whether Fort Lauderdale / Haulover is meant to rank as its own city (if yes, the H1/body must stay FTL).")
    bullet(doc, "Whether Panama yacht sales is a real sold line (live page is Miami rental copy).")
    bullet(doc, "Whether /yacht-specials/ and /miami-yacht-deals/ should become unique rankers or stay aliases.")
    bullet(doc, "Whether every /es/ URL is a true translation or a stub.")

    heading(doc, "15. Megaman’s read", 1)
    add_p(
        doc,
        "Got it. Home is the Miami ranker. Panama already has its own ranking URL. The job is "
        "not to merge hubs — it is to make every page and every city able to rank on its own. "
        "Phones stay city-specific. Review counts move to shortcodes as you grow. Hub pricing "
        "is out of scope.",
    )
    add_p(
        doc,
        "The remaining work is subtraction of junk, un-collapsing aliases, and fixing slugs "
        "whose live H1 is a different city or entity. Corey stays approval-gated on the Excel "
        "CHANGE_QUEUE. Pacman verifies live.",
    )
    add_p(
        doc,
        "This document is the audit. Approve tickets in the Excel. I will not reopen OP-001 or OP-002.",
        italic=True,
    )

    heading(doc, "Appendix A — Ranking URLs (operator lock)", 1)
    add_table(
        doc,
        ["Cluster", "Ranking URL"],
        [
            ["Miami (homepage ranker)", "https://feelingyachty.com/"],
            ["Miami rental (own page)", "https://feelingyachty.com/miami-yacht-rental/"],
            ["Miami charters (own page)", "https://feelingyachty.com/miami-yacht-charters/"],
            ["Panama (already ranks)", "https://feelingyachty.com/panama-yacht-rentals/"],
            ["Contact (city phones OK)", "https://feelingyachty.com/contact-feeling-yachty/"],
            ["Safety / crew", "https://feelingyachty.com/feeling-yachty-crew/"],
            ["Reviews (fix Jet Ski H1)", "https://feelingyachty.com/feeling-yachty-reviews/"],
            ["Pink Miami", "https://feelingyachty.com/miami-pink-yacht-rentals/"],
            ["Party / occasion Miami", "https://feelingyachty.com/miami-yacht-party/"],
            ["Birthday KNOW", "https://feelingyachty.com/miami-yacht-tips/birthday-yacht-itinerary-miami/"],
            ["Vessel pattern", "https://feelingyachty.com/fleet/miami/{vessel-slug}/"],
            ["Book / convert", "https://feelingyachty.com/book/  (login — do not let it rank as a money clone)"],
        ],
    )

    heading(doc, "Appendix B — Attribution", 1)
    add_p(
        doc,
        "Framework concepts: publicly published Holistic SEO / Topical Authority materials by "
        "Koray Tuğberk GÜBÜR (you call this Corey / Cori Tongberg). Brand SERP language also "
        "follows Jason Barnard as cited in those materials. This audit is PACMAN operationalization "
        "for Feeling Yachty. It does not use or claim Koray’s paywalled course. It does not forecast "
        "traffic.",
    )
    add_p(
        doc,
        "Primary evidence: feelingyachty.com sitemap_index.xml and the live URLs listed in §2, "
        "scraped 14 August 2026.",
    )

    doc.save(OUT)
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
