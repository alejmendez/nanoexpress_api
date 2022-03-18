import { config } from "@core/config";

const jwtExpirationTimeWithRememberMe = config(
  "jwt.expirationTimeWithRememberMe"
);
const jwtExpiresIn = config("jwt.expiresIn");

class UserResponse {
  token: string;
  token_type: string;
  expires_in: Number;
  constructor(token: string, rememberMe: boolean) {
    this.token = token;
    this.token_type = "bearer";
    this.expires_in = rememberMe
      ? jwtExpirationTimeWithRememberMe
      : jwtExpiresIn;
  }
}

export default UserResponse;
