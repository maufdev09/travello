# Travello

Travello is a role-based travel platform built with Next.js where tourists can discover and book listings, guides can manage listings, and admins can manage platform users.

## Live URLs

- Frontend (Vercel): `https://travello-ashy.vercel.app`
- Backend API (Render): `https://travello-backend-9nja.onrender.com`

## Core Features

- Public travel experience pages and listings discovery
- Tourist booking flow and payment result pages
- Role-based authentication (`ADMIN`, `GUIDE`, `TOURIST`)
- Protected dashboards by role
- Admin management:
  - Admin list/create/update/delete
  - Guide list/create/update/delete
  - Tourist list/create/update/delete
- Guide listing management
- Dynamic dashboard stats and charts (API-driven)
- Profile management

## Tech Stack

- Next.js 16 (App Router, Server Actions)
- React 19 + TypeScript
- Tailwind CSS 4
- Radix UI primitives
- Zod validation
- JWT-based auth + cookie session handling

## App Routes (High Level)

- Public:
  - `/`
  - `/listings`
  - `/book-now`
  - `/login`
  - `/registration`
  - `/payment/success`
  - `/payment/fail`
  - `/payment/cancel`
- Tourist:
  - `/dashboard`
- Guide:
  - `/guide/dashboard`
  - `/guide/dashboard/listing-management`
- Admin:
  - `/admin/dashboard`
  - `/admin/dashboard/admin-management`
  - `/admin/dashboard/guide-management`
  - `/admin/dashboard/tourist-management`
- Shared protected:
  - `/my-profile`

## Environment Variables

Create a `.env` file in project root:

```env
NODE_ENV=development
PORT=3000

# Backend base URL used by frontend server fetch helpers
NEXT_PUBLIC_BASE_API_URL=https://travello-backend-9nja.onrender.com/api/v1

# Must match backend JWT signing secret (used in frontend token verification)
JWT_SECRET=travelloSecretKey
```

Notes:
- `NEXT_PUBLIC_BASE_API_URL` is trimmed in code before use.
- `JWT_SECRET` must match backend, otherwise login/session verification fails.

## Local Development

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Start production server locally:

```bash
npm run start
```

## Deployment (Vercel)

Required production env vars in Vercel project:

- `NEXT_PUBLIC_BASE_API_URL`
- `JWT_SECRET`

Deploy:

```bash
npx vercel --prod
```

## Project Structure

```text
src/
  app/                     # Next.js routes/layouts
  components/              # UI + feature components
  services/                # Server actions and API integrations
  lib/                     # Shared helpers (fetch, auth utils, formatters)
  types/                   # TypeScript interfaces/types
  zod/                     # Validation schemas
```

## Notes

- Dashboard charts/stats are dynamic and fetched from backend endpoints.
- Some routes are intentionally dynamic because they rely on cookies/auth context.
