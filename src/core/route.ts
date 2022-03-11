import nanoexpress, { HttpRoute } from "nanoexpress";
import { padEnd } from "lodash";
import LOGGER from "../lib/logger";
import { getNano } from "./nanoexpress";

class Router {
  protected app: nanoexpress.INanoexpressApp;
  protected listRoutes: Array<any> = [];

  constructor() {
    this.app = getNano();
  }

  public getListRoutes() {
    return this.listRoutes;
  }

  public async init(listRoutes: any[]) {
    await Promise.all(
      listRoutes.map(async (route) => {
        if (route.group) {
          return await this.group(route);
        }

        const { method, path, handler } = route;
        await this.registerEndPoint(method, path, handler);
      })
    );
  }

  public initMessage() {
    LOGGER.info("list of registered routes: ");
    let maxLengthHandlerName = 0;
    this.listRoutes.map((route) => {
      const handlerNameLength = route[2].length;
      if (handlerNameLength > maxLengthHandlerName) {
        maxLengthHandlerName = handlerNameLength;
      }
    });
    maxLengthHandlerName++;
    this.listRoutes.map(([method, path, handlerName]) => {
      method = padEnd(method.toUpperCase(), 5);
      handlerName = padEnd(handlerName, maxLengthHandlerName);
      LOGGER.info(`${method} ${handlerName} ${path}`);
    });
  }

  protected async group(groupRoute: any) {
    const pathGroup = groupRoute.path;
    const groupName = groupRoute.path;
    const routes = groupRoute.routes;

    return await Promise.all(
      routes.map(async (route: any) => {
        let { method, path, handler } = route;
        path = `${pathGroup}/${path}`;
        return await this.registerEndPoint(method, path, handler);
      })
    );
  }

  protected async registerEndPoint(
    method: string,
    path: string,
    handlerName: string
  ) {
    const handler = await this.getHandler(handlerName);
    path = path.replace(/\/\//g, "/").replace(/\/+$/, "");
    this.listRoutes.push([method, path, handlerName]);
    switch (method) {
      case "get":
        return this.app.get(path, handler);
      case "post":
        return this.app.post(path, handler);
      case "put":
        return this.app.put(path, handler);
      case "patch":
        return this.app.patch(path, handler);
      case "del":
        return this.app.del(path, handler);
      case "options":
        return this.app.options(path, handler);
      case "any":
        return this.app.any(path, handler);
    }
  }

  protected async getHandler(handler: string): Promise<HttpRoute> {
    const [controllerName, handlerName] = handler.split("@");
    const controller = await this.getController(controllerName);
    return controller[handlerName];
  }

  protected async getController(controllerName: string) {
    const controller = await import(`../controllers/${controllerName}`);
    return controller;
  }
}

export { Router };
