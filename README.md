# Fengji Zhang — Personal Homepage

The source for [zfj1998.github.io](https://zfj1998.github.io/), a static personal
homepage focused on LLM post-training research, publications, internships, and a
print-friendly web CV.

## Local preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser. The site has no build step. Visual
assets are local; the optional production analytics integration uses GoatCounter.

## Structure

- `index.html`, `styles.css`, `script.js` — homepage content and interactions
- `cv.html`, `cv.css`, `cv.js` — screen- and print-friendly CV
- `analytics.js` — production-only GoatCounter loader and public visit count
- `assets/` — portrait, publication figures, fonts, and favicon
- `404.html`, `robots.txt`, `sitemap.xml`, `.nojekyll` — GitHub Pages support

The site is deployed from the repository root.

## Analytics

The GoatCounter site code is configured as `zfj1998` in `analytics.js`. It is a
public site identifier, not a credential. Public visitor counts are enabled, so
the production footer can show the aggregate total.

Tracking only loads on `zfj1998.github.io`; localhost and preview hosts are
ignored. GoatCounter provides aggregate visits and country/region reports without
storing raw IP addresses or adding browser cookies.
