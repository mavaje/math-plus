import {Integer} from "./integer";
import {Real} from "./real";
import {Number} from "./number";
import {Parenthesizer, Precedence} from "../../parenthesizer";

export class Rational extends Real {
    static PRECEDENCE = Precedence.MULTIPLICATION;

    numerator: Integer;
    denominator: Integer;

    constructor(
        numerator: number | bigint | Integer,
        denominator: number | bigint | Integer = Integer.ONE,
    ) {
        super();

        this.numerator = Integer.from(numerator);
        this.denominator = Integer.from(denominator);
    }

    static from(
        numerator: number | bigint | Integer,
        denominator?: number | bigint | Integer,
    ): Rational;
    static from(value: Rational): Rational;
    static from(
        numerator: number | bigint | Integer | Rational,
        denominator?: number | bigint | Integer,
    ): Rational {
        if (numerator instanceof Rational) {
            return numerator;
        } else {
            return new Rational(numerator, denominator);
        }
    }

    is(value: Number) {
        const a = this.simplify();
        const b = value.simplify();

        if (a instanceof Integer) {
            return a.is(b);
        }

        return b instanceof Rational
            && a.numerator.is(b.numerator)
            && a.denominator.is(b.denominator);
    }

    is_zero(): boolean {
        return this.numerator.is_zero() && !this.denominator.is_zero();
    }

    is_negative(): boolean {
        return this.numerator.is_negative() && this.denominator.is_positive()
            || this.numerator.is_positive() && this.denominator.is_negative();
    }

    negate(): Rational {
        return Rational.from(
            this.numerator.negate(),
            this.denominator,
        );
    }

    simplify(): Integer | Rational {
        const numerator = this.numerator.absolute().simplify() as Integer;
        const denominator = this.denominator.absolute().simplify() as Integer;

        if (denominator.is_zero()) return undefined;

        let gcd = numerator.value;
        let remainder = denominator.value;

        while (remainder > 0n) {
            [gcd, remainder] = [remainder, gcd % remainder];
        }

        if (denominator.is(Integer.ONE)) {
            return numerator;
        }

        return Rational.from(
            Integer.from((this.is_negative() ? -numerator.value : numerator.value) / gcd),
            Integer.from(denominator.value / gcd),
        );
    }

    to_string(
        parenthesizer: Parenthesizer = new Parenthesizer(),
        unit?: string,
    ): string {
        return parenthesizer.wrap(Rational.PRECEDENCE, p => `${
            this.numerator.to_string(p, unit)
        }/${
            this.denominator.to_string(p)
        }`);
    }
}
