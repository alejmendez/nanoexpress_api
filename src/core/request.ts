import Ajv from "ajv";
import ValidationError from "@exceptions/ValidationError";
import { __ } from "./i18n";

const ajv = new Ajv({allErrors: true});

class Request {
  protected schema: any;

  protected validate(data: any) {
    const ajvValidate: any = ajv.compile(this.schema);
    const result = ajvValidate(data);

    if (result) {
      return;
    }

    throw new ValidationError(ajvValidate.errors);
  }
}

export default Request;
