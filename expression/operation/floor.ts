import {Number} from '../number/number';
import {Integer} from "../number/integer";
import {Rational} from "../number/rational";
import {Operation} from "./operation";
import {Expression} from "../expression";

export class Floor extends Operation {

    constructor(value: Expression) {
        super(value);
    }

    evaluate(): Integer {
        let a = this.operands[0];

        if (a instanceof Operation) a = a.evaluate();

        if (a instanceof Integer) return a;

        if (a instanceof Rational) {
            return Integer.from(a.numerator.value / a.denominator.value);
        }

        return undefined;
    }

    to_string(): string {
        return `⌊${this.operands[0].to_string()}⌋`;
    }

    static floor(a: Number): Integer {
        return new Floor(a).evaluate();
    }
}
