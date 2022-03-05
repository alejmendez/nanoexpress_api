import { IHttpRequest, IHttpResponse } from "nanoexpress";
import { Model } from "sequelize/types";
import LOGGER from "../lib/logger";
import { UserModel } from "../models/UserModel";

class UserController {
  async findAll(req: IHttpRequest, res: IHttpResponse) {
    const user: Model<any, any>[] = await UserModel.findAll();
    LOGGER.http("[GET] request on endpoint /users");
    return res.status(200).json(user);
  }

  async findOne(req: IHttpRequest, res: IHttpResponse) {
    const { userId }: any = req.params;
    const user = await UserModel.findOne({ where: { id: userId } });
    LOGGER.http("[GET] request on endpoint /users");
    return user ? res.status(200).json(user) : res.status(400);
  }

  async create(req: IHttpRequest, res: IHttpResponse) {
    const reqBody: any = req.body;
    const { username, email, password, role }: any = JSON.parse(reqBody.toString());
    const user: Model<any, any> = await UserModel.create({
      username,
      email,
      password,
      role,
    });
    LOGGER.http("[POST] request on endpoint /users");
    return res.status(201).json(user);
  }

  async update(req: IHttpRequest, res: IHttpResponse) {
    const { userId }: any = req.params;
    const reqBody: any = req.body;
    const { user }: any = await UserModel.update(
      JSON.parse(reqBody.toString()),
      { where: { id: userId } }
    );
    LOGGER.http("[PUT] request on endpoint /users");
    return res.status(200).json({ message: "user updated successfully" });
  }

  async delete(req: IHttpRequest, res: IHttpResponse) {
    const { userId }: any = req.params;
    await UserModel.destroy({ where: { id: userId } });
    LOGGER.http("[DELETE] request on endpoint /users");
    return res.status(200).json({ mesage: "user deleted with success" });
  }
}

export default new UserController();
