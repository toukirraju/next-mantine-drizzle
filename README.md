This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# next-with-typeORM
# next-mantine-drizzle installation

```bash
yarn add dotenv drizzle-orm jsonwebtoken next-auth pg bcryptjs -D @types/jsonwebtoken @types/pg drizzle-kit
```
or
<br/>

```bash
npm install dotenv drizzle-orm jsonwebtoken next-auth pg bcryptjs -D @types/jsonwebtoken @types/pg drizzle-kit
```

## setp-1
create `drizzle.config.ts` on root

```js

import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local file
dotenv.config({ path: resolve(process.cwd(), ".env.local") });


export default defineConfig({
  dialect: "postgresql",
  schema: './src/schema/*',
  out: './src/migrations',
    dbCredentials: {
        host: process.env.DB_HOST || "",
        user: process.env.DB_USER || "",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "",
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    ssl:false
    },
});
```
## setp-2
create `config` folder on `root/src` and create `db.ts` inside config folder

```js
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { users } from '@/schema/user';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle(pool, { schema: { users } });
```

here inject all your schemas manually.

## setp-3
add script on `package.json`

```json

{
    "script:{

    {/* default script here */}
    "drizzle:generate": "drizzle-kit generate",
    "drizzle:migrate": "drizzle-kit migrate",
    "drizzle:up": "npm run drizzle:generate && npm run drizzle:migrate",
    "drizzle:check": "drizzle-kit check",
    "drizzle:studio": "drizzle-kit studio"
    
    }
}

```






