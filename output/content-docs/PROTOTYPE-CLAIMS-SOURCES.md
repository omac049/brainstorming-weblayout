# Content docs (claims + sources)

**Use the Word files** — sources sit under each claim in page order:

| File | Page |
|------|------|
| [`request-info-v5-content.docx`](./request-info-v5-content.docx) | `/success/request-info-v5` |
| [`degree-programs-v7-content.docx`](./degree-programs-v7-content.docx) | `/success/degree-programs-v7` |
| [`online-college-courses-v5-content.docx`](./online-college-courses-v5-content.docx) | `/success/online-college-courses-v5` |
| [`program-finder-content.docx`](./program-finder-content.docx) | ProgramExplorer accordion + Careers block (all programs) |

Gray **Source:** lines are for the content team only (do not publish on the live site). Status labels: Verified · Update needed · Derived from policy · Needs source · Conflict — fix · Illustrative.

Regenerate after copy changes:

```bash
cd output/content-docs && python3 generate_content_docs.py
```

Optional spreadsheet of the same registry: [`prototype-claims-sources.csv`](./prototype-claims-sources.csv)  
ELT deck analytics (separate): [`../../data/claims-checklist.csv`](../../data/claims-checklist.csv)
