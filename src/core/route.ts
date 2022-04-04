import nanoexpress, {
  HttpRoute,
  IHttpRequest,
  IHttpResponse,
} from "nanoexpress";
import { padEnd } from "lodash";
import LOGGER from "./logger";
import { getNano } from "./nanoexpress";

type HandlerFunction = (
  req: IHttpRequest,
  res: IHttpResponse
) => Promise<IHttpResponse>;

class Router {
  protected app: nanoexpress.INanoexpressApp;
  protected listRoutes: Array<any> = [];
  protected config: any = {
    controllersPath: "../controllers/",
  };

  constructor(config: any = {}) {
    this.app = getNano();
    this.setConfig(config);
  }

  setConfig(config: any) {
    this.config = config;
  }

  public getListRoutes() {
    return this.listRoutes;
  }

  public async init(listRoutes: any[]) {
    const routes = [];
    for (const route of listRoutes) {
      if (route.group) {
        const groupRoute = this.group(route);
        routes.push(...groupRoute);
        continue;
      }

      const { method, path, handler } = route;
      routes.push(this.registerEndPoint(method, path, handler));
    }
    await Promise.all(routes);
  }

  public initMessage() {
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

  protected group(groupRoute: any): Array<Promise<boolean>> {
    const pathGroup = groupRoute.path;
    const routes = groupRoute.routes;
    const routesGroup: Array<Promise<boolean>> = [];

    for (const route of routes) {
      const { method, path, handler } = route;
      routesGroup.push(
        this.registerEndPoint(method, `${pathGroup}/${path}`, handler)
      );
    }

    return routesGroup;
  }

  protected async registerEndPoint(
    method: string,
    path: string,
    handler: HandlerFunction
  ): Promise<boolean> {
    path = path.replace(/\/\//g, "/").replace(/\/+$/, "");
    this.listRoutes.push([method, path]);
    switch (method) {
      case "get":
        this.app.get(path, handler);
        break;
      case "post":
        this.app.post(path, handler);
        break;
      case "put":
        this.app.put(path, handler);
        break;
      case "patch":
        this.app.patch(path, handler);
        break;
      case "del":
        this.app.del(path, handler);
        break;
      case "options":
        this.app.options(path, handler);
        break;
      case "any":
        this.app.any(path, handler);
        break;
    }
    return true;
  }
}

let routeInstance: Router;
const getRouter = () => {
  if (!routeInstance) {
    routeInstance = new Router();
  }
  return routeInstance;
};

export { Router, getRouter };
