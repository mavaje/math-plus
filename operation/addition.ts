import {Number} from '../number/number';
import {Integer} from "../number/integer";
import {Rational} from "../number/rational";
import {Multiplication} from "./multiplication";

export class Addition {
    static IDENTITY = Integer.ZERO;

    static apply(a: Integer, b: Integer): Integer;
    static apply(a: Integer|Rational, b: Integer|Rational): Integer|Rational;
    static apply(a: Number, b: Number): Number;
    static apply(a: Number, b: Number): Number {
        if (a instanceof Integer && b instanceof Integer) {
            return Integer.from(a.value + b.value);
        }

        if (a instanceof Integer) a = Rational.from(a);
        if (b instanceof Integer) b = Rational.from(b);
        if (a instanceof Rational && b instanceof Rational) {
            return Rational.from(
                Addition.apply(
                    Multiplication.apply(a.numerator, b.denominator),
                    Multiplication.apply(b.numerator, a.denominator),
                ),
                Multiplication.apply(a.denominator, b.denominator),
            ).simplify();
        }
    }
}
