# ETN News Website (Next.js)

This is a production-ready Next.js news website for **ETN News** that uses your **existing backend API**.

## What it does

- Uses the same backend as your ETN mobile app/admin app
- Any news posted from the admin app becomes visible on this website automatically
- Supports language switch: **English / Tamil / Hindi**
- Home page with hero section like premium news portals
- Category page
- Search page
- News detail page
- ETN-style header, menu, and footer
- Server-side fetching so CORS issues are minimized

## Backend used

```env
https://orca-grocery-gqf8gybqc8fxejaz.southeastasia-01.azurewebsites.net
```

## API endpoints expected

- `GET /categories`
- `GET /news?page=1&limit=10&lang=en`
- `GET /news/:id?lang=en`

## Setup

```bash
npm install
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Environment

Copy `.env.example` to `.env.local`

```bash
cp .env.example .env.local
```

## Build for production

```bash
npm run build
npm run start
```

## Deploy options

### Vercel
- Import the project
- Add environment variable `ETN_API_BASE_URL`
- Add `NEXT_PUBLIC_SITE_URL`
- Deploy

### Azure App Service
- Create Node.js web app
- Set startup command to `npm run start`
- Add env vars in App Settings
- Build during deployment

## Important note about logo

I used a clean ETN logo treatment and included `public/etn-logo.svg` as a placeholder web asset.
If you want the **exact same ETN logo** from your mobile app branding, replace this file with your original logo asset and update the header/footer if needed.

## Suggested next upgrades

- Add infinite scroll / pagination
- Add breaking ticker from backend
- Add ad slots
- Add live scores widget
- Add sitemap and RSS
- Add admin-controlled featured stories
- Add social share buttons and reaction POST integration for web users
