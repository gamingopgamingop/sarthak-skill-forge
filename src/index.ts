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
import { drizzle as db11} from 'drizzle-orm/libsql';
import { drizzle as db10} from 'drizzle-orm/mysql2';
import { drizzle as db9} from "drizzle-orm/planetscale-serverless";
import { Client } from "@planetscale/database";
import { drizzle as db7} from 'drizzle-orm/planetscale-serverless';
import { connect } from '@tidbcloud/serverless';
import { drizzle as db8} from 'drizzle-orm/tidb-serverless';
import { int, singlestoreTable, varchar } from 'drizzle-orm/singlestore-core';
import { drizzle as db12} from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';


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

const db3 = drizzle({ client: poolConnection });
// or if you need client connection
async function main() {
  const connection = await mysql.createConnection({
    host: "host",
    user: "user",
    database: "database",
  });
  const db3 = drizzle({ client: connection });
}


