import { getApp } from "./core/app";

export const app = getApp();

getApp().init(() => {
  process.on("SIGINT", () => {
    app.close();
  });
});
