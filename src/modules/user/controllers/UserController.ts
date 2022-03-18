import { IHttpRequest, IHttpResponse } from "nanoexpress";

import { __ } from "@core/i18n";
import { RequestToPaginateQuery } from "@core/paginate/RequestToPaginateQuery";

import UserService from "../services/user.service";
import UserResponse from "../dto/UserResponse.dto";
import UserRequest from "../dto/UserRequest.dto";

const userService = new UserService();
const findAll = async (req: IHttpRequest, res: IHttpResponse) => {
  const query = RequestToPaginateQuery(req);
  const users = await userService.findAll(query);
  users.data = users.data.map((user: any) => new UserResponse(user));
  return res.json(users);
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
  await userService.update(id, userRequest);
  return res.json({ message: __("User updated successfully") });
};

const remove = async (req: IHttpRequest, res: IHttpResponse) => {
  const { id }: any = req.params;
  await userService.findOne(id);
  await userService.remove(id);
  return res.json({ message: __("User deleted with success") });
};

export { findAll, findOne, create, update, remove };
