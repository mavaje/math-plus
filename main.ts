import {integer} from "./number";
import {Addition} from "./operation/addition";

const a = integer(1);
const b = integer(1);

console.log(new Addition().apply(a, b));
