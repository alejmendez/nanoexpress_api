import { IHttpRequest, IHttpResponse } from "nanoexpress";
import UserService from "../services/user.service";

import UserResponse from "../dto/UserResponse.dto";
import UserRequest from "../dto/UserRequest.dto";

const userService = new UserService();
const findAll = async (_req: IHttpRequest, res: IHttpResponse) => {
  const users = await userService.findAll();
  const usersResponse = users.map((user: any) => {
    return new UserResponse(user);
  });
  return res.json(usersResponse);
};

const findOne = async (req: IHttpRequest, res: IHttpResponse) => {
  const { id }: any = req.params;
  const user = await userService.findOne(id);
  return res.json(new UserResponse(user));
};

const create = async (req: IHttpRequest, res: IHttpResponse) => {
  const userRequest = new UserRequest(req.body);
  const user = await userService.create(userRequest);
  return res.status(201).json(new UserResponse(user));
};

const update = async (req: IHttpRequest, res: IHttpResponse) => {
  const { id }: any = req.params;
  const userRequest = new UserRequest(req.body);
  const { user }: any = await userService.update(id, userRequest);
  return res.json({ message: "User updated successfully" });
};

const remove = async (req: IHttpRequest, res: IHttpResponse) => {
  const { id }: any = req.params;
  await userService.findOne(id);
  await userService.remove(id);
  return res.json({ mesage: "User deleted with success" });
};

export { findAll, findOne, create, update, remove };
