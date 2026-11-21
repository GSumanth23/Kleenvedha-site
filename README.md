# Kleen Vedha Solutions – website

React + Vite marketing site with a product catalogue (MRP only) and a WhatsApp / email enquiry list.

## Run locally
```bash
npm install
npm run dev
```

## Edit content
Everything lives in `src/data.js`:
- `BUSINESS` – phone, WhatsApp number, email, delivery threshold
- `PRODUCTS` – names, descriptions, pack sizes and MRP (`null` = "Price on request")
- `ALSO_SUPPLY` – the "We also supply" cards

## Deploy to Vercel + kleenvedha.com
1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project** → import the repo (framework: Vite, build `npm run build`, output `dist`).
3. Vercel → Project → **Settings → Domains** → add `kleenvedha.com` and `www.kleenvedha.com`.
4. At your domain registrar, add the DNS records Vercel shows (usually an `A` record `76.76.21.21` for the root and a `CNAME` `cname.vercel-dns.com` for `www`).
