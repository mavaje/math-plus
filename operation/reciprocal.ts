import {Number} from '../number/number';
import {Integer} from "../number/integer";
import {Rational} from "../number/rational";

export class Reciprocal {
    static apply(a: Integer|Rational): Integer|Rational;
    static apply(a: Number): Number;
    static apply(a: Number): Number {
        if (a instanceof Integer) a = Rational.from(a);
        if (a instanceof Rational) {
            return Rational.from(
                a.denominator,
                a.numerator,
            ).simplify();
        }
    }
}
