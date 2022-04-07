import { __ } from "@core/i18n";

export default class ValidationError extends Error {
  errors: any = {};
  constructor(errors: any) {
    super();
    this.errors = errors;
  }
}
