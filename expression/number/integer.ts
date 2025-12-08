import {Number} from "./number";
import {Real} from "./real";
import {Parenthesizer} from "../../parenthesizer";

export class Integer extends Real {
    static ZERO = new Integer(0n);
    static ONE = new Integer(1n);
    static NEGATIVE_ONE = new Integer(-1n);

    value: bigint;

    constructor(value: number | bigint) {
        super();

        this.value = BigInt(value);
    }

    static from(value: number | bigint | Integer): Integer {
        if (value instanceof Integer) {
            return value;
        } else {
            return new Integer(value);
        }
    }

    is(value: Number) {
        const a = this.simplify();
        const b = value.simplify();
        return b instanceof Integer
            && b.value === a.value;
    }

    is_zero(): boolean {
        return this.is(Integer.ZERO);
    }

    is_negative(): boolean {
        return this.value < 0n;
    }

    negate(): Integer {
        return Integer.from(-this.value);
    }

    simplify(): Integer {
        return this;
    }

    to_string(
        _?: Parenthesizer,
        unit: string = '',
    ): string {
        if (unit && !this.is_zero()) {
            if (this.is(Integer.ONE)) {
                return unit;
            }
            if (this.is(Integer.NEGATIVE_ONE)) {
                return `-${unit}`;
            }
        }

        return `${this.value}${unit}`;
    }
}
