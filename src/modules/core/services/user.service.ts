import { getRepository } from "typeorm";
import { config } from "@core/config";
import { paginate, PaginateQuery } from "@core/paginate";

import { User } from "../entities/user.entity";
import UserRequest from "../dto/UserRequest.dto";
import { generateRandomString, hashPassword } from "../utils";
import ThereIsAlreadyAUserWithThatEmail from "../exceptions/ThereIsAlreadyAUserWithThatEmail";
import UserNotFound from "../exceptions/UserNotFound";

const validationTokenSize = Number(config("user.validationTokenSize"));
export default class UserService {
  protected repository: any;
  protected validationTokenSize: Number = validationTokenSize;

  constructor() {
    this.repository = getRepository(User);
  }

  public async findAll(query: PaginateQuery) {
    return paginate(query, this.repository, {
      sortableColumns: ["id", "username", "email"],
      searchableColumns: ["username", "email"],
      defaultSortBy: [["username", "DESC"]],
      filterableColumns: {},
    });
  }

  public async findOne(id: string) {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new UserNotFound();
    }
    return user;
  }

  public async create(data: UserRequest) {
    const user = await this.repository.create(data);
    const existUserWithEmail = await this.existUserWithEmail(user.email);
    if (existUserWithEmail) {
      throw new ThereIsAlreadyAUserWithThatEmail(data.email);
    }

    user.password = await hashPassword(user.password);

    user.verificationToken = generateRandomString(this.validationTokenSize);
    return this.repository.save(user);
  }

  async existUserWithEmail(email: string): Promise<boolean> {
    const user = await this.findOneByEmail(email);
    return user !== null && user !== undefined;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  public async update(id: string, data: UserRequest) {
    let user = await this.findOne(id);

    if (user.email !== data.email) {
      const existUserWithEmail = await this.existUserWithEmail(data.email);
      if (existUserWithEmail) {
        throw new ThereIsAlreadyAUserWithThatEmail(data.email);
      }
    }

    if (data.password !== "" && data.password !== undefined) {
      data.password = await hashPassword(data.password);
    }

    user = this.repository.merge(user, data);
    return this.repository.save(user);
  }

  public async remove(id: string) {
    await this.findOne(id);
    await this.repository.softDelete(id);
    return true;
  }
}
