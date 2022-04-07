import { __ } from "@core/i18n";
import isBoolean from "validator/lib/isBoolean";
import Validator from "./Validator";

export default class BooleanValidator implements Validator {
  constructor() {}

  public validate(
    nameField: string,
    value: any,
    _: Array<any>
  ): string | boolean {
    try {
      const allowedValues = [
        "true",
        "false",
        "1",
        "0",
        "yes",
        "no",
        "on",
        "off",
        1,
        0,
        true,
        false,
      ];
      if (allowedValues.includes(value)) {
        return true;
      }
    } catch (err) {}
    return __("validator.boolean", { nameField });
  }
}
