import { configDatabase } from "./database";
import { configServer } from "./server";
import { configLogger } from "./logger";
import { configMailer } from "./mailer";
import { configJwt } from "./jwt";
import { configCache } from "./cache";
import { configI18n } from "./i18n";
import { configGenerator } from "./generator";

export const generalConfig = {
  database: configDatabase,
  server: configServer,
  logger: configLogger,
  mailer: configMailer,
  jwt: configJwt,
  cache: configCache,
  i18n: configI18n,
  generator: configGenerator,
};
