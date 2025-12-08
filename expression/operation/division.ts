import {Multiplication} from "./multiplication";
import {Inversion} from "./inversion";
import {Integer} from "../number/integer";
import {Number} from "../number/number";
import {Rational} from "../number/rational";
import {Real} from "../number/real";
import {Expression} from "../expression";

export class Division extends Multiplication {
    constructor(dividend: Expression, divisor: Expression) {
        super(dividend, new Inversion(divisor));
    }

    to_string(): string {
        return `${this.operands[0].to_string()} / ${this.operands[1].to_string()}`;
    }

    static divide(dividend: Integer|Rational, divisor: Integer|Rational): Integer|Rational;
    static divide(dividend: Real, divisor: Real): Real;
    static divide(dividend: Number, divisor: Number): Number;
    static divide(dividend: Number, divisor: Number): Number {
        return new Division(dividend, divisor).evaluate();
    }
}
