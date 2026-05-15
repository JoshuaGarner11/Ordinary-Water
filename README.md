# Ordinary Water

A gospel-outreach website for **ordinarywater.online** — the digital landing place for
custom-labeled water bottles handed out in Washington, DC during the summer of 2026.

It's a plain static site: just HTML, CSS, and a little JavaScript. No build step, no
framework, no server. That makes it free to host on GitHub Pages and easy to edit by hand.

---

## What's in here

```
ordinarywater-website/
├── index.html          Home — the hero + the emoji gospel (❤️ ➗ ✝️ ❓) + daily verse
├── story.html          Our Story — the mission, the "why this summer" note, values
├── connect.html        Connect — Ask Faith Q&A, the contact form, and Get Involved
├── favicon.svg         Site icon (a gold water drop)
├── CNAME               Tells GitHub Pages to serve the site at ordinarywater.online
├── .nojekyll           Tells GitHub Pages not to run Jekyll (serve files as-is)
├── README.md           This file
└── assets/
    ├── css/styles.css           The "Sacred Modernism" design system styles
    └── js/
        ├── tailwind-config.js   Shared color / type / spacing tokens
        └── main.js              Nav, daily verse, emoji-gospel accordion, Ask Faith Q&A
```

The design follows the Google Stitch design system that came with this project
("Sacred Modernism" — deep midnight tones, Libre Caslon Text headings, Hanken Grotesk
body text, gold + purple accents, glow instead of shadow). All backgrounds are designed
with CSS gradients and textures, so there are **no external image files to break.**

---

## ✅ Before you launch — 5 quick edits

Search the project for the word `EDIT` to find every spot. There are only five things:

1. **Formspree form ID** — in `connect.html`. The contact form won't deliver messages
   until you connect it. See "Setting up the contact form" below.
2. **Ministry / church name** — in the footer of all three pages, replace
   `[YOUR CHURCH / MINISTRY NAME]`.
3. **Contact email** — in `connect.html`, replace `hello@ordinarywater.online` with the
   real address (in both the `mailto:` link and the visible text).
4. **Social links** — in the footer of all three pages and the `connect.html` sidebar,
   replace the `href="#"` placeholders with your real links, or delete the ones you
   don't use.
5. **Gospel video ID** — in `index.html`, replace `YOUR_YOUTUBE_VIDEO_ID` with your
   YouTube video's ID. This one is optional and can wait — until it's set, the Watch
   section shows a tasteful "coming soon" note. See "Adding the gospel video" below.

---

## Putting it on GitHub Pages

1. **Create a repository** on GitHub (e.g. `ordinarywater`). It can be public.
2. **Upload the contents of this `ordinarywater-website` folder** to the repo — the
   files should sit at the *root* of the repo (so `index.html` is at the top level, not
   inside a sub-folder). You can drag-and-drop them in the GitHub web uploader, or use
   git:
   ```
   git init
   git add .
   git commit -m "Ordinary Water site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/ordinarywater.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**, pick the
   `main` branch and the `/ (root)` folder, and **Save**.
5. Wait a minute or two. GitHub will give you a temporary URL like
   `https://YOUR-USERNAME.github.io/ordinarywater/` — check that the site loads there
   first.

## Pointing ordinarywater.online at it

1. The included `CNAME` file already tells GitHub the site lives at
   `ordinarywater.online`.
2. At your domain registrar (wherever you bought the domain), open the **DNS settings**
   and add these records:

   | Type  | Name / Host | Value |
   |-------|-------------|-------|
   | A     | `@`         | `185.199.108.153` |
   | A     | `@`         | `185.199.109.153` |
   | A     | `@`         | `185.199.110.153` |
   | A     | `@`         | `185.199.111.153` |
   | CNAME | `www`       | `YOUR-USERNAME.github.io` |

3. Back in **Settings → Pages**, under **Custom domain**, confirm it shows
   `ordinarywater.online`. Once DNS has propagated (can take a few minutes to a day),
   tick **Enforce HTTPS**.

That's it — the QR code on your bottle labels can point straight to
`https://ordinarywater.online`.

---

## Setting up the contact form (Formspree)

The site is static, so the form needs a free service to deliver submissions to your
inbox. Formspree handles that.

1. Go to **https://formspree.io** and create a free account using the email address
   where you want messages delivered.
2. Create a **new form**. Formspree gives you an endpoint that looks like
   `https://formspree.io/f/abcdwxyz`.
3. Open `connect.html`, find this line:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" ...>
   ```
   and replace `YOUR_FORM_ID` with your real ID (the `abcdwxyz` part).
4. The first time someone submits the form, Formspree will email you to confirm the
   form — click the link in that email once and you're done.

The free tier covers 50 submissions a month. If the outreach outgrows that, Formspree
has inexpensive paid plans, or you can swap the form `action` for a Google Form link.

---

## Adding the gospel video

The Home page has a "Watch the gospel message" section. It uses a lightweight YouTube
embed: the poster image loads instantly, and the actual video only loads when someone
taps play (good for speed, especially on phones).

1. Film and record your gospel message, then upload it to **YouTube**. You can set it
   to **Unlisted** if you'd prefer it not show up in YouTube search — it will still play
   fine on the site.
2. From the video's link — e.g. `https://www.youtube.com/watch?v=dQw4w9WgXcQ` — copy the
   ID, which is the part after `v=` (here, `dQw4w9WgXcQ`).
3. Open `index.html`, find `data-video-id="YOUR_YOUTUBE_VIDEO_ID"` in the `WATCH`
   section, and replace `YOUR_YOUTUBE_VIDEO_ID` with your ID.

Until you do this, tapping the player shows a friendly "coming soon" note, so the
section always looks intentional. To re-record later, just swap the ID again.

## Editing the content

Everything is plain text — you can edit it in any text editor.

- **The gospel walkthrough** (the four ❤️ ➗ ✝️ ❓ movements) lives in `index.html`,
  inside the section marked `THE EMOJI GOSPEL`. Each movement is a `gospel-step` block.
- **The gospel video** — set the YouTube ID in the `WATCH` section of `index.html` (see
  "Adding the gospel video" above).
- **Verse of the Day** — the rotating list of ~30 verses is the `VERSES` array near the
  top of `assets/js/main.js`. Add or change verses there; the site automatically shows a
  different one each day.
- **Ask Faith Q&A** — the questions and answers are the `FAITH_QA` array in
  `assets/js/main.js`. Each entry is `{ q: "...", tags: "...", a: "..." }`. The `a`
  field accepts HTML, so you can use `<p>`, `<strong>`, and `<blockquote>`. The `tags`
  are extra keywords that help the search box find a question.
- **Colors, fonts, spacing** — defined once in `assets/js/tailwind-config.js` and
  `assets/css/styles.css`.

---

## A couple of notes

- The site loads **Tailwind CSS from a CDN** (a `<script>` tag). That keeps the project
  simple and matches the original Stitch designs. It works fine for an outreach site of
  this size; you may see a harmless console note about using the CDN "in production."
- **Faith AI:** jesussave.me runs a live AI chatbot, which needs a server. This site
  uses a curated "Ask Faith" library instead — hand-written, Scripture-grounded answers
  to the ~20 most common questions, fully under your control and free to run. The
  interface is built so a live AI could be added later without redesigning the page.
- Scripture quotations are drawn from widely used English translations and kept short,
  in keeping with common ministry use.

Made with hope. Shared with love.
