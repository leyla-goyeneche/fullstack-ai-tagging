import fp from "fastify-plugin";
import multipart from "@fastify/multipart";
import type { FastifyPluginAsync } from "fastify";

const multipartPlugin: FastifyPluginAsync = async (app) => {
  await app.register(multipart, {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
      files: 1,
    },
  });
};

export default fp(multipartPlugin);
