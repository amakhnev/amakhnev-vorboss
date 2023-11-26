## 
This is a simple full-stack application based on the Next.js framework. It displays a list of widgets and allows users to perform CRUD actions. Application is deployed to [https://amakhnev-vorboss.vercel.app/](https://amakhnev-vorboss.vercel.app/)

## How to Build locally

First, deploy the Postgres database locally or use any managed Postgres database provider. Supabase offers a managed Postgres database with a reasonable free tier. Add credentials and database info into the .env.local file so it might be picked up by Next.js - copy from .env.local.example . Apply database schema and seed data by executing scripts in ./migrations folder. 

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment on Vercel
Application is deployed into Vercel by connecting Vercel app to Github and managing deployment on push to main. The database is deployed to Supabase, with a free tier option. Free projects are placed on pause if not used for longer than 7 days. 



