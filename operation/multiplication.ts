import {Number} from '../number/number';
import {Integer} from "../number/integer";
import {Rational} from "../number/rational";

export class Multiplication {
    static IDENTITY = Integer.ONE;

    static apply(a: Integer, b: Integer): Integer;
    static apply(a: Integer|Rational, b: Integer|Rational): Integer|Rational;
    static apply(a: Number, b: Number): Number;
    static apply(a: Number, b: Number): Number {
        if (a instanceof Integer && b instanceof Integer) {
            return Integer.from(a.value * b.value);
        }

        if (a instanceof Integer) a = Rational.from(a);
        if (b instanceof Integer) b = Rational.from(b);
        if (a instanceof Rational && b instanceof Rational) {
            return Rational.from(
                Multiplication.apply(a.numerator, b.numerator),
                Multiplication.apply(a.denominator, b.denominator),
            ).simplify();
        }
    }
}
