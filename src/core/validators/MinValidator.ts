import { __ } from "@core/i18n";
import isLength from "validator/lib/isLength";
import Validator from "./Validator";

export default class MinValidator implements Validator {
  constructor() {}

  public validate(
    nameField: string,
    value: any,
    args: Array<any>
  ): string | boolean {
    const [min] = args;
    if (isLength(value, { min })) {
      return true;
    }
    return __("validator.min", { nameField, min });
  }
}
