import { __ } from "./i18n";

import ValidationError from "@exceptions/ValidationError";
import {
  RequiredValidator,
  EmailValidator,
  MinValidator,
  MaxValidator,
  NumericValidator,
  IntegerValidator,
  BooleanValidator,
} from "./validators";
import Validator from "./validators/Validator";

const validators: { [key: string]: Validator } = {
  required: new RequiredValidator(),
  email: new EmailValidator(),
  min: new MinValidator(),
  max: new MaxValidator(),
  numeric: new NumericValidator(),
  integer: new IntegerValidator(),
  boolean: new BooleanValidator(),
};

export default class Request {
  protected valid: boolean;

  public isValid() {
    return this.valid;
  }

  protected validate(schema: any, data: any) {
    this.valid = true;
    const errors: any = {};

    Object.entries(schema).map((entry) => {
      const nameField = entry[0];
      const rules = entry[1] as Array<string>;
      const value = data[nameField];
      const error = this.validateField(rules, value, nameField);
      if (error.length) {
        this.valid = false;
        errors[nameField] = error;
      }
    });

    if (!this.valid) {
      throw new ValidationError(errors);
    }
  }

  protected validateField(rules: Array<string>, value: any, nameField: string) {
    const errors: any[] = [];

    rules.map((rule: any) => {
      let [ruleName, args] = rule.split(":");
      args = args ? args.split(",") : [];
      const validator = this.getValidator(ruleName);
      const result = validator.validate(nameField, value, args);
      if (result !== true) {
        errors.push(result);
      }
    });

    return errors;
  }

  protected getValidator(validatorName: string) {
    return validators[validatorName];
  }
}
