import dotenv from "dotenv";
dotenv.config();

import nanoexpress, { IHttpRequest, IHttpResponse } from "nanoexpress";

import { getNano } from "./nanoexpress";
import { Router } from "./route";

import { config } from "./config";
import { initConnection, getDbConnection } from "./database";
import LOGGER from "../lib/logger";

import listRoutes from "../routes";

import BodyParserMiddleware from "../middlewares/BodyParserMiddleware";
import LoggerMiddleware from "../middlewares/LoggerMiddleware";
import CorsMiddleware from "../middlewares/CorsMiddleware";
import JwtMiddleware from "../middlewares/JwtMiddleware";

class App {
  protected nano: nanoexpress.INanoexpressApp;
  protected route: Router;

  public async init(clouser: () => void) {
    await this.initInstances();

    this.nano.setErrorHandler(
      (err: Error, req: IHttpRequest, res: IHttpResponse): IHttpResponse => {
        console.log(err);
        return res.status(500).json({
          status: "error",
          status_code: 500,
          message: err,
        });
      }
    );

    this.listen();
    clouser();
  }

  protected async initInstances() {
    this.nano = getNano();
    await initConnection();
    this.initMiddleware();
    this.route = new Router();
    await this.route.init(listRoutes);
  }

  public initMiddleware() {
    this.nano.use(LoggerMiddleware);
    this.nano.use(BodyParserMiddleware);
    this.nano.use(CorsMiddleware);
    this.nano.use(JwtMiddleware);
  }

  public getRouter() {
    return this.route;
  }

  public listen() {
    const port = config("server.port");
    const url = config("server.url");
    this.nano.listen(port);

    LOGGER.debug("list of registered routes");
    this.route.getListRoutes().map(([method, path, handlerName]) => {
      LOGGER.debug(`[${method.toUpperCase()}][${handlerName}] ${path}`);
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
const getRouter = () => AppInstance.getRouter();

export { getApp, getNano, getRouter, getDbConnection };
