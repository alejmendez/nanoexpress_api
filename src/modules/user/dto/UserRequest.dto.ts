class UserRequest {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;

  constructor(data: any) {
    this.username = data.username.toLowerCase();
    this.email = data.email.toLowerCase();
    this.password = data.password;
    this.role = data.role.toLowerCase();
  }
}

export default UserRequest;
