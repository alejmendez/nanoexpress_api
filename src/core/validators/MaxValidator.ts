import { __ } from "@core/i18n";
import isLength from "validator/lib/isLength";
import Validator from "./Validator";

export default class MaxValidator implements Validator {
  constructor() {}

  public validate(
    nameField: string,
    value: any,
    args: Array<any>
  ): string | boolean {
    const [max] = args;
    if (isLength(value, { max })) {
      return true;
    }
    return __("validator.max", { nameField, max });
  }
}
