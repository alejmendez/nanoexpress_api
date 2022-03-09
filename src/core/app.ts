import dotenv from "dotenv";
dotenv.config();

import nanoexpress from "nanoexpress";

import { getNano } from "./nanoexpress";
import { getRouter } from "./route";

import { config } from "./config";
import { initConnection, getDbConnection } from "./database";
import LOGGER from "../lib/logger";

import "../routes";

import bodyparser from "../middlewares/bodyparser";
import LoggerMiddleware from "../middlewares/logger";
import corsMiddleware from "../middlewares/cors";
import jwt from "../middlewares/authenticate";

class App {
  protected nano: nanoexpress.INanoexpressApp;
  protected route;

  constructor() {
    this.nano = getNano();
    this.route = getRouter();
  }

  public async init(clouser: () => void) {
    this.initMiddleware();
    await initConnection();
    this.route.init();
    this.listen();
    clouser();
  }

  public initMiddleware() {
    this.nano.use(LoggerMiddleware);
    this.nano.use(bodyparser);
    this.nano.use(corsMiddleware);
    this.nano.use(jwt);
  }

  public listen() {
    const port = config("server.port");
    const url = config("server.url");
    this.nano.listen(port);

    LOGGER.debug("list of registered routes");
    this.route.getListRoutes().map(([method, path]) => {
      LOGGER.debug(`[${method.toUpperCase()}] ${path}`);
    });

    LOGGER.debug(`app is running at ${url}:${port}`);
  }

  public close() {
    this.nano.close();
    LOGGER.debug("app is down");
  }
}

const AppInstance = new App();
const getApp = () => AppInstance;

export { getApp, getNano, getRouter, getDbConnection };
