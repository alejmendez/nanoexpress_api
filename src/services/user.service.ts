import { getRepository } from "typeorm";
import UserRequest from "../dto/UserResquest.dto";

import { User } from "../entities/user.entity";
import { generateRandomString, hashPassword } from "../utils";

class UserService {
  protected repository: any;
  readonly numberOfCharactersUsedToGenerateUserValidationToken = 64;

  constructor() {
    this.repository = getRepository(User);
  }

  public async findAll() {
    const user = await this.repository.find();
    return user;
  }

  public async findOne(id: string) {
    return await this.repository.findOneOrFail(id);
  }

  public async create(data: UserRequest) {
    const user = await this.repository.create(data);
    const existUserWithEmail = await this.existUserWithEmail(user.email);
    if (existUserWithEmail) {
      throw new Error(`There is already a user with the email ${user.email}`);
    }

    user.password = await hashPassword(user.password);

    user.verificationToken = generateRandomString(
      this.numberOfCharactersUsedToGenerateUserValidationToken,
    );
    return this.repository.save(user);
  }

  async existUserWithEmail(email: string): Promise<boolean> {
    const user = await this.findOneByEmail(email);
    return user !== null;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ email });
    if (user) {
      return user;
    }
    return null;
  }

  public async update(id: string, data: UserRequest) {
    const user = await this.repository.findOne(id);
    this.repository.merge(user, data);
    return this.repository.save(user);
  }

  public async remove(id: string) {
    try {
      const user = await this.findOne(id);
      await this.repository.softDelete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default UserService;
