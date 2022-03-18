import { __ } from "@core/i18n";

class HttpException extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message || __("Internal Error", { message: "" }));
    this.statusCode = 500;
  }
}

export default HttpException;
