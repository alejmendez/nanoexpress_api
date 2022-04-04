import request from "supertest";
import { App, getApp } from "@core/app";

let server: any;
let app: App;
beforeEach(async () => {
  app = getApp();
  await app.init(() => {
    process.on("SIGINT", async () => {
      await app.close();
    });
  });

  server = await request(app);
});

afterEach(async () => {
  return app?.close();
});

describe("POST /version", () => {
  it("returns status code 200", async () => {
    const response = await server
      .get("/api/v1/version")
      .set("Accept", "application/json");

    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
  });
});
