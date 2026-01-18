import { createServer } from "vite";

const app = express();
let loadTemplate;

if (process.env.NODE_ENV === "production") {
  // Use Vite's built asset in prod mode.
  loadTemplate = () => import("./dist");
} else {
  // Hookup the vite dev server.
  const vite = await createViteServer({
    server: { middlewareMode: true }
  });

  app.use(vite.middlewares);
  loadTemplate = () => vite.ssrLoadModule("./template.marko");
}

app.get("/", async (req, res) => {
  const template = (await loadTemplate()).default;
  // When the template is loaded, it will automaticall have `vite` assets inlined.
  template.render({ hello: "world" }, res);
});

app.listen(3000);