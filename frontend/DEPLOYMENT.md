# Frontend Deployment: Hostinger

This folder contains the Next.js frontend.

The app uses dynamic Next.js server rendering and API fetches, so deploy it as a Hostinger Node.js/Next.js app. Deploy it separately from the backend.

A clean production setup is:

```txt
Frontend app/domain: https://www.shei-it.com
Backend app/domain: https://api.shei-it.com
Frontend API env: NEXT_PUBLIC_API_URL=https://api.shei-it.com/api
```

Do not deploy it by uploading the `.next` folder, `node_modules`, or the full project zip into `public_html`.

## Fixing a Hostinger 403

If the deployed site shows:

```txt
403 Forbidden
Access to this resource on the server is denied!
```

the frontend was most likely deployed as a static website or uploaded into the wrong folder. This project does not produce a plain `index.html` for `public_html`; it must run with Node.js using `npm start`.

Use one of these deployment paths:

- Preferred: connect the GitHub repository to Hostinger's Node.js web app deployment.
- Alternative: upload the source files through Hostinger's Node.js app upload flow, then let Hostinger install dependencies and build.

Do not upload:

- `node_modules`
- `.next`
- `.env`
- `.next/cache`
- `.next/dev`
- `frontend.zip`

## Hostinger Settings

```txt
Project directory: frontend
Install command: npm install
Build command: npm run build
Start command: npm start
Node.js version: 20 or newer
```

If Hostinger asks for a framework, choose Next.js. If it asks for an app/start command, use `npm start`.

## Environment Variables

```txt
NEXT_PUBLIC_API_URL=https://api.shei-it.com/api
NEXT_PUBLIC_SITE_URL=https://www.shei-it.com
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

Set these in Hostinger's environment variable panel before building. `NEXT_PUBLIC_*` values are baked into the browser bundle during `npm run build`, so rebuild/redeploy after changing them.

After the Hostinger domain is live, update the Render backend environment variable:

```txt
FRONTEND_URL=https://www.shei-it.com,https://shei-it.com
```

Do not include trailing slashes. This value is used by backend CORS.

## Static Hosting Warning

Uploading only static files to Hostinger `public_html` is not the best fit for the current app, because the frontend has dynamic routes and server-side data fetching. If you only have static hosting, the app would need a separate static-export conversion first, and several dynamic pages would need to be redesigned.
