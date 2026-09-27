# ThaiCNX launch plan

Revised 27 September after adversarial reviews by Gemini 3.8, Codex (gpt-6-astra) and Fable (3 of 3 reported). What changed and why is at the end.

## Goal

Launch from the hackathon stage: people scan a QR code, browse this week's real events, request a spot, vote for the Thai experiences they want, nominate a Thai friend, and (for Thais) apply to host. Every submission reaches the team the same day.

**Honest scope:** there are no real Thai hosts yet. At launch, ThaiCNX is a real, accurate community calendar plus a demand-and-recruiting engine. Sample hosts stay clearly labelled, and a request for a sample experience is recorded as demand, not as a booking.

**Constraints:**
1. **Cheap to kill.** Separate from the private CM Events pipeline. One switch stops updates; one command takes the site down.
2. **Cheap to keep.** Events stay fresh from the calendar without a second routine.
3. **Accurate.** Every event shows its organiser's title, exact time, place and original listing link. Nothing is guessed forward.

## Phase 1: launch today

Built and tested already (commits 467b499 and 972bd32):
- **The app:** Explore, Calendar with map, Plans, account menu, tab bar on every page, Thai host side, Thai/newcomer badges, and ThaiCNX naming. Link-preview tags are ready but not committed yet.
- **Calendar integrity:** the exporter keeps organiser titles, times, places and listing links, and rewrites only descriptions. `verify_feed()` refuses to publish on any mismatch with the calendar, a past event, a private name or footer, or a dead link. It was proven against a deliberately broken control.
- **Submissions:** success shows only on an acknowledged write. Double taps, repeat votes and demo-only requests are handled.
- **Pitch deck:** a standalone copy at `presi/index.html` embeds the live app from the same site. Its QR code points to https://thaicnx.com.

Remaining, in order:

| # | Step | Who | Size |
|---|---|---|---|
| 1 | **Deploy to Vercel**: app at `/`, deck at `/presi` (`vercel deploy --prod` from `mycnx/`; `.vercelignore` keeps docs out) | agent, after the founder says "deploy it" | S |
| 2 | **Point thaicnx.com at Vercel**: add the two DNS records Vercel shows (apex A record, `www` CNAME) at All-Inkl, then add the domain to the Vercel project | founder (DNS), agent (Vercel domain) | S |
| 3 | **Google Sheet backend live**: create the sheet, paste `backend/apps-script.gs`, deploy it as a web app, set `API` in `index.html`, redeploy. One real test row, then delete it | founder (Google account), agent | S |
| 4 | **A named responder and a real channel**: who answers requests and host applications (a Thai speaker for applications), and one team LINE Official Account or WhatsApp number. Success screens then offer "Message us on LINE / WhatsApp" with that link | founder decides; agent wires the link | S |
| 5 | **Consent line under every form** (request, nominate, apply): "We store your name and contact only to arrange this. Ask us to delete it any time." EN and TH | agent | S |
| 6 | **Verification on production** with Playwright at 390×844 (the flows below), then the founder on a physical phone, including inside LINE's in-app browser (links from LINE open there) | agent, founder | S |

Launch verification flows (all must pass on the live URL):
1. Explore shows the 5 experiences, locals with Thai badges, the week's agenda and guest quotes.
2. Calendar shows real dated events only; the three filters, an event sheet with its listing link and map link, the map view.
3. Every event's "See the listing" link opens (spot-check 5 across Meetup, Todo.Today and Sola).
4. Request a spot: success only after the sheet row appears; the button turns "Requested"; a double tap makes one row.
5. Vote: one row per device; Plans lists it.
6. Nominate: the empty-field error, then one row; the invite names both people.
7. Host application in Thai: four steps, then one row.
8. Account menu, language switch, dark mode, tab bar on every page.
9. `/presi` loads, the embedded app works, and the QR code opens thaicnx.com.
10. Test rows are deleted from the sheet before the pitch.

## Keeping events fresh (the switch)

- **Today:** refreshing events means exporting and redeploying. One founder-run command does it: `python3 scripts/events/export_mycnx_feed.py` (it commits) and then `vercel deploy --prod` from `mycnx/`. The agent runs the deploy only on the founder's "deploy it".
- **Week 1:** move the feed out of the deploy, so `/cm-events-update` can refresh it with no deploy (Phase 2, step 1). Its last step runs only if `~/.config/thaicnx/enabled` exists. The founder creates that file; the agent never does. A failed export is reported and never fails the calendar run.
- **Kill:** delete the switch file (updates stop), then remove the Vercel project or domain (site down). The calendar pipeline is untouched either way.

## Phase 2: the real backend on Convex (decided 27 September)

Launch runs on the Google Sheet; the real product moves to **Convex**: database, backend functions and live queries, all in TypeScript. Chosen over Firebase and Supabase because the next features are live vote counts, host confirmations and group chat, which Convex's reactive queries give almost for free. Free tier covers the first thousands of users; switching is small because every write already goes through `send()` in `index.html`.

1. **Set up** (needs the founder: a Convex account and OK for `npm install convex` in the project). Keep the app a single page; add a small build only if Convex's browser client needs it.
2. **Schema and functions** (`convex/schema.ts`, mutations with argument validators): `events` (written by the exporter through an authenticated mutation, replacing `data/feed.json`), `requests` (with status: requested, confirmed, completed, cancelled), `votes` (one per device id), `nominations`, `applications`, `deletions`. Validation and rate limits live in the mutations, not the browser.
3. **Live queries:** vote counts and "people going" update on every open screen.
4. **Calendar hook:** `export_mycnx_feed.py` writes events through a Convex HTTP action with a deploy key kept in `~/.config/thaicnx/`. `/cm-events-update` runs it only if `~/.config/thaicnx/enabled` exists (created by the founder). A refresh no longer needs a site deploy.
5. **Admin view** (`#admin`, sign-in via Convex Auth, allowlisted team emails): requests per experience, votes per idea, applications, nominations, deletion requests, status changes, and the key metric.
6. **Group chat per confirmed session** (replaces "coming soon"), members only; no messages between strangers.
7. **Tests:** a committed Playwright suite for every flow against a Convex dev deployment, plus function tests that must reject bad input (a known-bad control that has to fail).
8. **Migration:** import any Google Sheet rows, then switch `send()` to Convex and retire the sheet.

## Out of scope

Payments (the team sends a PromptPay QR by hand after a real host confirms), host logins and dashboards, in-app chat (the Chats tab shows it as coming soon; confirmed groups get a LINE group), an affiliate programme, the TypeScript rewrite.

## Risks

| Risk | Mitigation |
|---|---|
| A request nobody answers | A named responder (step 4) and an email per new row from the sheet |
| Sample hosts taken as real | Labels on every sample surface; the request confirmation says the host is a sample |
| A wrong time or dead link | The exporter's integrity gate refuses to publish; verification flow 3 on launch day |
| Stale events on the site | Dated events only, so old ones simply disappear. A refresh is one command today and automatic from week 1 |
| A private name in the public feed | Titles strip "w/ Name"; the gate refuses leftovers such as "w/" or the maintainer footer |
| The sheet endpoint gets spammed | The endpoint only accepts four kinds; watch it. Firestore rules and App Check come in Phase 2 |
| LINE's in-app browser drops local data | Plans and votes are conveniences; the sheet is the record. Checked in step 6 |

## Open decisions for the founder

1. "Deploy it" for step 1, and the DNS records for step 2.
2. The responder, and one team LINE OA or WhatsApp number (step 4).
3. Which Google account owns the sheet (step 3).
4. Phase 2 only: the Google Cloud project with the credits, and OK to install `firebase-tools` and `@playwright/test`.

## What the reviews changed

- **Split into launch today and week 1** (all three reviews): Firestore, the admin view, rules tests and the organiser form moved to Phase 2. The already-built sheet backend carries the launch.
- **Submission integrity** (Codex): no success without an acknowledged write, a double-submit guard, votes remembered per device, and demo requests flagged. Done.
- **No invented dates** (Codex): weekly roll-forward removed; the calendar has no recurrence data. Done, and extended into the exporter's integrity gate.
- **Honest requests and a real responder** (Fable): the confirmation says the host is a sample, and the placeholder community manager "Ploy" was removed. Done. The named responder is decision 2.
- **A reachable channel** (Fable): a LINE ID alone can't be messaged, so the team offers its own LINE OA or WhatsApp link (step 4).
- **Consent at launch, not polish** (Fable, Gemini): step 5.
- **Admin security** (Gemini): `email_verified`, redirect sign-in and service-account key handling, all in Phase 2.
- **The exporter safeguard now exists** (Fable noted it was only claimed): `verify_feed()`, tested with a known-bad control.
- **Rejected:** an emergency admin key in the URL (Gemini), because a secret in a URL leaks through history and link previews.
