import { configDatabase } from "./database";
import { configServer } from "./server";
import { configLogger } from "./logger";
import { configMailer } from "./mailer";
import { configJwt } from "./jwt";
import { configCache } from "./cache";

export const generalConfig = {
  database: configDatabase,
  server: configServer,
  logger: configLogger,
  mailer: configMailer,
  jwt: configJwt,
  cache: configCache,
};
