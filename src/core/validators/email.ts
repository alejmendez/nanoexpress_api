import { __ } from "@core/i18n";
import isEmail from "validator/lib/isEmail";
import Validator from "./Validator";

export default class EmailValidator implements Validator {
  constructor() {}

  public validate(
    nameField: string,
    value: any,
    args: Array<any>
  ): string | boolean {
    if (isEmail(value)) {
      return true;
    }
    return __("validator.email", { nameField });
  }
}
