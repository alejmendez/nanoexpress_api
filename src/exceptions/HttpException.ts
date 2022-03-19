import { __ } from "@core/i18n";

export default class HttpException extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message || __("Internal Error", { message: "" }));
    this.statusCode = 500;
  }
}
