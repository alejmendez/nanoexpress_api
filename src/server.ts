import dotenv from "dotenv";
dotenv.config();

import { getApp } from "./core/app";
import { db } from "./database/db";
import LOGGER from "./lib/logger";
import "./routes";

db.sync();

export const app = getApp();
app.listen();

process.on("SIGINT", () => {
  app.close();
  LOGGER.debug("app is down");
});
