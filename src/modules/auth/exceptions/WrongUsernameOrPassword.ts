import { __ } from "@core/i18n";
import HttpException from "@exceptions/HttpException";

export default class WrongUsernameOrPassword extends HttpException {
  constructor() {
    super(__("Wrong username or password"));
    this.statusCode = 400;
  }
}
