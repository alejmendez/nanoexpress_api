import { getApp } from "@core/app";

export const app = getApp();
export const init = async () => {
  await app.init(() => {
    process.on("SIGINT", async () => {
      await app.close();
    });
  });
};

init();
