import {Number} from '../number/number';
import {Integer} from "../number/integer";
import {Rational} from "../number/rational";
import {Addition} from "./addition";
import {Negative} from "./negative";

export class Subtraction {
    static apply(a: Integer, b: Integer): Integer;
    static apply(a: Integer|Rational, b: Integer|Rational): Integer|Rational;
    static apply(a: Number, b: Number): Number;
    static apply(a: Number, b: Number): Number {
        return Addition.apply(
            a,
            Negative.apply(b),
        );
    }
}
