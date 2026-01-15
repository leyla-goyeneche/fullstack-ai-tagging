import { describe, it, expect } from "vitest";
import request from "supertest";
import { buildApp } from "../src/app.js";

describe("GET /health", () => {
  it("should return ok", async () => {
    const app = buildApp();
    await app.ready();

    const res = await request(app.server).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });

    await app.close();
  });
});
