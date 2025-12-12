import express from "express";
import compressionMiddleware from "compression";
import markoMiddleware from "@marko/express";
import indexPage from "./pages/index";
import usersService from "./services/users";
import { Router } from "express";
import { send } from "./send";
import template from "./template.marko";

const port = process.env.PORT || 3000;

express()
  .use(compressionMiddleware()) // Enable gzip compression for all HTTP responses.
  .use("/static", express.static("dist/client")) // Serve assets generated from rollup.
  .use(markoMiddleware()) // Enables res.marko.
  .get("/", indexPage)
  .get("/services/users", usersService)
  .listen(port, err => {
    if (err) {
      throw err;
    }

    console.log(`Listening on port ${port}`);
  });
export const router = Router()
  .get("/", indexPage)
  .get("/services/users", usersService);

export async function handler(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  send(res, template.stream());
}
