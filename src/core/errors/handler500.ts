import { IHttpRequest, IHttpResponse } from "nanoexpress";
import { EntityNotFoundError } from "typeorm";
import ValidationError from "../../exceptions/ValidationError";
import { __ } from "../i18n";

export default (err: Error, _req: IHttpRequest, res: IHttpResponse): IHttpResponse => {
  let message = err.message;
  let status = 500;

  if (err instanceof EntityNotFoundError) {
    message = __("Error on find entity");
    status = 404;
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({
      validation: err.errors,
    });
  }

  return res.status(status).json({
    message,
  });
}
