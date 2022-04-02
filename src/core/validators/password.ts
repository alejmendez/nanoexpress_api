import { __ } from "@core/i18n";
import isBoolean from "validator/lib/isBoolean";
import Validator from "./Validator";

export default class PasswordValidator implements Validator {
  constructor() {}

  public validate(
    nameField: string,
    value: any,
    args: Array<any>
  ): string | boolean {
    if (false) {
      return true;
    }
    return __("validator.password", { nameField });
  }
}
