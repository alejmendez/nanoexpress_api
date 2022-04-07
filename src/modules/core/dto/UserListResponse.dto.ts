import { Paginated } from "@core/paginate";
import { User } from "../entities/user.entity";
import UserResponse from "./UserResponse.dto";

export default class UserListResponse extends Paginated<UserResponse> {
  constructor(paginated: Paginated<User>) {
    super();
    const data = paginated as any;
    this.data = data.data.map((user: any) => new UserResponse(user));
    this.meta = data.meta;
    this.links = data.links;
  }
}
