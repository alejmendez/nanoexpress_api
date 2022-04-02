// required
// min:3
// max:20
// numeric
// boolean
// exists:people,id
// unique:properties,name
import required from "./required";
import email from "./email";
import min from "./min";
import max from "./max";
import numeric from "./numeric";
import integer from "./integer";
import boolean from "./boolean";
import exists from "./exists";
import unique from "./unique";

export { required, email, min, max, numeric, integer, boolean, exists, unique };
