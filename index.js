import { once } from "events";
import express from "express";
import markoMiddleware from "@marko/express";
import compressionMiddleware from "compression";

const devEnv = "development";
const { NODE_ENV = devEnv, PORT = 3000 } = process.env;
console.time("Start");

const app = express()
  .use(compressionMiddleware()) // Enable gzip compression for all HTTP responses.
  .use(markoMiddleware());

if (NODE_ENV === devEnv) {
  const { createServer } = await import("vite");
  const devServer = await createServer({
    appType: "custom",
    server: { middlewareMode: true },
  });
  app.use(devServer.middlewares);
  app.use(async (req, res, next) => {
    try {
      const { router } = await devServer.ssrLoadModule("./src/index.js");
      router(req, res, handleNext);
    } catch (err) {
      handleNext(err);
    }

    function handleNext(err) {
      if (err) devServer.ssrFixStacktrace(err);
      next(err);
    }
  });
} else {
  app
    .use("/assets", express.static("dist/assets")) // Serve assets generated from vite.
    .use((await import("./dist/index.js")).router);
}

await once(app.listen(PORT), "listening");

console.timeEnd("Start");
console.log(`Env: ${NODE_ENV}`);
console.log(`Address: http://localhost:${PORT}`);

const { NODE_ENV = "development", PORT = 3000 } = process.env;
console.time("Start");

let address;
if (NODE_ENV === "production") {
  // In production, simply start up the fastify server.
  const { app } = await import("./dist/index.js");
  address = await app.listen({ port: PORT });
} else {
  // In dev we'll start a Vite dev server in middleware mode,
  // and forward requests to our fastify server.
  const { once } = await import("events");
  const { createServer } = await import("vite");
  const devServer = await createServer({
    appType: "custom",
    server: { middlewareMode: true },
  });
  const server = devServer.middlewares
    .use(async (req, res, next) => {
      try {
        const { app } = await devServer.ssrLoadModule("./src/index.js");
        await app.ready();
        app.routing(req, res);
      } catch (err) {
        return next(err);
      }
    })
    .listen(PORT);

  await once(server, "listening");
  address = `http://localhost:${server.address().port}`;
}

console.timeEnd("Start");
console.log(`Env: ${NODE_ENV}`);
console.log(`Address: ${address}`);
