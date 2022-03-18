import { __ } from "@core/i18n";
import HttpException from "@exceptions/HttpException";

class UserNotFound extends HttpException {
  constructor() {
    super(__("Wrong username or password"));
    this.statusCode = 404;
  }
}

export default UserNotFound;
