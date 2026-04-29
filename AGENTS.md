## Learned User Preferences

- For site and marketing research in this repo, use roughly **12 months** of data and lean on **GSC, GA4, and other connected tools** to keep numbers defensible.
- For deck or report claims about the **live site** (e.g. how many RFIs, where forms sit), **verify on the real pages** instead of inferring from older copy or aggregate labels.
- The **RFI** is the request-information **form**; it can appear on **many** pages, so avoid implying a **single** “primary RFI page” unless analytics or copy explicitly scope to one URL.
- When comparing or listing **organic pages to review**, treat **`online-degrees/` (program) routes** and **blog posts** as separate buckets because intent differs.
- For **benchmark or “others solved this”** content, **cite sources** for the figures shown.
- **LFS / LSF Leads** (wording varies in UI and docs) are **deduplicated** program leads; counts often **differ from GA4** and are not interchangeable with “all conversions” without matching definitions and filters.
- For **Google Ads** (notably **PMax**), the default **Conversions** total includes **only** conversion actions marked for that metric and may track **deeper-funnel** events—not necessarily form-fill or deduped lead volume. For **lead counts** and **cost per lead**, use **per–conversion-action** data (e.g. **LFS / LSF Leads**) or agreed CRM/lead definitions; do not treat headline **conversions** ÷ **spend** as CPL without confirming which actions are in the column. **Legacy Google Discovery** CPL figures are a weak benchmark—often **spam-heavy** and **de-prioritized or shut down**; do not stack them next to Search/PMax leads without that context.
- For **A vs B landing** pages, frame the story as **content and layout** around **shared or similar form patterns** when forms repeat; on **dark backgrounds**, keep **contrast and readability** solid (e.g. avoid near-black text on dark panels). Large **cross-URL** conversion gaps often reflect **traffic source and intent** (e.g. paid social vs paid search), not layout alone—tie narratives to **channel mix** and any tests that **held traffic constant**.
- For **ELT** slides, keep **Google Ads / ad-budget** material **light** when the speaker does not own that area, but **surface data gaps and metric definitions** where leadership needs accuracy while keeping the core **UX / visual** story (e.g. tuition, outcomes, start dates, testimonials, program depth).
- For **`index-v2.html`**, use **arrow-key navigation** for advancing slides; **do not** rely on (or do not add) **click-to-advance** on the slide surface if it makes the deck hard to use.
- Keep **`presenter.html` talking points** aligned with **`index-v2.html` text and order**; **punchlines** should be **comparative, plain-spoken, and easy to say** (wit helps when it fits the room).
- For **re-skin / roadmap** language in deck copy, use **grounded, accurate** phrasing the user approves (e.g. what improved visually vs. what is **next** for layout, structure, and paths), not claims that misfit program status.

## Learned Workspace Facts

- **Remote:** `git@github.com:omac049/brainstorming-weblayout.git`
- **Long-form deck:** `index.html` (~20 slides, source for extra pulls); **ELT cut:** `index-v2.html` (exec version); **presenter notes:** `presenter.html` (keyboard-synced, aligned to v2).
- **No in-repo Docker:** static HTML decks plus `data/` assets; there is **no** `Dockerfile` or `docker-compose` here—container work would be **additive**, not a fix to existing config.
- **Stakeholder shorthand:** **Kevin** — VP, Performance Marketing (paid, PMax, CPL and **conversion-action** definitions); **Christie** — Arizona Online (site experience, RFI/UX questions). Useful when attributing feedback or data ownership.
- **Paid search vs site:** full **University of Arizona Global Campus**-style terms often drive **more query volume** than **UAGC**-style shorthand in **paid search**; paid strategy may **emphasize the full name**—**site** navigational nickname use is **not** the same lens as **ads**.
- **Paid numbers** in `README.md`, `data/paid-source-data.md`, `data/claims-checklist.csv`, and related **`data/paid-*.csv`**: **headline “conversions”** in Ads-style tables and API pulls are **action-scoped**; **lead** claims need the matching **conversion action** or lead-system field—not the aggregate conversions column by default. After edits, keep **README**, markdown sources, **CSV** extracts, and **deck** copy **aligned**.
