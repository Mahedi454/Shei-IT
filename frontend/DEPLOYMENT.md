# Frontend Deployment: Hostinger

This folder contains the Next.js frontend.

The app uses dynamic Next.js server rendering and API fetches, so deploy it as a Hostinger Node.js/Next.js app if your plan supports Node.js web apps.

## Hostinger Settings

```txt
Project directory: frontend
Install command: npm install
Build command: npm run build
Start command: npm start
Node.js version: 20 or newer
```

## Environment Variables

```txt
NEXT_PUBLIC_API_URL=https://your-render-service.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://your-frontend-domain.com
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

After the Hostinger domain is live, update the Render backend environment variable:

```txt
FRONTEND_URL=https://your-frontend-domain.com
```

Do not include a trailing slash. This value is used by backend CORS.

## Static Hosting Warning

Uploading only static files to Hostinger `public_html` is not the best fit for the current app, because the frontend has dynamic routes and server-side data fetching. If you only have static hosting, the app would need a separate static-export conversion first.
