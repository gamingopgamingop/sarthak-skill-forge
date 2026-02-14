// drizzle.config.ts
// @ts-nocheck
// @ts-ignore


import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: ['postgresql',"gel","sqlite","mysql", "mariadb","cockroachdb", "vercel-postgres"],
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
