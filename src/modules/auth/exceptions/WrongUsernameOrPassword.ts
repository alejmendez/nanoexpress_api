import { __ } from "../../../core/i18n";

class WrongUsernameOrPassword extends Error {
  constructor() {
    const message = __("Wrong username or password");
    super(message);
  }
}

export default WrongUsernameOrPassword;
