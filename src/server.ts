import { getApp } from "./core/app";

export const app = getApp();

app.init(() => {
  process.on("SIGINT", () => {
    app.close();
  });
});
