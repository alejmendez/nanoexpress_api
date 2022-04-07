import { __ } from "@core/i18n";
import isNumeric from "validator/lib/isNumeric";
import Validator from "./Validator";

export default class NumericValidator implements Validator {
  constructor() {}

  public validate(
    nameField: string,
    value: any,
    _: Array<any>
  ): string | boolean {
    if (isNumeric(value)) {
      return true;
    }
    return __("validator.numeric", { nameField });
  }
}
