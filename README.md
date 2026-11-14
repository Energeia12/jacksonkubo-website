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

That writes a static site to `out/`.

## Hosting

The live site is the Cloudflare Worker `jacksonkubo-website`. `wrangler.jsonc` points it at `out/`. The Worker sends `jacksonkubo.com` to `www.jacksonkubo.com`.

Publish a new version with:

```bash
npx wrangler login
npm run deploy
```

The source repository stays on GitHub. In Cloudflare Workers Builds, set the build command to `npm run build` and the deploy command to `npx wrangler deploy`. The custom domains are `jacksonkubo.com` and `www.jacksonkubo.com`.

## Score audio

Released albums play through Spotify and Apple Music. The game cues on the composition page — about 180MB — are still streamed from the old Wix media library so the page plays without checking huge files into git.

When you cancel Wix, copy the cues into this repo:

```bash
node scripts/download-score-audio.mjs
```

Then set `useLocalScoreAudio` to `true` in `src/lib/audio.ts` and rebuild. The players will use `public/audio/` instead.

## Contact

The contact form opens the visitor’s email app addressed to jacksonkubokawa@gmail.com. It does not store messages on a server.
