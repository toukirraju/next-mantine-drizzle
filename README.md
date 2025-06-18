# Next.js Mantine Drizzle
# next-drizzle installation

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
    "script":{

    {/* default script here */}
    "drizzle:generate": "drizzle-kit generate",
    "drizzle:migrate": "drizzle-kit migrate",
    "drizzle:up": "npm run drizzle:generate && npm run drizzle:migrate",
    "drizzle:check": "drizzle-kit check",
    "drizzle:studio": "drizzle-kit studio"
    
    }
}

```






