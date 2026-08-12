# Deepak Kumar D — Portfolio Website

A single-page portfolio built around your resume, real Rareduft Meta Ads data, and real ad
creatives. **Everything — every photo, video, and certificate PDF — is embedded directly inside
`index.html` and `script.js` as base64 data.** There is no separate `assets/` folder. Just 3
files. This was done specifically so uploading to GitHub can't go wrong from missing/misplaced
files or broken folder structure.

## The 3 files you need

```
index.html   (~1.5 MB — page structure + profile photo + certificate PDFs, all embedded)
style.css    (~30 KB  — all styling)
script.js    (~14 MB  — all interactivity + every video/image in the Creatives gallery, embedded)
```

That's it. No folders, no other files required for the site to work.

## How to upload to GitHub (the easy way now)

1. Create your repo on github.com (or open your existing one).
2. Click **Add file → Upload files**.
3. Drag in these 3 files directly (not a folder — just the 3 files sitting loose).
4. Commit.
5. **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main** / **root** → Save.
6. Your site goes live at `https://YOUR-USERNAME.github.io/YOUR-REPO/` within a minute or two.

`script.js` is ~14MB, which is under GitHub's 25MB single-file web-upload limit, so the basic
drag-and-drop uploader will work fine this time — no git command line required, though it still
works if you prefer it.

## Why this fixes the "images/videos not showing" problem

The previous version kept media in `assets/creatives/...`, `assets/profile/...` etc., which GitHub's
web uploader can silently fail to upload correctly (flattening or dropping nested folders). By
embedding everything as base64 directly inside the 3 flat files, there's nothing that can go
missing during upload — if the 3 files transferred at all, the media is guaranteed to be inside
them.

**Trade-off, to be transparent about it:** `script.js` now has to fully download before any of the
page's interactivity (including the gallery) works, since the video data lives inside it. That's
~14MB up front instead of loading video only when someone clicks into it. On a normal connection
that's roughly a 2–5 second load, which is a reasonable trade for guaranteed-correct deployment.
If you'd prefer the faster, smaller-footprint version with separate asset files (and are willing to
deploy via `git` on the command line, which handles folders correctly), let me know and I'll give
you that version instead.

## About the "AI assistant"

This is a **lightweight, fully local FAQ assistant** — not a live LLM. It matches whatever's typed
against a knowledge base in `script.js` (the `KB` array, near the bottom, after all the embedded
media) and returns the best-matching answer using keyword + word-overlap scoring. It needs no API
key, no backend, and works entirely offline once the page loads.

To extend it: find the `KB` array and add more `{ keys: [...], a: '...' }` entries — `keys` are the
words/phrases that should trigger that answer.

## Adding more ad creatives later

Open `script.js` and find the `VIDEO`, `POSTER`, `IMG` objects near the top, and the `creatives`
array just below them. To add something new, you'll need to base64-encode the file yourself (e.g.
`base64 -i yourfile.mp4` in Terminal, or any online base64 encoder) and add it as a new entry in
the relevant object, then reference it in the `creatives` array the same way the existing entries
do. This is more manual than dropping in a file, which is the trade-off for the zero-folder setup
— happy to do this for you if you send me new creatives directly.

## Missing assets

The four-panel "Discovery Kit" carousel (Artboard 1–4) and one earlier set of single-scent product
shots from an earlier message weren't available to reference by the time this update was made —
only the most recently uploaded files carry over between turns. Re-upload them if you'd like them
added.

## Changing contact details

- **WhatsApp number**: `script.js` → `WHATSAPP_NUMBER` constant, and the `wa.me/918088977454`
  links in `index.html`.
- **Email / LinkedIn**: the corresponding links in the Contact section of `index.html`.

## Notes

- Fonts (Fraunces, Inter, IBM Plex Mono) load from Google Fonts via CDN — needs an internet
  connection when viewed (normal for any hosted site).
- The Rareduft logo is hotlinked from rareduft.com's own CDN; if it ever fails to load, a clean
  "RD" fallback badge appears automatically.
- If any embedded image or video ever fails to render for any reason, a clear "Couldn't load
  [name]" placeholder appears in its place instead of blank space — so any future issue is
  immediately visible and easy to report back.
- Every number on the site (hero, career totals, work panel stats) now runs automatically the
  moment it scrolls into view — no click needed, though clicking still replays it.
- Fully responsive (mobile nav collapses to a hamburger menu below 720px).
