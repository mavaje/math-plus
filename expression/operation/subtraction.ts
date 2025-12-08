import {Integer} from "../number/integer";
import {Number} from "../number/number";
import {Addition} from "./addition";
import {Real} from "../number/real";
import {Negation} from "./negation";
import {Expression} from "../expression";

export class Subtraction extends Addition {
    constructor(minuend: Expression, subtrahend: Expression) {
        super(minuend, new Negation(subtrahend));
    }

    to_string(): string {
        return `${this.operands[0].to_string()} - ${this.operands[1].to_string()}`;
    }

    static subtract(minuend: Integer, subtrahend: Integer): Integer;
    static subtract(minuend: Real, subtrahend: Real): Real;
    static subtract(minuend: Number, subtrahend: Number): Number;
    static subtract(minuend: Number, subtrahend: Number): Number {
        return new Subtraction(minuend, subtrahend).evaluate();
    }
}
