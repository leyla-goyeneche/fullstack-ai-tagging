import { describe, it, expect } from "vitest";
import request from "supertest";
import { buildApp } from "../src/app.js";

describe("POST /api/analyze", () => {
  it("returns 400 if no file", async () => {
    const app = buildApp();
    await app.ready();

    const res = await request(app.server).post("/api/analyze");
    expect(res.status).toBe(400);

    await app.close();
  });

  it("returns 415 for invalid mimetype", async () => {
    const app = buildApp();
    await app.ready();

    const res = await request(app.server)
      .post("/api/analyze")
      .attach("image", Buffer.from("hello"), {
        filename: "file.txt",
        contentType: "text/plain",
      });

    expect(res.status).toBe(415);

    await app.close();
  });

  it("returns tags with label/confidence for valid png", async () => {
    const app = buildApp();
    await app.ready();

    const res = await request(app.server)
      .post("/api/analyze")
      .attach("image", Buffer.from([1, 2, 3]), {
        filename: "foto.png",
        contentType: "image/png",
      });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.tags)).toBe(true);
    expect(res.body.tags[0]).toHaveProperty("label");
    expect(res.body.tags[0]).toHaveProperty("confidence");
    expect(res.body.meta.mime).toBe("image/png");

    await app.close();
  });
});
