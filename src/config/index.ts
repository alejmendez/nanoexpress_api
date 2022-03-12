import { configDatabase } from "./database";
import { configServer } from "./server";
import { configLogger } from "./logger";
import { configMailer } from "./mailer";
import { configJwt } from "./jwt";
import { configCache } from "./cache";
import { configModule } from "./module";

export const generalConfig = {
  database: configDatabase,
  server: configServer,
  logger: configLogger,
  mailer: configMailer,
  jwt: configJwt,
  cache: configCache,
  module: configModule,
};
