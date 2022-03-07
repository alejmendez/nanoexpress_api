import nanoexpress from "nanoexpress";
import { getNano } from "./nanoexpress";
import { getRouter } from "./route";

import bodyparser from "../middlewares/bodyparser";
import LoggerMiddleware from "../middlewares/logger";
import jwt from "../middlewares/authenticate";
import { config } from "./config";
import LOGGER from "../lib/logger";
import corsMiddleware from "../middlewares/cors";

class App {
  protected nano: nanoexpress.INanoexpressApp;
  protected route;
  constructor() {
    this.nano = getNano();
    this.route = getRouter();
    this.initMiddleware();
  }

  public initMiddleware() {
    this.nano.use(LoggerMiddleware);
    this.nano.use(bodyparser);
    this.nano.use(corsMiddleware);
    this.nano.use(jwt);
  }

  public getNanoInstance() {
    return this.nano;
  }

  public getRoute() {
    return this.route;
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
  }
}

const AppInstance = new App();
const getApp = () => AppInstance;

export { getApp, getNano, getRouter };
