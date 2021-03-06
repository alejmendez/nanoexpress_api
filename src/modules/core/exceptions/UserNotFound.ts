import { __ } from "@core/i18n";
import HttpException from "@exceptions/HttpException";

export default class UserNotFound extends HttpException {
  constructor() {
    super(__("user.user_not_found"));
    this.statusCode = 404;
  }
}
