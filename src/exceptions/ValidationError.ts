import { __ } from "@core/i18n";

class ValidationError extends Error {
  errors: any = {};
  constructor(errorsList: any[]) {
    super();

    for (const error of errorsList) {
      const { params, keyword } = error;
      switch (keyword) {
        case "required":
          this.addError(params.missingProperty, "The field is required");
          break;
        case "additionalProperties":
          this.addError(
            params.additionalProperty,
            "Must not have additional property"
          );
          break;
      }
    }
  }

  addError(field: string, message: string) {
    if (!this.errors[field]) {
      this.errors[field] = [];
    }
    this.errors[field].push(__(message, { field }));
  }
}

export default ValidationError;
