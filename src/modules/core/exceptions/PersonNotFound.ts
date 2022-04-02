import { __ } from "@core/i18n";
import HttpException from "@exceptions/HttpException";

class PersonNotFound extends HttpException {
  constructor() {
    super(__("person.person_not_found"));
    this.statusCode = 404;
  }
}

export default PersonNotFound;
