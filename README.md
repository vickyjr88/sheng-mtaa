# Sheng Mtaa (web app)

The React front end for [shengmtaa.com](https://shengmtaa.com), deployed at
[app.shengmtaa.com](https://app.shengmtaa.com). Browse Sheng slang and
Mchongoano, comment (signed in), and manage your account.

Talks to the same Rails API as the main site and the Android app
(`sheng-mchongoano-web`'s `/api/private/*` routes) and shares its Firebase
project for authentication.

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- [React Router](https://reactrouter.com) v6
- [TanStack Query](https://tanstack.com/query) for data fetching, caching, and infinite scroll
- [Tailwind CSS](https://tailwindcss.com) v4, matching shengmtaa.com's palette
- [Firebase Auth](https://firebase.google.com/docs/auth) (email/password)
- Firebase Hosting for deployment

## Getting started

```bash
npm install
cp .env.example .env.local
# fill in .env.local with real values (see below)
npm run dev
```

### Environment variables

See `.env.example` for the full list. You'll need:

- `VITE_API_BASE_URL` — the Rails API origin (e.g. `https://shengmtaa.com`
  in production, or your local Rails server for development).
- The Firebase web config values, from the Firebase console for the
  `sheng-mchongoano` project (Project settings → General → Your apps).

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — typecheck and build for production (outputs to `dist/`)
- `npm run preview` — preview the production build locally
- `npm run lint` — run Oxlint

## Deployment

Deployed via Firebase Hosting (`firebase.json` points at `dist/`):

```bash
npm run build
firebase deploy --only hosting
```

## Known backend limitations

A couple of things the API itself constrains, not fixable from this repo
alone:

- `GET /api/private/v2/users/:slug` only returns a profile when `:slug`
  matches the signed-in caller's own account — it 400s for anyone else's.
  `UserPage` handles this with a friendly message rather than an error, but
  viewing another member's public profile isn't actually possible until
  the backend allows it.
- Comment creation (`POST /api/private/v2/comments`) requires a
  client-supplied `user_id` (`Comment belongs_to :user`, validated) rather
  than deriving it from the authenticated request. This app sends the
  signed-in user's own id, which is safe since it comes from their
  verified session — but the endpoint itself doesn't enforce that the id
  matches the caller, so this is worth hardening server-side at some
  point.
