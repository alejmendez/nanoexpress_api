import { __ } from "../core/i18n";
import HttpException from "./HttpException";

class ServiceUnavailableException extends HttpException {
  constructor() {
    super(__("Service Unavailable"));
    this.statusCode = 500;
  }
}

export default ServiceUnavailableException;
