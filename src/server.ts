import dotenv from "dotenv";
dotenv.config();

import { getNano } from "./core/app";
import { config } from "./core/config";
import { db } from "./database/db";
import LOGGER from "./lib/logger";
import "./routes";

db.sync();

export const app = getNano();

const PORT = config("APP_PORT", 3000);
app.listen(PORT);
LOGGER.debug(`Server running on http://localhost:${PORT}`);

process.on("SIGINT", () => {
  app.close();
  LOGGER.debug("app is down");
});
