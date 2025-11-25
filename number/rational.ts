import {Number} from "./number";
import {Integer} from "./integer";

export class Rational extends Number {
    numerator: Integer;
    denominator: Integer;

    constructor(
        numerator: number | bigint | Integer,
        denominator: number | bigint | Integer,
    ) {
        super();

        numerator = Integer.from(numerator);
        denominator = Integer.from(denominator);

        let gcd = numerator.value;
        let remainder = denominator.value;

        while (remainder > 0n) {
            [gcd, remainder] = [remainder, gcd % remainder];
        }

        this.numerator = Integer.from(numerator.value / gcd);
        this.denominator = Integer.from(denominator.value / gcd);
    }

    static from(
        numerator: number | bigint | Integer,
        denominator?: number | bigint | Integer,
    ): Rational;
    static from(value: Rational): Rational;
    static from(
        numerator: number | bigint | Integer | Rational,
        denominator: number | bigint | Integer = Integer.ONE,
    ): Rational {
        if (numerator instanceof Rational) {
            return numerator;
        } else {
            return new Rational(numerator, denominator);
        }
    }

    simplify(): Integer|Rational {
        if (this.denominator.value === 1n) {
            return this.numerator;
        }

        return this;
    }

    to_string(): string {
        return `${
            this.numerator.to_string()
        }/${
            this.denominator.to_string()
        }`;
    }
}
