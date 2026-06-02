# Backend Deployment: Render Free

This folder contains the Express, Prisma, and PostgreSQL backend.

## Render Setup

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

To create the Firebase base64 value in PowerShell:

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("backend\firebasadminsdk.json")) | Set-Clipboard
```

After deployment, test:

```txt
https://your-render-service.onrender.com/api/health
```

## Free Plan Notes

Render's free web service may sleep after inactivity. The first request after sleep can be slow.

Render Free PostgreSQL is useful for testing, but it is not a good long-term production database because current free databases expire after a limited time.

Render Free web services block common outbound SMTP ports like `25`, `465`, and `587`. The app can still store contact submissions in PostgreSQL, but Gmail SMTP email delivery may not work on Render Free. For production email delivery, use a paid service or switch mail sending to an HTTPS email API provider.
