import { __ } from "@core/i18n";
import HttpException from "@exceptions/HttpException";

export default class UserNotFound extends HttpException {
  constructor() {
    super(__("auth.wrong_username_or_password"));
    this.statusCode = 404;
  }
}
