// import { sql } from '@vercel/postgres';
// import { drizzle } from 'drizzle-orm/vercel-postgres';

// const db = drizzle({ client: sql })
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { usersTable } from './db/schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from "pg";

async function main() {
  const db = drizzle();

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

const db = drizzle({ 
  connection: { 
    connectionString: client: pool,
    ssl: true
  }
});

