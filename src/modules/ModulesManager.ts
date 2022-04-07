import CoreModule from "./core/CoreModule";
import AuthModule from "./auth/AuthModule";

export default (): Promise<any[]> => {
  return Promise.all([...CoreModule(), ...AuthModule()]);
};
