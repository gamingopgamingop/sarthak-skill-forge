/// <reference types="@cloudflare/workers-types" />
import { drizzle, type DrizzleSqliteDODatabase } from 'drizzle-orm/durable-sqlite';
import { DurableObject } from 'cloudflare:workers';
import { migrate } from 'drizzle-orm/durable-sqlite/migrator';
import migrations from '../drizzle/migrations';

// Optional: define environment bindings interface
export interface Env {
  // Example bindings
  // MY_KV: KVNamespace;
  // ANOTHER_BINDING: string;
}

export class MyDurableObject extends DurableObject {
  storage: DurableObjectStorage;
  db: DrizzleSqliteDODatabase;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.storage = ctx.storage;
    this.db = drizzle(this.storage, { logger: false });
  }

  // Run database migrations
  async migrate() {
    await migrate(this.db, migrations);
  }

  // Example endpoint
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/migrate') {
      await this.migrate();
      return new Response('Database migrated successfully ✅');
    }

    return new Response('MyDurableObject is running 🚀');
  }
}
