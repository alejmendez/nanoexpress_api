import dotenv from "dotenv";
dotenv.config();

import nanoexpress from "nanoexpress";

import { getNano } from "./nanoexpress";
import { Router } from "./route";

import { config } from "./config";
import LOGGER from "./logger";

import { initConnection, getDbConnection } from "./database";
import modules from "./modules";
import handler500 from "./errors/handler500";
import handler404 from "./errors/handler404";
import Benchmark from "./benchmark";

import { BodyParserMiddleware } from "@middlewares/BodyParserMiddleware";
import { LoggerMiddleware } from "@middlewares/LoggerMiddleware";
import { CorsMiddleware } from "@middlewares/CorsMiddleware";
import { JwtMiddleware } from "@middlewares/JwtMiddleware";

import { i18n } from "./i18n";

class App {
  protected nano: nanoexpress.INanoexpressApp;
  protected route: Router;
  protected modules: modules;

  public async init(callback: () => void) {
    await this.initInstances();

    this.listen();
    callback();
  }

  protected async initInstances() {
    Benchmark.start();
    this.nano = getNano();
    LOGGER.info(`Nanoexpress initialization [${Benchmark.end()}]`);

    await initConnection();

    Benchmark.start();
    await i18n.loadTranslations(config("i18n.directory"));
    this.initMiddleware();
    LOGGER.info(`Middleware initialization [${Benchmark.end()}]`);

    await this.initModules();
    this.initErrorHandler();
  }

  public initMiddleware() {
    this.nano.use(LoggerMiddleware);
    this.nano.use(BodyParserMiddleware);
    this.nano.use(CorsMiddleware);
    this.nano.use(JwtMiddleware);
  }

  protected async initModules() {
    this.modules = new modules();
    await this.modules.init();
  }

  protected initErrorHandler() {
    this.nano.setErrorHandler(handler500);
    this.nano.setNotFoundHandler(handler404);
  }

  public getRouter() {
    return this.route;
  }

  public listen() {
    const port = config("server.port");
    const url = config("server.url");
    this.nano.listen(port);
    LOGGER.info(`App is running at ${url}:${port}`);
  }

  public close() {
    this.nano.close();
    LOGGER.info("App is down");
  }
}

const AppInstance = new App();
const getApp = () => AppInstance;
const getRouter = () => AppInstance.getRouter();

export { getApp, getNano, getRouter, getDbConnection };
