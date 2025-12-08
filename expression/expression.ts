import {Parenthesizer} from "../parenthesizer";
import {Number} from "./number/number";

export abstract class Expression {

    abstract evaluate(): Number;

    abstract to_string(parenthesizer?: Parenthesizer): string;
}
