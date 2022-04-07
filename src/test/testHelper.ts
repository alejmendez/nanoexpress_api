import { App, getApp } from "@core/app";
import supertest from "supertest";

let server: supertest.SuperTest<supertest.Test>;
let app: App;

beforeAll(async () => {
  app = getApp();
  await app.init(() => {
    process.on("SIGINT", async () => {
      await app.close();
    });
  });

  server = await supertest(app);
});

afterAll(async () => {
  return await app?.close();
});

export const getServer = () => {
  return server;
};
