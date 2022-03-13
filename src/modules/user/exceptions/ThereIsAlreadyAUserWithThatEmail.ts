class ThereIsAlreadyAUserWithThatEmail extends Error {
  constructor(email: string) {
    const message = `There is already a user with the email ${email}`;
    super(message);
  }
}

export default ThereIsAlreadyAUserWithThatEmail;
