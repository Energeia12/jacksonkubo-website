# Jackson Kubo

Personal site for Jackson Kubo, composer and sound designer. It replaces the Wix site at [jacksonkubo.com](https://www.jacksonkubo.com/) and keeps the same pages: home, composition, sound design, music, contact, and each release.

## Run it locally

```bash
npm install
npm run dev
```

Open the local address printed by Next.js. Production files are created with:

```bash
npm run build
```

That writes a static site to `out/`, which any web host can serve.

## Put it on GitHub Pages

The workflow in `.github/workflows/pages.yml` builds the site and publishes it when you push to `main`.

1. In the repository on GitHub, open Settings → Pages.
2. Set the source to GitHub Actions.
3. Push this project to `main`.

`public/CNAME` is `www.jacksonkubo.com`. After the first deploy, point the domain at GitHub Pages:

- `www` as a CNAME to `<your-username>.github.io`
- the apex domain with the A records GitHub lists under Pages

GitHub’s custom-domain instructions cover the exact records.

## Score audio

Released albums play through Spotify and Apple Music. The game cues on the composition page — about 180MB — are still streamed from the old Wix media library so the page plays without checking huge files into git.

When you cancel Wix, copy the cues into this repo:

```bash
node scripts/download-score-audio.mjs
```

Then set `useLocalScoreAudio` to `true` in `src/lib/audio.ts` and rebuild. The players will use `public/audio/` instead.

## Contact

The contact form opens the visitor’s email app addressed to jacksonkubokawa@gmail.com. It does not store messages on a server.
