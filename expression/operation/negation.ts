import {Number} from '../number/number';
import {Integer} from "../number/integer";
import {Rational} from "../number/rational";
import {Operation} from "./operation";
import {Real} from "../number/real";
import {Complex} from "../number/complex";
import {Expression} from "../expression";

export class Negation extends Operation {

    constructor(value: Expression) {
        super(value);
    }

    evaluate(): Number {
        let a = this.operands[0];

        if (a instanceof Operation) a = a.evaluate();

        if (a instanceof Number) return a.negate();

        return undefined;
    }

    to_string(): string {
        return `-${this.operands[0].to_string()}`;
    }

    static negate(value: Integer): Integer;
    static negate(value: Rational): Rational;
    static negate(value: Real): Real;
    static negate(value: Complex): Complex;
    static negate(value: Number): Number;
    static negate(value: Number): Number {
        return new Negation(value).evaluate();
    }
}
