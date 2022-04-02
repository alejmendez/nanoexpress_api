import { __ } from "@core/i18n";
import isBoolean from "validator/lib/isBoolean";
import Validator from "./Validator";

export default class BooleanValidator implements Validator {
  constructor() {}

  public validate(
    nameField: string,
    value: any,
    args: Array<any>
  ): string | boolean {
    if (isBoolean(value)) {
      return true;
    }
    return __("validator.boolean", { nameField });
  }
}
