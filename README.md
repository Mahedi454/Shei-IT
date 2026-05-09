# shei-it

`shei-it` is a premium startup/agency website project for a digital services brand whose name means "Excellent IT" in Bengali.

The repo is organized as a monorepo-style workspace with:

- `frontend/`: Next.js App Router + TypeScript + Tailwind CSS
- `backend/`: Express.js + TypeScript

## Project Status

Current phase: foundation setup

The goal of this phase is to establish a clean, scalable base before building full pages or business modules.

## Planned Structure

```txt
shei-it/
  frontend/
  backend/
  README.md
```

Recommended backend structure:

```txt
backend/
  src/
    app.ts
    server.ts
    config/
      env.ts
    routes/
      index.ts
    middlewares/
      globalErrorHandler.ts
      notFound.ts
    utils/
      sendResponse.ts
  .env
  package.json
  tsconfig.json
```

Recommended frontend direction:

```txt
frontend/
  src/
    app/
    components/
      layout/
      shared/
      ui/
    config/
    constants/
    lib/
    styles/
  public/
    images/
      brand/
      home/
      services/
```

## Initialization Plan

### 1. Root Setup

- Keep the current workspace as the project root.
- Maintain two separate apps: `frontend` and `backend`.
- Add a root `.gitignore` after app scaffolding if needed.

### 2. Frontend Initialization

Create the Next.js app inside `frontend/`:

```bash
npx create-next-app@latest frontend
```

Use these options:

```txt
TypeScript: Yes
ESLint: Yes
Tailwind CSS: Yes
src directory: Yes
App Router: Yes
Turbopack: Yes
Import alias: @/*
```

Then install the UI dependencies:

```bash
cd frontend
npm install framer-motion lucide-react next-themes clsx tailwind-merge
npm install -D prettier prettier-plugin-tailwindcss
```

### 3. Backend Initialization

Initialize the Express TypeScript app:

```bash
cd backend
npm init -y
npm install express cors dotenv helmet morgan
npm install -D typescript ts-node-dev @types/node @types/express @types/cors @types/morgan
npx tsc --init
```

Update `backend/package.json` scripts to:

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Foundation Scope

The first build task should focus only on the shared foundation.

### Frontend foundation

- Theme provider with `next-themes`
- CSS variable based light/dark theme
- Navbar
- Footer
- Reusable `Container`
- Reusable `Button`
- Reusable `SectionHeader`
- `ThemeToggle`
- Site config and nav config
- Home page placeholder built from the design system

### Backend foundation

- Express app bootstrap
- `cors`, `helmet`, `morgan`, `express.json()`
- `GET /api/health`
- Global error handler
- Not found middleware
- Port from environment

## Theme Tokens

Use centralized CSS variables for all theme colors.

### Light theme

```css
--background: #ffffff;
--foreground: #080b1a;

--surface: #f8f9ff;
--surface-soft: #f3f5ff;

--card: rgba(255, 255, 255, 0.82);
--card-solid: #ffffff;
--card-border: rgba(99, 102, 241, 0.12);

--primary: #6c63ff;
--primary-2: #8b7cff;
--primary-3: #a78bfa;

--blue: #4f8cff;
--sky: #bfe7ff;
--mint: #7ee7c1;
--orange: #ff9f5a;
--peach: #ffb38a;

--muted-text: #64748b;
--soft-shadow: 0 24px 80px rgba(76, 88, 180, 0.14);
```

### Dark theme

```css
--background: #050505;
--foreground: #f8fafc;

--surface: #0a0a0a;
--surface-soft: #111111;

--card: rgba(255, 255, 255, 0.045);
--card-solid: #111111;
--card-border: rgba(255, 255, 255, 0.08);

--primary: #8b7cff;
--primary-2: #6c63ff;
--primary-3: #a78bfa;

--blue: #4f8cff;
--sky: #5daeff;
--mint: #7ee7c1;
--orange: #ff9f5a;
--peach: #ffb38a;

--muted-text: #a1a1aa;
--soft-shadow: 0 24px 90px rgba(108, 99, 255, 0.18);
```

## Design Direction

- Premium SaaS-style agency website
- White-first UI with optional raw-black dark mode
- Soft pastel gradients
- Rounded 2xl cards
- Glassmorphism
- Soft shadows
- Lavender/purple accent system
- Spacious layout and modern typography
- Dark mode should feel matte, minimal, and premium

## Planned Pages

- Home
- Services
- Portfolio
- About
- Pricing
- Blog
- Contact

These should not all be built at once. The foundation comes first.

## Codex Working Context

Use the following prompt as the working context for future implementation:

```txt
We are building a startup/agency website named “shei-it”.

Brand meaning:
“shei-it” means “Excellent IT” in Bengali.

Business:
shei-it provides practical digital services:
- Website development
- Mobile app development
- Hosting and deployment
- SEO and digital growth
- Cross-platform development
- Maintenance and long-term support

Project setup:
Root folder has two apps:
- frontend: Next.js App Router + TypeScript + Tailwind CSS
- backend: Express.js + TypeScript

Frontend stack:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- next-themes
- lucide-react
- clsx
- tailwind-merge

Backend stack:
- Express
- TypeScript
- CORS
- dotenv
- helmet
- morgan

Design direction:
Premium SaaS-style agency website.
White-first UI with optional raw-black dark mode.
The light theme should match soft white/pastel 3D visuals.
The dark theme should be matte black, premium, minimal, not cyberpunk.

Visual style:
- clean white SaaS UI
- soft pastel gradients
- rounded 2xl cards
- glassmorphism
- soft shadows
- purple/lavender accent
- lots of whitespace
- modern typography
- premium and trustworthy
- dark mode should use raw black, graphite cards, subtle purple glow

Pages planned:
- Home
- Services
- Portfolio
- About
- Pricing
- Blog
- Contact

Important:
Do not build everything at once.
First create the clean foundation:
- project architecture
- theme system
- layout
- navbar
- footer
- reusable container
- reusable button
- reusable section heading
- constants folder
- image asset structure

Use centralized theme colors through CSS variables.
Use next-themes with class-based dark mode.
Use reusable data arrays for nav links, services, projects, blog posts, and footer links.
Keep the code scalable and clean.
Do not add backend database yet.
Backend should only expose a health route for now.
```

## First Implementation Task

```txt
First task:
Initialize the frontend and backend foundation.

Frontend:
- configure theme provider
- add CSS variables for light and dark theme
- create Navbar
- create Footer
- create Container
- create Button
- create SectionHeader
- create ThemeToggle
- create site config and nav config
- create home page placeholder using the design system

Backend:
- create Express app
- configure cors, helmet, morgan, json parser
- create /api/health route
- create global error handler
- create not found middleware
- run on PORT from env

Do not implement full pages yet.
Focus on clean scalable foundation.
```

## Suggested Execution Order

1. Scaffold `frontend/` with Next.js.
2. Install frontend dependencies.
3. Scaffold `backend/` with Node + TypeScript.
4. Add backend source structure and environment config.
5. Build the shared frontend design system.
6. Add the backend health route and middleware chain.
7. Verify both apps run locally.

## Next Step

After the scaffolding commands are run, the next Codex task should be:

`Initialize the frontend and backend foundation exactly as defined in this README.`
