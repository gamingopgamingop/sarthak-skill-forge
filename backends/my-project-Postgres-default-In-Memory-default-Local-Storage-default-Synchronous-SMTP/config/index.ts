import app from "./app.ts";
import auth from "./auth.ts";
import logger from "./logger.ts";
import storage from "./filesystem.ts";
import localization from "./locale.ts";
import mailer from "./mailer.ts";
import database from "./db.ts";
import cache from "./cache.ts";
import queue from "./queue.ts";
import http from "./http.ts";

export default [
  app,
  auth,
  cache,
  database,
  localization,
  logger,
  mailer,
  queue,
  storage,
  http,
];
