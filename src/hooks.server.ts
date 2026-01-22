import process from 'node:process';
// src/hooks.server.ts
process.on('sveltekit:shutdown', async (reason: any) => {
  console.log('Shutting down:', reason);
  await jobs.stop();
  await db.close();
});
