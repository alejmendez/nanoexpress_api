import { __ } from "@core/i18n";
import isInt from "validator/lib/isInt";
import Validator from "./Validator";

export default class IntegerValidator implements Validator {
  constructor() {}

  public validate(
    nameField: string,
    value: any,
    args: Array<any>
  ): string | boolean {
    if (isInt(value)) {
      return true;
    }
    return __("validator.integer", { nameField });
  }
}
