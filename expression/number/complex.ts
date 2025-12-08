import {Number} from "./number";
import {Integer} from "./integer";
import {Real} from "./real";
import {Parenthesizer, Precedence} from "../../parenthesizer";

export class Complex extends Number {
    static I = new Complex(0n, 1n);

    private static IMAGINARY_UNIT = 'i';

    real: Real;
    imaginary: Real;

    constructor(
        real: number | bigint | Real,
        imaginary: number | bigint | Real = Integer.ZERO,
    ) {
        super();

        this.real = real instanceof Real
            ? real
            : Integer.from(real);

        this.imaginary = imaginary instanceof Real
            ? imaginary
            : Integer.from(imaginary);
    }

    static from(
        real: number | bigint | Real,
        imaginary?: number | bigint | Real,
    ): Complex;
    static from(value: Complex): Complex;
    static from(
        real: number | bigint | Real | Complex,
        imaginary?: number | bigint | Real,
    ): Complex {
        if (real instanceof Complex) {
            return real;
        } else {
            return new Complex(real, imaginary);
        }
    }

    is(value: Number) {
        const a = this.simplify();
        const b = value.simplify();

        if (a instanceof Real) {
            return a.is(b);
        }

        return b instanceof Complex
            && a.real.is(b.real)
            && a.imaginary.is(b.imaginary);
    }

    is_zero(): boolean {
        return this.real.is_zero() && this.imaginary.is_zero();
    }

    negate(): Complex {
        return Complex.from(
            this.real.negate(),
            this.imaginary.negate(),
        );
    }

    simplify(): Real | Complex {
        const real = this.real.simplify();
        const imaginary = this.imaginary.simplify();

        if (imaginary.is_zero()) {
            return real;
        }

        return Complex.from(real, imaginary);
    }

    to_string(
        parenthesizer: Parenthesizer = new Parenthesizer(),
        unit: string = '',
    ): string {
        const imaginary_unit = `${Complex.IMAGINARY_UNIT}${unit}`;

        if (this.real.is_zero() && !this.imaginary.is_zero()) {
            return this.imaginary.to_string(parenthesizer, imaginary_unit);
        } else if (this.imaginary.is_zero()) {
            return this.real.to_string(parenthesizer, unit);
        } else {
            return parenthesizer.wrap(
                Precedence.ADDITION,
                p => `${
                    this.real.to_string(p, unit)
                } + ${
                    this.imaginary.to_string(p, imaginary_unit)
                }`,
            );
        }
    }
}
