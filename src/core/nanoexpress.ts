import nanoexpress from "nanoexpress";

const nanoexpressInstance: nanoexpress.INanoexpressApp = nanoexpress();

const getNano = () => nanoexpressInstance;
export { getNano };
