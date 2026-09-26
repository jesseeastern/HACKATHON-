# Sign-ups backend (Google Sheet)

**Before setting `API`:** fill in the team contact and data holder in the privacy note (`PRIVACY` in `index.html`), and agree who handles deletion requests (the `deletions` tab).

When the app runs on its own, requests, votes, nominations and host applications are sent to a Google Sheet through a small Apps Script web app. Without it, the app runs in demo mode and nothing is sent.

## Set up (about 5 minutes)

1. Create a new Google Sheet, then open **Extensions → Apps Script**.
2. Replace the code with `apps-script.gs` from this folder and save.
3. **Deploy → New deployment → Web app.** Execute as: *Me*. Who has access: *Anyone*.
4. Copy the web app URL (ends in `/exec`).
5. In `../index.html`, set `const API = "<that URL>";` and redeploy the site.

Each kind of sign-up gets its own tab: `requests`, `votes`, `nominations`, `applications`, `deletions`. Only whitelisted fields are stored, and anything that looks like a formula is stored as plain text. You also get an email for every new row that says only which tab and row, with no personal data (Apps Script asks for mail permission on the first deploy). Add a `status` column to `requests` by hand (requested, confirmed, completed, cancelled): that is how the key metric is counted.

## Privacy

- Keep rows at most 90 days after the session or decision they were for, then delete them.
- A `deletions` row means someone asked to be removed: delete their rows on every tab within 7 days, then the deletion row itself.

- The sheet holds contact details people typed in. Share it only with the team.
- Nominations store the nominator's contact and the friend's first name only. The friend decides for themselves via the invite link.
