import express from "express";
import { createServer } from "vite";

const app = express();

const vite = await createServer({
  server: {
    middlewareMode: true,
  },
  appType: "custom",
});

app.use(vite.middlewares);

app.get("/", async (req, res) => {
  const template = (
    await vite.ssrLoadModule("./src/routes/index.marko?marko-server-entry")
  ).default;
  const result = template.render();
  res.header("Content-Type", "text/html");
  result.pipe(res);
});

app.listen(3000);
