import { compare } from "bcrypt";

const hashCompare = async (
  password: string,
  passwordTarget: string
): Promise<boolean> => {
  try {
    const isMatch = await compare(password, passwordTarget);
    return isMatch === true;
  } catch (error) {
    return Promise.resolve(false);
  }
};

export { hashCompare };
