import Fastify from "fastify";
import multipartPlugin from "./plugins/multipart.plugin.js";
import { healthRoute } from "./routes/health.route.js";
import { analyzeRoute } from "./routes/analyze.route.js";

export function buildApp() {
  const app = Fastify({ logger: false });

  app.register(multipartPlugin);
  app.register(healthRoute);
  app.register(analyzeRoute);

  return app;
}
