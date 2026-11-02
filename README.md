# standuptalent-website

Public website for the Stand Up Talent app, served at **standuptalent.com** by
GitHub Pages. Plain HTML and one stylesheet in the app's Brick look; no build
step.

| Page | File |
| --- | --- |
| Home | `index.html` |
| Privacy Policy | `privacy.html` |
| Terms of Use | `terms.html` |
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
