class UserResponse {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;

  constructor(data: any) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.role = data.role;
  }
}

export default UserResponse;
