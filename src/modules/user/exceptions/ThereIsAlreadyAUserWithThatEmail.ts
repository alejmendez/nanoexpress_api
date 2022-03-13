import { __ } from "../../../core/i18n";

class ThereIsAlreadyAUserWithThatEmail extends Error {
  constructor(email: string) {
    const message = __("There is already a user with the email", { email });
    super(message);
  }
}

export default ThereIsAlreadyAUserWithThatEmail;
