import { __ } from "../../../core/i18n";

class UserNotFound extends Error {
  constructor() {
    const message = __("User not found");
    super(message);
  }
}

export default UserNotFound;