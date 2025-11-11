// import { sql } from '@vercel/postgres';
// import { drizzle } from 'drizzle-orm/vercel-postgres';

// const db = drizzle({ client: sql })
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle as db0} from 'drizzle-orm/vercel-postgres';
import { usersTable } from './db/schema';
import { drizzle as db3 } from 'drizzle-orm/node-postgres';
import { Pool } from "pg";
import { neon } from '@neondatabase/serverless';
import { drizzle as db1 } from 'drizzle-orm/neon-http';
import { drizzle as db2} from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { PGlite } from '@electric-sql/pglite';
import { drizzle as db4 } from 'drizzle-orm/pglite';
import { drizzle } from 'drizzle-orm/bun-sql';
import { SQL } from 'bun';
import { drizzle as db5} from "drizzle-orm/gel";
import { drizzle as db6} from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { drizzle } from 'drizzle-orm/libsql';

async function main() {
  const db = db1();

  const user: typeof usersTable.$inferInsert = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
  };

  await db.insert(usersTable).values(user);
  console.log('New user created!')

  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users)
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  console.log('User info updated!')

  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log('User deleted!')
}

main();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const db = db0({ 
  connection: { 
    connectionString: client: pool,
    ssl: true
  }
});

