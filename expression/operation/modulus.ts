import {Number} from '../number/number';
import {Integer} from "../number/integer";
import {Rational} from "../number/rational";
import {Multiplication} from "./multiplication";
import {Floor} from "./floor";
import {Division} from "./division";
import {Subtraction} from "./subtraction";
import {Operation} from "./operation";
import {Real} from "../number/real";
import {Expression} from "../expression";

export class Modulus extends Operation {

    constructor(dividend: Expression, divisor: Expression) {
        super(dividend, divisor);
    }

    evaluate(): Number {
        let [a, b] = this.operands;

        const a_value = a.evaluate();
        const b_value = b.evaluate();

        return Subtraction.subtract(
            a_value,
            Multiplication.multiply(
                Floor.floor(Division.divide(a_value, b_value)),
                b_value,
            )
        );
    }

    to_string(): string {
        return `${this.operands[0].to_string()} % ${this.operands[1].to_string()}`;
    }

    static modulo(a: Integer, b: Integer): Integer;
    static modulo(a: Integer|Rational, b: Integer|Rational): Integer|Rational;
    static modulo(a: Real, b: Real): Real;
    static modulo(a: Number, b: Number): Number;
    static modulo(a: Number, b: Number): Number {
        return Subtraction.subtract(
            a,
            Multiplication.multiply(
                Floor.floor(Division.divide(a, b)),
                b,
            )
        );
    }
}
