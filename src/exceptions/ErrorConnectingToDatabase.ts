import { __ } from "@core/i18n";
import HttpException from "./HttpException";

export default class ErrorConnectingToDatabase extends HttpException {
  constructor() {
    super(__("error_connecting_to_database"));
    this.statusCode = 503;
  }
}
