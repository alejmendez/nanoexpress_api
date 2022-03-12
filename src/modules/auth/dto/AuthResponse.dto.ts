import { config } from "../../../core/config";

const expiresIn = config("jwt.expiresIn", 3600);
class UserResponse {
  token: string;
  token_type: string;
  expires_in: string;
  constructor(token: string) {
    this.token = token;
    this.token_type = "bearer";
    this.expires_in = expiresIn;
  }
}

export default UserResponse;
