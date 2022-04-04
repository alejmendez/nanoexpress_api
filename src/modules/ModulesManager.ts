import CoreModule from "./core/CoreModule";
import AuthModule from "./auth/AuthModule";

export default () => {
  return Promise.all([...CoreModule(), ...AuthModule()]);
};
