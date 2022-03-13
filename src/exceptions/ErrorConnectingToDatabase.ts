import { __ } from "../core/i18n";
import HttpException from "./HttpException";

class ErrorConnectingToDatabase extends HttpException {
  constructor() {
    super(__("Error connecting to database"));
    this.statusCode = 503;
  }
}

export default ErrorConnectingToDatabase;
