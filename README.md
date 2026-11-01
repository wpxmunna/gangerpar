# গাঙের পাড় — the coming-soon site

A one-page Bengali site for **গাঙের পাড় (Ganger Par) — Organic Products**: who the
shop is for, what it will sell, and when it opens. No build step, no framework,
no server. Open `index.html` and it works.

It is written to be understood in about thirty seconds by someone who has never
heard of the shop: the market is riverside produce, grown without chemicals,
bought from the farmer directly, and it has not opened yet.

## What is on the page

| Section | Bengali | What it does |
| --- | --- | --- |
| Hero | গাঙের পাড়ের ফসল, সোজা আপনার হেঁশেলে | States plainly that the market is not open yet |
| Why | বাজারটা কেন বসাচ্ছি | The motive — cutting the middlemen out |
| Goods | বাজারে কী কী থাকবে | Nine items with the season each one belongs to |
| Writing | গাঙের পাড় নিয়ে যা লেখা হয়েছে | Three verses and three riverside novels |
| How | অর্ডার থেকে আপনার ঘর | The three steps, once it opens |
| Contact | বাজার খুললে খবর পাবেন কোথায় | Where to follow for the opening |

The literary section carries two public-domain excerpts (Rabindranath Tagore,
Jibanananda Das) with attribution, one verse written for the shop, and three
novels named and described rather than quoted.

## Design

Everything comes out of the logo in `assets/img/social/`:

| Token | Value | Where it comes from |
| --- | --- | --- |
| `--paper` | `#f7f4ea` | the cream the logo sits on |
| `--paper-deep` | `#efeadb` | a half-step down, for alternating bands |
| `--forest` | `#255a38` | the wordmark and the field |
| `--forest-deep` | `#19402a` | the dark band and footer |
| `--river` | `#3581a3` | the river |
| `--sun` | `#edb860` | the sun |

Type is **Baloo Da 2** for headings (its rounded terminals are the closest match
to the hand-drawn wordmark), **Hind Siliguri** for reading, and **Tiro Bangla**
for the verses only. Bengali is set at a 1.95 line-height throughout, because the
matras above and below the line need the room.

The page has one structural idea: the river from the logo runs down the left
gutter for the full height of the page, fills with blue as you read, and each
section hangs a sun-coloured marker on it. It is the decoration and the reading
progress at once. On phones it collapses to a dot above each heading.

`assets/js/river.js` draws that line at the page's real pixel height, so the
dash maths maps exactly onto scroll position. **If the script never runs the
page is still complete** — the gutter is simply empty.

## Before it goes live

Two links in `index.html` are placeholders. Search for `EDIT`:

```html
<a class="btn" href="https://www.facebook.com/gangerpar">ফেসবুক পেজ ফলো করুন</a>
<a class="btn btn--quiet" href="mailto:hello@gangerpar.com">ইমেইল করুন</a>
```

Put the real page and address in. A ready-to-use WhatsApp button sits commented
out just below them — uncomment it and drop the number in.

Two other things are claims, not facts, so change them if they are wrong:

- the hero says the market opens **শীতের শুরুতেই** (at the start of winter);
- the nine items and their seasons are what a riverside organic shop usually
  carries. Cut what you will not sell — an item on this list is a promise.

## Published

Live from this repository: **https://wpxmunna.github.io/gangerpar/**

Every push to `main` republishes it. There is nothing to build: the workflow in
`.github/workflows/pages.yml` uploads the repository as it stands.

It does not use the legacy Jekyll publisher, which failed on this repository
twice and reported only *Page build failed* with no log. `.nojekyll` is still
there so the files are never run through Jekyll either way, and `404.html` is
served for any wrong address.

### Moving it to its own domain

Add a `CNAME` file next to `index.html` holding the bare domain
(`gangerpar.com`), point that domain's DNS at the GitHub Pages addresses
(`185.199.108.153` through `185.199.111.153`), and set it under **Settings →
Pages**. Nothing in the markup has to change: every link and image path is
relative, so the site works at the root and under `/gangerpar/` alike.

A custom domain set on the *account's* user site (`wpxmunna.github.io`) also
redirects this project's URLs to `<that domain>/gangerpar/` — so if one is ever
added there, its DNS has to point at GitHub or this site becomes unreachable.

## Files

```
index.html              the whole site
404.html                wrong address
assets/css/styles.css   tokens, layout, type
assets/js/river.js      the river in the gutter
assets/img/             logo crops, icons, OG card
assets/img/social/      the original social pack, untouched
```

`assets/img/logo-lockup.png` and `logo-mark.png` are trimmed out of the cover
art; `logo-lockup-reverse.png` is the same lockup re-inked for the dark footer.
The icons and the Open Graph card are generated from the same source.
