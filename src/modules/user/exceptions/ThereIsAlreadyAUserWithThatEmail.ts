import { __ } from "@core/i18n";
import HttpException from "@exceptions/HttpException";

class ThereIsAlreadyAUserWithThatEmail extends HttpException {
  constructor(email: string) {
    super(__("There is already a user with the email", { email }));
    this.statusCode = 400;
  }
}

export default ThereIsAlreadyAUserWithThatEmail;
