# MyCNX: product decisions

This is why the prototype looks the way it does. The decisions were made during the Chiang Mai hackathon, 26 September 2026.

## Positioning

- **The host is the product, not the event.** Guests book a person who is already a regular somewhere. The events underneath are real, recurring and often free, so what we sell is the introduction: before, during and after.
- **Built for people staying a while.** The target is nomads and long-stay visitors (2 weeks to 6 months) who arrive alone. Airbnb Experiences already serves the 3-day tourist with one-off outings. The gap is what happens next: you come back as a regular, with friends and a group chat.
- **Not a megatour.** Groups are capped at 6. On every experience, the social proof says "you + 3 others", never "1,000 people".

## Guest experience

- **Mobile first, inside a phone frame.** Almost all use will be on phones, so the whole product, including the tab bar and the booking button, lives in the phone frame, even on desktop.
- **A discovery page, not a feed.** Explore has search, category filters, Featured, This weekend, Meet the locals and a row per category. An endless single-card feed showed one experience per screen, which was too slow to browse.
- **The host's face leads.** Every card, map pin and profile shows the host in a gold ring. The avatar sits at the bottom-left, overlapping the photo: at the top-left it would cover the category badge and sit away from the host's name.
- **No Tinder-style swiping.** Swiping yes/no suits a single decision. People browsing experiences want to compare several, so we use swipeable rows instead.
- **Multiple photos are on the experience page, not the cards.** Swiping photos inside a card that sits in a swipeable row fights the row's own swipe on a phone.
- **The experience page never dead-ends.** It has the host, a small-group line with tappable faces, a Before / During / After timeline, the real event, what to bring, good-to-know notes, a map, reviews on 4 dimensions (host, introductions, value, vibe), "More with this host" and "You might also like".
- **Book first, pay later.** A booking is a request the host confirms. After booking, a group chat with the host and the other guests opens under Trips.
- **Host profiles build trust:** why they host, their community, social links with follower counts, and reviews. A local "somewhat-celebrity", such as a Muay Thai coach with 100k followers, is a real draw.

## Host side

- **Earn opens in Thai.** Hosts are local, so the host side defaults to Thai. Everything can be switched to English, and the toggle resets when you move between the guest and host sides.
- **The earnings estimate is the hook, and host stories are the proof.** The page shows what a host could earn, then real-looking peers: what they earned, who they met, what they learned.
- **"It's the will, not the skill."** Potential hosts arrive unsure ("I'm just a Muay Thai guy"). The page lists what you need (be a regular, enjoy people, a phone) and what you don't (be a professional, perfect English, a venue).
- **Go live straight away, then get human support.** Sign-up is 4 steps: profile, experience, price, schedule. The listing goes live with no approval queue, and then Ploy, the community manager, calls for a 30-minute welcome. Hosts can bring friends as co-hosts.
- **"Hosts wanted" is secondary.** Guests and venues ask for experiences that don't exist yet (Muay Thai for women, a sunrise hike, a café's back room), and anyone can suggest their own idea. It sits lower on the Earn page so sign-up stays the main call to action.
- **Money:** the host keeps 80%. Prices are about ฿490 to ฿990 per guest.

## Data and honesty

- **The events are real.** They come from a curated calendar of public Chiang Mai listings. The public snapshot has private individuals' names removed, and descriptions are rewritten in our own words.
- **Weekly events roll forward,** so the demo always shows upcoming dates, even from an old snapshot.
- **Everything else is sample data:** hosts, photos, reviews, ratings, guests, chats, earnings and follower counts. The app says so on every screen, and says it isn't affiliated with any venue.
- **Photos are AI-generated** (Google Gemini image model). All hosts are shown as Thai locals.

## Process

- **Every change went through four lenses:** guest, host, marketing and UX. Suggestions weren't taken at face value; the reasoning for each rejection is recorded above.
- **Repo:** the prototype lives in `mycnx/`, so it doesn't clash with the rest of the team's work.
