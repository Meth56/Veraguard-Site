# VeraGuard website

Static site for veraguard.ca (plain HTML, CSS and one small JS file). No build step, no dependencies, no secrets.

**This repo is public.** Never add secrets, email lists, leads or customer data here.

## Publish with GitHub Pages (owner steps)

1. Create a new public repo (for example `veraguard-site`) and push these files to `main`.
2. Repo Settings > Pages > Deploy from branch > `main` / root.
3. Custom domain: enter `veraguard.ca` in Pages settings (this creates a `CNAME` file).
4. In GoDaddy DNS add the GitHub Pages A records and a `www` CNAME to `<user>.github.io`. Leave all existing mail records unchanged.
5. Search Console: add the domain property and verify with the single DNS TXT record.
6. Enable "Enforce HTTPS" in Pages settings once the certificate is ready.

## Before launch checklist

- [ ] Mailing address: replace every `data-todo="mailing-address"` element (footer on every page, and contact.html).
- [ ] Google Analytics: create a GA4 property and put the measurement ID (`G-...`) in `GA_MEASUREMENT_ID` in `assets/site.js`. The ID is public, not a secret. Analytics only loads after the visitor accepts.
- [ ] Logo and product photos: owner uploads them. Studio-quality images made from them must carry the caption "Representative image".
- [ ] Quote form fields: confirm the list with the owner (see below).
- [ ] Confirm which floor types the roll is suitable for before adding any list to How It Works.

## Quote form

The form opens the visitor's email app with the details filled in (`mailto:sales@veraguard.ca`). Nothing is stored or sent to a third party. Fields proposed: name, company, email, phone (optional), type of work, rolls needed, job site city or postal code, needed by (optional), details. If the owner later wants server-side delivery, use a form service with its own account and keep any key out of this repo.

## Analytics events (GA4, after consent)

`quote_submit` (quote form), `email_click` (mailto links), `phone_click` (tel links). Page views and traffic source come from GA automatically.

## UTM tags for email campaign links

Use this pattern on every link to the site in outreach emails:

```
https://veraguard.ca/?utm_source=email&utm_medium=outreach&utm_campaign=<campaign>&utm_content=<template>
```

- `utm_source`: always `email`
- `utm_medium`: always `outreach`
- `utm_campaign`: for example `flooring-gta-2026-10`
- `utm_content`: the template name, for example `intro_flooring`

Use lowercase and hyphens only. Never put names, email addresses or other personal data in UTM values.
## Claims rules

- Only product facts: 3 layers, water-resistant top film, self-adhesive, 36 in x 100 ft (300 sq ft), about 12 lb, 59.99 CAD + HST per roll (0.20 CAD per sq ft).
- No fire, slip or "waterproof" claims. "Test a small area first" stays visible.
- No samples. Delivery: 3 or more rolls, within 30 km in the GTA, further on request.
- The only name on the site is "VeraGuard".
- Do not copy any competitor's catalogue text or images.
