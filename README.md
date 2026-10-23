# AudioMix — Guide

Personal live-worship mixing reference for the Soundcraft Ui16. Dark console aesthetic, EQ chart + 8-step workflow on the home page, pro mixing tips on `/tips`.

**Live:** https://audiomix.d3guzman.com (Cloudflare Pages project `audiomix`)
**Mirror:** github.com/kelvindg/audiomix (CF Pages is source of truth; GitHub is a mirror)

## Password gate
The site is gated client-side (SHA-256 hash check, unlocked per browser session). See `js/gate.js` for the hash. Password is known to KDG; gate is convenience, not hardened security.

## Data source
`js/data.js` is transcribed from `Live_Worship_EQ_Guide_Ui16.xlsx` (sheets: Live EQ Guide, Mixing Workflow). Content = audition starting points, not mandatory settings.

## Deploy
```bash
wrangler pages deploy . --project-name=audiomix --branch=main
git add -A && git commit -m "..." && git push origin main
```
