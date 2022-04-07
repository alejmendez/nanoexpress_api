import { IHttpRequest, IHttpResponse } from "nanoexpress";
import { EntityNotFoundError } from "typeorm";

import { __ } from "@core/i18n";
import HttpException from "@exceptions/HttpException";
import ValidationError from "@exceptions/ValidationError";

export default (
  err: Error,
  _req: IHttpRequest,
  res: IHttpResponse
): IHttpResponse => {
  let message = err.message;
  let status = 500;

  console.log(err);

  if (err instanceof EntityNotFoundError) {
    message = __("Error on find entity");
    status = 404;
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({
      validation: err.errors,
    });
  }

  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      validation: err.message,
    });
  }

  return res.status(status).json({
    message,
  });
};
