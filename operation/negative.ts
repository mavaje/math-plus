import {Number} from '../number/number';
import {Integer} from "../number/integer";
import {Rational} from "../number/rational";
import {Multiplication} from "./multiplication";

export class Negative {
    static apply(a: Integer): Integer;
    static apply(a: Rational): Rational;
    static apply(a: Number): Number;
    static apply(a: Number): Number {
        return Multiplication.apply(a, Integer.NEGATIVE_ONE);
    }
}
