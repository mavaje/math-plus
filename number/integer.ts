import {Number} from "./number";

export class Integer extends Number {
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

    to_string(): string {
        return this.value.toString();
    }
}
