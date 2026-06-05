# Backend Deployment: Hostinger

This folder contains the Express, Prisma, and PostgreSQL backend.

Deploy the backend as its own Hostinger Node.js web app, separate from the Next.js frontend. A clean setup is:

```txt
Frontend app/domain: https://www.shei-it.com
Backend app/domain: https://api.shei-it.com
Backend health URLs: https://api.shei-it.com/health and https://api.shei-it.com/api/health
```

## Hostinger Settings

Create a separate Node.js web app for the backend and point it to this folder.

```txt
Project directory: backend
Install command: npm install --include=dev
Build command: npx prisma db push && npm run build
Start command: npm start
Node.js version: 20 or newer
```

If Hostinger only gives one build/install command field, use:

```txt
npm install --include=dev && npx prisma db push && npm run build
```

The app entry point is:

```txt
dist/server.js
```

The start command is:

```txt
npm start
```

`api.shei-it.com` must point to this backend Node.js app, not to `public_html` or a static file directory. If Hostinger shows its own `403 Forbidden` page for `/health`, the request is being handled before Express starts; check the subdomain document root / Node app mapping and remove any Apache rule that blocks routing to the Node app.

## Backend Environment Variables

Set these in Hostinger's backend app environment variable panel:

```txt
NODE_ENV=production
FRONTEND_URL=https://www.shei-it.com,https://shei-it.com
DATABASE_URL=your_postgresql_connection_string
ADMIN_EMAILS=sheiitofficial@gmail.com
FIREBASE_SERVICE_ACCOUNT_BASE64=your_base64_firebase_admin_json
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your_gmail_app_password
MAIL_FROM=yourgmail@gmail.com
MAIL_TO=sheiitofficial@gmail.com
```

Do not set `PORT` unless Hostinger specifically tells you to. Most Node.js hosting platforms provide it automatically.

To create the Firebase base64 value in PowerShell:

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("backend\firebasadminsdk.json")) | Set-Clipboard
```

## Database

The backend requires PostgreSQL. Use one of these:

- Hostinger PostgreSQL, if your plan supports it and provides a PostgreSQL connection string.
- An external PostgreSQL provider such as Neon, Supabase, Railway, or Render.

Put the full PostgreSQL URL in `DATABASE_URL`.

## After Deployment

Test the backend directly:

```txt
https://api.shei-it.com/
https://api.shei-it.com/health
https://api.shei-it.com/api/health
```

Then update the frontend Hostinger app environment variable:

```txt
NEXT_PUBLIC_API_URL=https://api.shei-it.com/api
```

Rebuild/redeploy the frontend after changing `NEXT_PUBLIC_API_URL`.

## Common Issues

- `403 Forbidden` on `/health`: `api.shei-it.com` is not reaching the Express app. Make sure the subdomain is mapped to the backend Node.js app with `dist/server.js` as the entry file and `npm start` as the startup command. If the subdomain uses Apache/static hosting, remove blocking `.htaccess` rules or change the document root / proxy mapping so requests are forwarded to Node.
- `403 Forbidden` on admin API routes only: confirm `ADMIN_EMAILS` includes the exact Firebase login email.
- `500` on API routes: check `DATABASE_URL`, Firebase env, and whether `npx prisma db push` ran.
- CORS errors in the browser: make sure `FRONTEND_URL` exactly includes the frontend origin, including `https://` and no trailing slash.
- Admin login problems: confirm Firebase web env vars are set on the frontend and Firebase Admin service account is set on the backend.

## Render Setup Reference

These settings are still useful if you later choose Render for the backend:

1. Push this repository to GitHub.
2. In Render, create a new Web Service from the repository.
3. Use these settings:

```txt
Root directory: backend
Build command: npm install --include=dev && npx prisma db push && npm run build
Start command: npm start
Health check path: /api/health
Node.js version: 20 or newer
```

If you use Render Blueprint manually, the backend blueprint is in `backend/render.yaml`. Some Render Blueprint flows expect `render.yaml` at the repository root, so manual Web Service setup is the simplest option when keeping backend files inside this folder.

## Environment Variables

```txt
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
DATABASE_URL=your_render_postgres_connection_string
ADMIN_EMAILS=admin@yourdomain.com
FIREBASE_SERVICE_ACCOUNT_BASE64=your_base64_firebase_admin_json
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your_gmail_app_password
MAIL_FROM=yourgmail@gmail.com
MAIL_TO=admin@yourdomain.com
```

After deployment, test:

```txt
https://your-render-service.onrender.com/api/health
```

## Free Plan Notes

Render's free web service may sleep after inactivity. The first request after sleep can be slow.

Render Free PostgreSQL is useful for testing, but it is not a good long-term production database because current free databases expire after a limited time.

Render Free web services block common outbound SMTP ports like `25`, `465`, and `587`. The app can still store contact submissions in PostgreSQL, but Gmail SMTP email delivery may not work on Render Free. For production email delivery, use a paid service or switch mail sending to an HTTPS email API provider.
