import nanoexpress from "nanoexpress";
import { getNano } from "./nanoexpress";
import { getRouter } from "./route";

import LoggerMiddleware from "../middlewares/logger";
import jwt from "../middlewares/authenticate";

class App {
  protected nanoexpressInstance: nanoexpress.INanoexpressApp;
  constructor() {
    this.nanoexpressInstance = getNano();
    this.initMiddleware();
  }

  public initMiddleware() {
    this.nanoexpressInstance.use(LoggerMiddleware);
    this.nanoexpressInstance.use(jwt);
  }

  public getNanoInstance() {
    return this.nanoexpressInstance;
  }

  public getRoute() {
    return getRouter();
  }
}

const AppInstance = new App();
const getApp = () => AppInstance;

export { getApp, getNano, getRouter };
