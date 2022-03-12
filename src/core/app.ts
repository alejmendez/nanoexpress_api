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
import { EntityNotFoundError } from "typeorm";

class App {
  protected nano: nanoexpress.INanoexpressApp;
  protected route: Router;

  public async init(clouser: () => void) {
    await this.initInstances();

    this.listen();
    clouser();
  }

  protected async initInstances() {
    this.nano = getNano();
    await initConnection();
    this.initMiddleware();
    await this.initRouter();
    this.initErrorHandler();
  }

  public initMiddleware() {
    this.nano.use(LoggerMiddleware);
    this.nano.use(BodyParserMiddleware);
    this.nano.use(CorsMiddleware);
    this.nano.use(JwtMiddleware);
  }

  protected async initRouter() {
    this.route = new Router();
    await this.route.init(listRoutes);
    this.route.initMessage();
  }

  protected initErrorHandler() {
    this.nano.setErrorHandler(
      (err: Error, req: IHttpRequest, res: IHttpResponse): IHttpResponse => {
        let message = err.message;
        let status = 500;

        if (err instanceof EntityNotFoundError) {
          message = "Error on find entity";
          status = 404;
        }

        return res.status(status).json({
          message,
        });
      }
    );
  }

  public getRouter() {
    return this.route;
  }

  public listen() {
    const port = config("server.port");
    const url = config("server.url");
    this.nano.listen(port);

    LOGGER.info(`app is running at ${url}:${port}`);
  }

  public close() {
    this.nano.close();
    LOGGER.info("app is down");
  }
}

const AppInstance = new App();
const getApp = () => AppInstance;
const getRouter = () => AppInstance.getRouter();

export { getApp, getNano, getRouter, getDbConnection };
