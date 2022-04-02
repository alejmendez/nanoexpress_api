import { __ } from "@core/i18n";
import Validator from "./Validator";

export default class ExistsValidator implements Validator {
  constructor() {}

  public validate(
    nameField: string,
    value: any,
    args: Array<any>
  ): string | boolean {
    if (false) {
      return __("validator.required", { nameField });
    }

    return true;
  }
}
