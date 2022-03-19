import { __ } from "@core/i18n";
import HttpException from "@exceptions/HttpException";

export default class UserNotFound extends HttpException {
  constructor() {
    super(__("User not found"));
    this.statusCode = 404;
  }
}
