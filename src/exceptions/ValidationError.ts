import { __ } from "@core/i18n";

export default class ValidationError extends Error {
  errors: any = {};
  constructor(errorsList: any[]) {
    super();

    for (const error of errorsList) {
      const { params, keyword } = error;
      let fieldName = "";
      let message = "";
      switch (keyword) {
        case "additionalItems":
        case "items":
          message = "Must_not_have_more_than_n_element";
          break;
        case "additionalProperties":
          fieldName = params.additionalProperty;
          message = "Must_not_have_additional_property";
          break;
        case "anyOf":
          message = "Must_not_have_additional_property";
          break;
        case "const":
          message = "Must_be_equal_to_constant";
          break;
        case "contains":
          message = "Must_contain_a_valid_item";
          break;
        case "dependencies":
        case "dependentRequired":
          message = "Must_have_property_deps_when_property_property_is_present";
          break;
        case "discriminator":
          message = "Tag_tag_must_be_string";
          break;
        case "enum":
          message = "Must_be_equal_to_one_of_the_allowed_values";
          break;
        case "false schema":
          message = "Boolean_schema_is_false";
          break;
        case "format":
          fieldName = params.format;
          console.log({ errorValidationNotTracked: error });
          message = "Must_match_format";
          break;
        case "formatMaximum":
        case "formatExclusiveMaximum":
        case "formatMinimum":
        case "formatExclusiveMinimum":
        case "maximum":
        case "exclusiveMaximum":
        case "minimum":
        case "exclusiveMinimum":
          message = "Must_be";
          break;
        case "if":
          message = "Must_match_schema";
          break;
        case "maxItems":
          message = "Must_NOT_have_more_than_n_item";
          break;
        case "maxLength":
          message = "Must_NOT_be_longer_than_n_character";
          break;
        case "maxProperties":
          message = "Must_NOT_have_more_than_n_property";
          break;
        case "minItems":
          message = "Must_NOT_have_less_than_n_item";
          break;
        case "minLength":
          message = "Must_NOT_be_shorter_than_n_character";
          break;
        case "minProperties":
          message = "Must_NOT_have_less_than_n_property";
          break;
        case "multipleOf":
          message = "Must_be_a_multiple_of";
          break;
        case "not":
          message = 'must_NOT_be_valid_according_to_schema_in_"not"';
          break;
        case "oneOf":
          message = 'must_match_exactly_one_schema_in_"oneOf"';
          break;
        case "pattern":
          message = "Must_match_pattern";
          break;
        case "patternRequired":
          message = "Must_have_property_matching_pattern";
          break;
        case "propertyNames":
          message = "Property_name_is_invalid";
          break;
        case "required":
          fieldName = params.missingProperty;
          message = "The_field_is_required";
          break;
        case "type":
          message = "Must_be_type";
          break;
        case "unevaluatedItems":
          message = "Must_NOT_have_more_than_n_item";
          break;
        case "unevaluatedProperties":
          message = "Must_NOT_have_unevaluated_properties";
          break;
        case "uniqueItems":
          message =
            "must NOT have duplicate items (items ## j and i are identical)";
          break;
        default:
          message = "Property_name_is_invalid";
      }
      params.field = fieldName;
      this.addError(message, fieldName, params);
    }
  }

  protected addError(message: string, field: string, params?: any) {
    if (!this.errors[field]) {
      this.errors[field] = [];
    }
    params.field = field;
    this.errors[field].push(__(message, { field }));
  }
}
