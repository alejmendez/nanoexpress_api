import { getRepository } from "typeorm";

import { User } from "../entities/user.entity";

class UserService {
  protected repository: any;
  constructor() {
    this.repository = getRepository(User);
  }

  public async findAll(){
    const user = await this.repository.find();
    return user;
  };

  public async findOne (id: string) {
    const user = await this.repository.findOne({ id });
    return user;
  };

  public async create (data: any) {
    const { username, email, password, role }: any = data;
    const user = await this.repository.create({
      username,
      email,
      password,
      role,
    });
    return user;
  };

  public async update (id: string, data: any) {
    const { user }: any = await this.repository.update(data, {
      id,
    });
    return user;
  };

  public async remove (id: string) {
    await this.repository.destroy({ id });
    return true;
  };
}

export default UserService;
