import { __ } from "@core/i18n";
import HttpException from "./HttpException";

export default class ServiceUnavailableException extends HttpException {
  constructor() {
    super(__("Service Unavailable"));
    this.statusCode = 500;
  }
}
