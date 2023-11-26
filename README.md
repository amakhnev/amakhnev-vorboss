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


## Architectural choices

Relational database as data storage tier - because of low volume requirement + complexity of domain model. External databsae because of the pattern when data is not exclusively changed by FE, and external databasse would add possibility of direct database integration.

Next.JS as front end with API layer
- API are not complex and only serving FE.
- supporting REST architectural principles.
- easy to manage code, make changes.
- no SSR or SSG, but options to use both client ans server side if needed.
- responsive design with help of Tailwind CSS.

Use of SQL vs ORM. 
- trade off between complexity and fine control on statements execution. 
- had to do mapping, some assumptions (changed data returned from DB) are used downstream in the code


## What to do next or improve
- Automate migrations, include into build
- possibly migrate to ORM
- Testing - unit tests for API functions
- Testing - end-to-end testing using ?Cypress? 
