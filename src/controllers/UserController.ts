import { IHttpRequest, IHttpResponse } from "nanoexpress";
import UserRequest from "../dto/UserResquest.dto";
import UserService from "../services/user.service";

const findAll = async (req: IHttpRequest, res: IHttpResponse) => {
  const userService = new UserService();
  const user = await userService.findAll();
  return res.status(200).json(user);
};

const findOne = async (req: IHttpRequest, res: IHttpResponse) => {
  const { id }: any = req.params;
  const userService = new UserService();
  const user = await userService.findOne(id);
  return user ? res.status(200).json(user) : res.status(400);
};

const create = async (req: IHttpRequest, res: IHttpResponse) => {
  const userRequest = new UserRequest(req.body);
  const userService = new UserService();
  const user = await userService.create(userRequest);
  return res.status(201).json(user);
};

const update = async (req: IHttpRequest, res: IHttpResponse) => {
  const { id }: any = req.params;
  const userRequest = new UserRequest(req.body);
  const userService = new UserService();
  const { user }: any = await userService.update(id, userRequest);
  return res.status(200).json({ message: "user updated successfully" });
};

const remove = async (req: IHttpRequest, res: IHttpResponse) => {
  const { id }: any = req.params;
  const userService = new UserService();
  await userService.remove(id);
  return res.status(200).json({ mesage: "user deleted with success" });
};

export { findAll, findOne, create, update, remove };
