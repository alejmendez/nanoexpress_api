import { hash } from "bcrypt";

const saltRoundsUsedToGeneratePasswords = 12;

const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await hash(password, saltRoundsUsedToGeneratePasswords);
    return String(hashedPassword);
  } catch (error) {
    return "";
  }
};

export { hashPassword };
