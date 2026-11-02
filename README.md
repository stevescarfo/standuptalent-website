# standuptalent-website

Public website for the Stand Up Talent app, served at **standuptalent.com** by
GitHub Pages. Plain HTML and one stylesheet in the app's Brick look; no build
step.

| Page | File |
| --- | --- |
| Home | `index.html` |
| Privacy Policy | `privacy.html` |
| Terms of Use | `terms.html` |
| Comedy venues | `venues.html` (reads the live venue list from the app's database with its public key) |
| Help & Support | `support.html` |
| Not found | `404.html` |

`CNAME` tells GitHub Pages to serve the site on standuptalent.com.

Still to add: `app-ads.txt`, once the AdMob account exists (it needs the
AdMob publisher ID).

## Publishing

1. Repository **Settings → Pages**: Source **Deploy from a branch**, branch
   **main**, folder **/ (root)**.
2. In GoDaddy **DNS** for standuptalent.com:
   - `A` records for `@` pointing to 185.199.108.153, 185.199.109.153,
     185.199.110.153 and 185.199.111.153 (remove GoDaddy's default `A` record
     and any "parked" or forwarding setting).
   - `CNAME` record for `www` pointing to `stevescarfo.github.io`.
3. Back in **Settings → Pages**, wait for the DNS check to pass, then tick
   **Enforce HTTPS**.

## Email

support@standuptalent.com forwards to the team Gmail through ImprovMX (free).
GoDaddy DNS for it:

- `MX` `@` → `mx1.improvmx.com` (priority 10) and `mx2.improvmx.com` (priority 20)
- `TXT` `@` → `v=spf1 include:spf.improvmx.com ~all`

Sending app emails (Resend) uses its own records on a subdomain, so the two
don't clash.
