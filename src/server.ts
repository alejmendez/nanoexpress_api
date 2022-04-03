import { getApp } from "@core/app";

export const app = getApp();
export const init = async () => {
  await app.init(() => {
    process.on("SIGINT", () => {
      app.close();
    });
  });
};

init();
