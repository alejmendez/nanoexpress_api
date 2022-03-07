import { IHttpRequest, IHttpResponse } from "nanoexpress";
import { Model } from "sequelize/types";
import { UserModel } from "../models/UserModel";

const findAll = async (req: IHttpRequest, res: IHttpResponse) => {
  const user: Model<any, any>[] = await UserModel.findAll();
  return res.status(200).json(user);
};

const findOne = async (req: IHttpRequest, res: IHttpResponse) => {
  const { userId }: any = req.params;
  const user = await UserModel.findOne({ where: { id: userId } });
  return user ? res.status(200).json(user) : res.status(400);
};

const create = async (req: IHttpRequest, res: IHttpResponse) => {
  const { username, email, password, role }: any = req.body;
  const user: Model<any, any> = await UserModel.create({
    username,
    email,
    password,
    role,
  });
  return res.status(201).json(user);
};

const update = async (req: IHttpRequest, res: IHttpResponse) => {
  const { userId }: any = req.params;
  const reqBody: any = req.body;
  const { user }: any = await UserModel.update(reqBody, {
    where: { id: userId },
  });
  return res.status(200).json({ message: "user updated successfully" });
};

const remove = async (req: IHttpRequest, res: IHttpResponse) => {
  const { userId }: any = req.params;
  await UserModel.destroy({ where: { id: userId } });
  return res.status(200).json({ mesage: "user deleted with success" });
};

export { findAll, findOne, create, update, remove };
