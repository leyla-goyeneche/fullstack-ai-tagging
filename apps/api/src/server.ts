import Fastify from "fastify";
import multipartPlugin from "./plugins/multipart.plugin.js";
import { healthRoute } from "./routes/health.route.js";
import { analyzeRoute } from "./routes/analyze.route.js";

const app = Fastify({ logger: true });

await app.register(multipartPlugin);
await app.register(healthRoute);
await app.register(analyzeRoute);

const port = Number(process.env.PORT ?? 3000);
const host = "0.0.0.0";

app.listen({ port, host });
