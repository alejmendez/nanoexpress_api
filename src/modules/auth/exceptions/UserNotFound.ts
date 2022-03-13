import { __ } from "../../../core/i18n";

class UserNotFound extends Error {
  constructor() {
    const message = __("Wrong username or password");
    super(message);
  }
}

export default UserNotFound;
