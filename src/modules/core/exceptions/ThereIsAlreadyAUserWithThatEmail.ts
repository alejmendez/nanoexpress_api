import { __ } from "@core/i18n";
import HttpException from "@exceptions/HttpException";

export default class ThereIsAlreadyAUserWithThatEmail extends HttpException {
  constructor(email: string) {
    super(__("There is already a user with the email", { email }));
    this.statusCode = 400;
  }
}
