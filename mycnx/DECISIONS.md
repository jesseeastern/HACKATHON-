# MyCNX: product decisions

This is why the prototype looks the way it does. The decisions were made during the Chiang Mai hackathon, 26 September 2026.

## In one line each

- **Who:** New long-stay arrivals in Chiang Mai (first 1 to 3 months, often on a DTV visa).
- **Problem:** They spend months in the expat bubble and never really meet Thai Chiang Mai.
- **Solution:** Small paid experiences with Thai locals, mixed into a free calendar of real community events.
- **Differentiator:** Only Thai locals host, in the places they actually go. Tours sell sights; expat events give you more expats.
- **For hosts:** Thais earn by showing newcomers their own Chiang Mai.

## Lean canvas

| | |
|---|---|
| Customer | Long-stay newcomers in their first months. Early adopters: members of nomad groups. Supply: English-speaking Thais who already work with foreigners (Muay Thai trainers, cooking-school staff, CMU students) |
| Problem | Expat-bubble isolation; tours feel staged; no trusted way to meet Thai people |
| Solution | Thai-hosted experiences (max 6 guests) + free community calendar + requests and votes that show demand |
| Unfair advantage | A live calendar of the city's recurring community events, and a team inside the nomad groups where demand lives |
| Channels | Nomad LINE, WhatsApp and Facebook groups; coliving and coworking spaces; CMU clubs for hosts |
| Key metric | Requests that turn into completed sessions per week |
| Revenue | 20% of each booking; the host keeps 80% |

## Pivot, 27 September: Thai Chiang Mai, not "go with a regular"

- **Why:** almost every event in our calendar is run by and for foreigners (in the 74-event snapshot of 26 September, a model-assisted tag put 55 as aimed mostly at internationals, 17 mixed and 2 mostly Thai; an estimate, not a survey). A Thai host taking you to an expat run club is a guest there too, not the insider. A Thai host *is* the insider at Muay Thai, markets, temples, family kitchens and karaoke.
- **Thai hosts only.** It keeps the promise ("meet Thai Chiang Mai") and matches the law: guiding is reserved for Thai nationals, and foreigners on a DTV can't work. We say "hosted by locals" and give the legal reason only if asked.
- **The calendar stays, free.** It is the reason newcomers open the app every week. Paid experiences sit on top; where one matches a listed event (Saturday walking street, karaoke night, temple meditation), the event links to "Go with a Thai host".
- **Five sample experiences remain** (silver street, Muay Thai, cooking, karaoke, temple). The run, board games, padel, dance jam and art jam experiences were removed: they were Thai hosts at expat events.
- **The calendar says what it is.** Instead of per-event crowd labels (our tags are estimates), the section says plainly: community events, mostly where newcomers meet each other; for Thai Chiang Mai, go with a host. The contrast is the pitch.
- **Hosts need conversational English, not fluency.** Activity-led formats need little talk; shy hosts can bring a co-host. We recruit people who already work with foreigners first.

## Go-to-market decisions

- **Demand first, as requests, not bookings.** "Request a spot" takes no payment and promises only that we message you when a host confirms. Request counts are the pitch to recruit hosts ("9 people asked for Saturday Muay Thai").
- **Votes decide who we recruit.** "Which Thai experience do you want?" lists ideas that have no host yet.
- **Nominations respect consent.** A nomad can nominate a Thai friend; we store the nominator's name and contact, the friend's first name and the idea, never the friend's contact. The friend gets an invite link and decides for themselves.
- **No affiliate programme at launch.** A bounty with no bookings behind it looks like a scheme; revisit once sessions run.
- **Organisers spread the calendar.** The free calendar is distributed by the people who run events (mostly expats): listing is free and it fills their events. Their audience is our guest pool, and every request and vote tells us which Thai host to recruit next.
- **Sign-ups go to a Google Sheet** for the hackathon (see `backend/`). Until the sheet URL is set, the app runs in demo mode and says "demo, nothing was sent" on every confirmation. Confirmed and completed sessions are tracked by hand with a status column in the requests tab, which is how the key metric is counted. The real app moves to a proper database.

## Positioning

- **The host is the product, not the event.** Guests book a person who is already a regular somewhere. The events underneath are real, recurring and often free, so what we sell is the introduction: before, during and after.
- **Built for people staying a while.** The target is newcomers in their first months. Airbnb Experiences serves the 3-day tourist with one-off outings; the gap is people who live here and still don't know anyone Thai.
- **Not a megatour.** Groups are capped at 6. On every experience, the social proof says "you + 3 others", never "1,000 people".

## Guest experience

- **Mobile first, inside a phone frame.** Almost all use will be on phones, so the whole product, including the tab bar and the booking button, lives in the phone frame, even on desktop.
- **A discovery page, not a feed.** Explore has search, category filters, Featured, This weekend, Meet the locals and a row per category. An endless single-card feed showed one experience per screen, which was too slow to browse.
- **The host's face leads.** Every card, map pin and profile shows the host in a gold ring. The avatar sits at the bottom-left, overlapping the photo: at the top-left it would cover the category badge and sit away from the host's name.
- **No Tinder-style swiping.** Swiping yes/no suits a single decision. People browsing experiences want to compare several, so we use swipeable rows instead.
- **Multiple photos are on the experience page, not the cards.** Swiping photos inside a card that sits in a swipeable row fights the row's own swipe on a phone.
- **The experience page never dead-ends.** It has the host, a small-group line with tappable faces, a Before / During / After timeline, the real event, what to bring, good-to-know notes, a map, reviews on 4 dimensions (host, introductions, value, vibe), "More with this host" and "You might also like".
- **Request, don't book.** A request needs a name and a LINE, WhatsApp or email contact, and no payment. The Trips chat is still a sample.
- **Host profiles build trust:** why they host, their community, social links with follower counts, and reviews. A local "somewhat-celebrity", such as a Muay Thai coach with 100k followers, is a real draw.

## App structure, 27 September (second pass)

- **Explore leads with people, not text.** Big experience cards with the host's face, "Meet the locals" with names and ratings, a short "This week" agenda, sample guest quotes, then the vote and the nomination. The stay-length question and the bullet list were removed: they pushed faces below the fold.
- **Calendar replaces Map.** One schedule for the week, like a calendar's schedule view: Thai-hosted sessions stand out in gold with the host's face; free community events sit as light rows between them. Filters: all, with a Thai host, community events. The map lives inside the calendar as a second view and shows hosted sessions only (free listings have no coordinates).
- **Plans replaces Trips.** It holds requests (kept on the device), votes and nominations. Empty, it suggests first-week experiences. It always carries "Help a Thai friend earn", one tap to send the host invite by LINE or WhatsApp: that is the newcomer's part in recruiting hosts.
- **The host side has no tab in the guest app.** Thai hosts arrive by their own link (#earn, shared on LINE). Guests see one "Are you Thai? Host with MyCNX" link. For demos, a "View as: Newcomer / Thai host" switch sits outside the phone.
- **Guests pay MyCNX, not the host.** After a host confirms, the guest pays by PromptPay QR through MyCNX, which keeps 20% and pays hosts weekly. Paying the host in cash would leave no way to collect the fee.

## Messaging, profile and privacy (27 September, third pass)

- **Group chat per session, nothing else.** Connection is the product, so the chat is where it continues: the Thai host and the guests of one session, opening when the host confirms and staying open after. No messages between strangers: it protects hosts from spam and flirting and needs no moderation.
- **A Chats tab now, marked "coming soon".** It shows one sample group chat with the input switched off, so the promise is visible from day one. Until the chat is built, a confirmed group gets a LINE group; hosts already live on LINE.
- **Profile behind the avatar.** The avatar menu shows name, a newcomer or Thai-local tag and a short bio; contact, socials and bio are edited under "Edit profile" and stay on the phone, where they pre-fill forms.
- **Privacy at collection.** Every form says who keeps the data (the ThaiCNX team, in Google Sheets, outside Thailand), why, and that it is deleted within 90 days, with a "Delete my data" link that files a deletion request. The sheet stores only whitelisted fields, treats formula-looking input as text, and its alert emails carry no personal data.
- **The public events file carries no calendar ids,** and Facebook links pass only when they point at an event page.

- **Backend: Google Sheet for launch, Convex for the real product.** Convex (TypeScript, live queries) fits the next features: live vote counts, host confirmations, group chat. Firebase was the other contender for the Google credits; Supabase free projects pause when idle.

## Host side

- **Earn opens in Thai.** Hosts are local, so the host side defaults to Thai. Everything can be switched to English, and the toggle resets when you move between the guest and host sides.
- **The earnings estimate is the hook, and host stories are the proof.** The page shows what a host could earn, then real-looking peers: what they earned, who they met, what they learned.
- **"It's the will, not the skill."** Potential hosts arrive unsure ("I'm just a Muay Thai guy"). The page lists what you need (be a regular, enjoy people, a phone) and what you don't (be a professional, perfect English, a venue).
- **Apply in 5 minutes, then a human call.** Sign-up is 4 steps: profile (with English level), experience, price, schedule. Ploy, the community manager, calls within a day to plan the first guests. (Superseded: the first prototype said "go live straight away"; with real sign-ups that would be a false promise.)
- **"Hosts wanted" is secondary.** Guests and venues ask for experiences that don't exist yet (Muay Thai for women, a sunrise hike, a café's back room), and anyone can suggest their own idea. It sits lower on the Earn page so sign-up stays the main call to action.
- **Money:** the host keeps 80%. Prices are about ฿490 to ฿990 per guest.

## Data and honesty

- **The events are real.** They come from a curated calendar of public Chiang Mai listings. The public snapshot has private individuals' names removed, and descriptions are rewritten in our own words.
- **Weekly events roll forward,** so the demo always shows upcoming dates, even from an old snapshot.
- **Everything else is sample data:** hosts, photos, reviews, ratings, guests, chats, earnings and follower counts. The app says so at the bottom of every page except the sign-up form steps, and says it isn't affiliated with any venue. The sample chat is labelled as such.
- **Photos are AI-generated** (Google Gemini image model). All hosts are shown as Thai locals.

## Process

- **Every change went through four lenses:** guest, host, marketing and UX. Suggestions weren't taken at face value; the reasoning for each rejection is recorded above.
- **Repo:** the prototype lives in `mycnx/`, so it doesn't clash with the rest of the team's work.
