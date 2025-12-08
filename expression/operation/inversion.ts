import {Number} from '../number/number';
import {Integer} from "../number/integer";
import {Rational} from "../number/rational";
import {Complex} from "../number/complex";
import {Division} from "./division";
import {Addition} from "./addition";
import {Multiplication} from "./multiplication";
import {Operation} from "./operation";
import {Real} from "../number/real";
import {Negation} from "./negation";
import {Expression} from "../expression";

export class Inversion extends Operation {

    constructor(value: Expression) {
        super(value);
    }

    evaluate(): Number {
        let a = this.operands[0];

        if (a instanceof Operation) a = a.evaluate();

        if (a instanceof Integer) a = Rational.from(a);
        if (a instanceof Rational) {
            return Rational.from(
                a.denominator,
                a.numerator,
            ).simplify();
        }

        if (a instanceof Complex) {
            return Division.divide(
                Complex.from(a.real, Negation.negate(a.imaginary)),
                Addition.add(
                    Multiplication.multiply(a.real, a.real),
                    Multiplication.multiply(a.imaginary, a.imaginary),
                ),
            ).simplify();
        }
    }

    to_string(): string {
        return `${this.operands[0].to_string()}⁻¹`;
    }

    static invert(value: Integer|Rational): Integer|Rational;
    static invert(value: Real): Real;
    static invert(value: Number): Number;
    static invert(value: Number): Number {
        return new Inversion(value).evaluate();
    }
}
