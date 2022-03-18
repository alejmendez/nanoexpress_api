import { __ } from "@core/i18n";
import HttpException from "@exceptions/HttpException";

class UserNotFound extends HttpException {
  constructor() {
    super(__("User not found"));
    this.statusCode = 404;
  }
}

export default UserNotFound;
