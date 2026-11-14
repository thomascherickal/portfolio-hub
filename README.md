# Portfolio hub - The Digital Futurist

Static site. No build step, no framework, no server. Hosted free on Cloudflare Pages.

## Update the site (the only file you edit)

`data/projects.js` holds every project, video, link and the PWA list.

1. Edit `data/projects.js` (copy an existing project object to add a new one).
2. Commit and push.
3. Cloudflare Pages redeploys in about a minute.

Area counts in the hero, the filter buttons and the section layout all update by themselves.

## Add a recording

See `media/README.md`. MP4 files must be 25 MiB or smaller; use YouTube (`yt:VIDEO_ID`) for anything longer.

## Deploy (one time)

Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git > pick this repo.

- Framework preset: None
- Build command: (leave empty)
- Build output directory: /

Then Custom domains > Set up a domain > `portfolio.thedigitalfuturist.com`.

## Keep it free

- Keep this repository public (GitHub Actions minutes are free for public repos).
- Do not add a payment method to the Cloudflare account.
- Do not add R2, Workers Paid or Advanced Certificate Manager.
- Use only first-level subdomains (`name.thedigitalfuturist.com`).

## Preview locally

    python3 -m http.server 8080

Then open http://localhost:8080
