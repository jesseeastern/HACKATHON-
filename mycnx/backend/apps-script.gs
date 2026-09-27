// ThaiCNX sign-ups: paste into a Google Apps Script project bound to a Google Sheet.
// Every POST from the app becomes one row on the tab named after its kind.
// GET ?counts=1 returns vote totals for the known ideas only.

// Only these kinds and fields are stored; anything else is dropped.
const FIELDS = {
  requests: ["experience", "host", "date", "guests", "name", "contact", "total"],
  votes: ["idea"],
  nominations: ["friendFirstName", "idea", "nominator", "nominatorContact"],
  applications: ["name", "phone", "social", "english", "category", "title", "price", "cap", "days", "time"],
  deletions: ["name", "contact", "note"],
};
const COMMON = ["receivedAt", "kind", "lang", "createdAt"];
const KEEP_DAYS = 90;
const IDEAS = ["w-muaywomen", "w-salaw", "w-doi", "w-market", "w-thai", "w-football"];

function clean(v) {
  let s = typeof v === "object" ? JSON.stringify(v) : String(v === undefined ? "" : v);
  s = s.slice(0, 500);
  // A leading = + - @ would run as a spreadsheet formula; the apostrophe keeps it plain text.
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function doPost(e) {
  // Rate limit: at most 30 submissions a minute across the whole endpoint.
  const cache = CacheService.getScriptCache(), slot = "n" + Math.floor(Date.now() / 60000);
  const n = Number(cache.get(slot) || 0) + 1;
  if (n > 30) return out({ok: false, error: "busy"});
  cache.put(slot, String(n), 120);
  const rec = JSON.parse(e.postData.contents);
  rec.receivedAt = new Date().toISOString();  // server time, used for the 90-day purge
  const fields = FIELDS[rec.kind];
  if (!fields) return out({ok: false});
  if (rec.kind === "votes" && IDEAS.indexOf(rec.idea) < 0) return out({ok: false});
  const keys = COMMON.concat(fields);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(rec.kind) || ss.insertSheet(rec.kind);
  if (sh.getLastRow() === 0) sh.appendRow(keys);
  sh.appendRow(keys.map(k => clean(rec[k])));
  // The alert carries no personal data, so deleting the row deletes the data.
  try {
    MailApp.sendEmail(Session.getEffectiveUser().getEmail(), "ThaiCNX: new " + rec.kind.replace(/s$/, ""),
      "Row " + sh.getLastRow() + " on the '" + rec.kind + "' tab. Open the sheet to see it.");
  } catch (err) {}
  return out({ok: true});
}

function doGet() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("votes");
  const votes = {};
  if (sh && sh.getLastRow() > 1) {
    const rows = sh.getDataRange().getValues(), col = rows[0].indexOf("idea");
    rows.slice(1).forEach(r => { if (IDEAS.indexOf(r[col]) >= 0) votes[r[col]] = (votes[r[col]] || 0) + 1; });
  }
  return out({votes: votes});
}

// Run daily from a time-driven trigger (Triggers > Add trigger > purgeOld > Day timer).
// Deletes every row older than KEEP_DAYS on every tab, keeping the promise in the privacy note.
function purgeOld() {
  const cutoff = Date.now() - KEEP_DAYS * 86400000;
  SpreadsheetApp.getActiveSpreadsheet().getSheets().forEach(sh => {
    const rows = sh.getDataRange().getValues(); if (rows.length < 2) return;
    const col = rows[0].indexOf("receivedAt"); if (col < 0) return;
    for (let r = rows.length - 1; r >= 1; r--) {
      const t = Date.parse(rows[r][col]);
      if (!isNaN(t) && t < cutoff) sh.deleteRow(r + 1);
    }
  });
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
