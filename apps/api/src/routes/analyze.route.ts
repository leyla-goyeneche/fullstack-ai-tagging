import type { FastifyPluginAsync } from "fastify";
import { inferTagsFromFilename } from "../services/tagging.service.js";

export const analyzeRoute: FastifyPluginAsync = async (app) => {
  app.post("/api/analyze", async (request, reply) => {
    const file = await request.file();

    if (!file) {
      return reply.status(400).send({
        error: "BAD_REQUEST",
        message: "Field 'image' is required (multipart/form-data).",
      });
    }

    const { filename, mimetype } = file;

    // Lee el archivo completo a memoria (por ahora).
    // Para archivos grandes, luego lo optimizamos con streaming.
    const buffer = await file.toBuffer();

    // Validación básica de tipo
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(mimetype)) {
      return reply.status(415).send({
        error: "UNSUPPORTED_MEDIA_TYPE",
        message: `Unsupported mime '${mimetype}'. Use jpeg/png/webp.`,
      });
    }

    const tags = inferTagsFromFilename(filename);

    return reply.send({
      tags,
      meta: {
        filename,
        size: buffer.length,
        mime: mimetype,
      },
    });
  });
};
