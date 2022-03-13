import { IHttpRequest, IHttpResponse } from "nanoexpress";
import { EntityNotFoundError } from "typeorm";

export default (err: Error, _req: IHttpRequest, res: IHttpResponse): IHttpResponse => {
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
