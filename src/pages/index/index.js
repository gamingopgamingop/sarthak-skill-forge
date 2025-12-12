import template from "./template.marko";

export default (req, res) => {
  res.marko(template, {});
};

export default async (app) => {
  app.get("/", (request, reply) => {
    reply.marko(template, {});
  });
};
