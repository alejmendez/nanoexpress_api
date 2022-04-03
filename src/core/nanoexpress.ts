import nanoexpress from "nanoexpress";

let nanoexpressInstance: nanoexpress.INanoexpressApp;

const getNano = () => {
  if (!nanoexpressInstance) {
    nanoexpressInstance = nanoexpress();
  }
  return nanoexpressInstance;
};
export { getNano };
