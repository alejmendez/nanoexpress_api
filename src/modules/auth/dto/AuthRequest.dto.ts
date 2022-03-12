class AuthRequest {
  email: string;
  password: string;

  constructor(data: any) {
    this.email = data.email.toLowerCase();
    this.password = data.password;
  }
}

export default AuthRequest;
