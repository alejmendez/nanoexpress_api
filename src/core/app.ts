import Benchmark from "./benchmark";

import dotenv from "dotenv";
dotenv.config();

import LOGGER from "./logger";
import { INanoexpressApp } from "nanoexpress";

import { config } from "./config";
import { initConnection, getDbConnection } from "./database";

Benchmark.start();
import { getNano } from "./nanoexpress";

import ModulesManager from "../modules/ModulesManager";
import handler500 from "./errors/handler500";
import handler404 from "./errors/handler404";

import { BodyParserMiddleware } from "@middlewares/BodyParserMiddleware";
import { LoggerMiddleware } from "@middlewares/LoggerMiddleware";
import { CorsMiddleware } from "@middlewares/CorsMiddleware";
import { JwtMiddleware } from "@middlewares/JwtMiddleware";

import { getI18n } from "./i18n";

LOGGER.info(`Importing dependencies [${Benchmark.end()}]`);

class App {
  protected nano: INanoexpressApp;
  public port: number;

  public async init(callback: () => void) {
    await this.initInstances();

    this.listen();
    callback();
  }

  protected async initInstances() {
    Benchmark.start();
    this.nano = getNano();
    LOGGER.info(`Nanoexpress initialization [${Benchmark.end()}]`);

    await Promise.all([
      initConnection(),
      getI18n().loadTranslations(config("i18n.directory")),
    ]);

    this.initMiddleware();

    await this.initModules();

    this.initErrorHandler();
  }

  public initMiddleware() {
    this.nano.use(LoggerMiddleware);
    this.nano.use(BodyParserMiddleware);
    this.nano.use(CorsMiddleware);
    this.nano.use(JwtMiddleware);
    LOGGER.info(`Middleware initialization`);
  }

  protected async initModules() {
    Benchmark.start();
    await ModulesManager();
    LOGGER.info(`Modules initialization [${Benchmark.end()}]`);
  }

  protected initErrorHandler() {
    this.nano.setErrorHandler(handler500);
    this.nano.setNotFoundHandler(handler404);
  }

  public listen() {
    const port = config("server.port");
    const url = config("server.url");
    this.nano.listen(port);
    this.port = port;
    LOGGER.info(`App is running at ${url}:${port}`);
  }

  public address() {
    return {
      address: this.nano.address,
      family: "http",
      port: this.port,
    };
  }

  public async close() {
    this.nano.close();
    LOGGER.info("App is down");
    const conn = await getDbConnection();
    conn.close();
  }
}

let AppInstance: App;
const getApp = () => {
  if (!AppInstance) {
    AppInstance = new App();
  }
  return AppInstance;
};

export { App, getApp, getNano, getDbConnection };
