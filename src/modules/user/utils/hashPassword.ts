import { hash } from "bcrypt";
import { config } from "../../../core/config";

const saltForPasswords = Number(config("user.saltForPasswords"));

const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await hash(password, saltForPasswords);
    return String(hashedPassword);
  } catch (error) {
    return "";
  }
};

export { hashPassword };
