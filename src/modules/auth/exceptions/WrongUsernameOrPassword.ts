class WrongUsernameOrPassword extends Error {
  constructor() {
    const message = "wrong username or password";
    super(message);
  }
}

export default WrongUsernameOrPassword;
