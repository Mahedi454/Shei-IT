# shei-it

`shei-it` is a premium startup/agency website project for a digital services brand whose name means "Excellent IT" in Bengali.

This repository is Codex-only. Claude-specific files and `AGENTS.md` files should not be kept in the project.

## Workspace

```txt
shei-it/
  frontend/
  backend/
  README.md
```

- `frontend/`: Next.js App Router + TypeScript + Tailwind CSS
- `backend/`: Express.js + TypeScript

## Current Direction

Current phase: foundation setup

We are building the project in stages. The immediate goal is a clean, scalable base, not all pages and modules at once.

## Frontend Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- `next-themes`
- `lucide-react`
- `clsx`
- `tailwind-merge`

## Backend Stack

- Express
- TypeScript
- CORS
- `dotenv`
- `helmet`
- `morgan`

## Backend Architecture Standard

The backend should follow a proper industry-grade modular pattern from the start.

- Organize code by feature/module
- Keep `core`, `config`, `middlewares`, `routes`, and `utils` separated
- Avoid a flat structure that becomes hard to scale
- Each module should own its route, controller, service, and related logic
- Shared helpers should stay outside feature modules

Recommended backend structure:

```txt
backend/
  src/
    config/
      env.ts
    core/
      app.ts
      server.ts
    middlewares/
      globalErrorHandler.ts
      notFound.ts
    modules/
      health/
        health.controller.ts
        health.route.ts
        health.service.ts
    routes/
      index.ts
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
- Purple/lavender accent system
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

## Codex Context

Use this as the working prompt for future implementation:

```txt
We are building a startup/agency website named "shei-it".

Brand meaning:
"shei-it" means "Excellent IT" in Bengali.

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

Backend architecture:
- Use an industry-grade modular pattern
- Organize backend code by feature/module
- Keep shared config, middlewares, utils, and core bootstrap separated

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
Use Codex only for this project.
Do not keep Claude-specific files or AGENTS.md in the repo.
Do not add backend database yet.
Backend should only expose a health route for now.
```

## Immediate Build Scope

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
- Home page placeholder using the design system

### Backend foundation

- Express app bootstrap
- `cors`, `helmet`, `morgan`, `express.json()`
- `GET /api/health`
- Global error handler
- Not found middleware
- Port from environment
- Modular feature-based backend structure

## Next Step

The next implementation step should be:

`Refactor the current backend foundation into the modular structure above, then build the frontend design-system foundation.`
