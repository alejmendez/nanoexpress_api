import { __ } from "./i18n";

import ValidationError from "@exceptions/ValidationError";
import {
  required,
  email,
  min,
  max,
  numeric,
  integer,
  boolean,
  exists,
  unique,
} from "./validators";
import Validator from "./validators/Validator";

const validators: { [key: string]: Validator } = {
  required: new required(),
  email: new email(),
  min: new min(),
  max: new max(),
  numeric: new numeric(),
  integer: new integer(),
  boolean: new boolean(),
  exists: new exists(),
  unique: new unique(),
};

const getValidator = (validatorName: string) => {
  return validators[validatorName];
};

export default class Request {
  protected validate(schema: any, data: any) {
    let valid = true;
    const errors: any = {};

    Object.entries(schema).map((entry) => {
      const nameField = entry[0];
      const rules = entry[1] as Array<string>;
      const value = data[nameField];
      const error = this.validateField(rules, value, nameField);
      if (error.length) {
        valid = false;
        errors[nameField] = error;
      }
    });

    if (valid) {
      return;
    }

    throw new ValidationError(errors);
  }

  protected validateField(rules: Array<string>, value: any, nameField: string) {
    const errors: any[] = [];

    rules.map((rule: any) => {
      let [ruleName, args] = rule.split(":");
      args = args ? args.split(",") : [];
      const validator = getValidator(ruleName);
      const result = validator.validate(nameField, value, args);
      if (result !== true) {
        errors.push(result);
      }
    });

    return errors;
  }
}
