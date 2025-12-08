import {Number} from '../number/number';
import {Integer} from "../number/integer";
import {Rational} from "../number/rational";
import {Real} from "../number/real";
import {Complex} from "../number/complex";
import {Addition} from "./addition";
import {Operation} from "./operation";
import {Negation} from "./negation";
import {Parenthesizer, Precedence} from "../../parenthesizer";
import {Expression} from "../expression";

export class Multiplication extends Operation {
    static IDENTITY = Integer.ONE;

    constructor(...factors: Expression[]) {
        super(...factors);
    }

    evaluate(log = Operation.LOGGING_DEFAULT): Number {
        let product: Number = Multiplication.IDENTITY;

        for (const factor of this.operands) {
            let a = product;
            let b = factor;

            if (b instanceof Operation) b = b.evaluate(log);

            if (a instanceof Integer && b instanceof Integer) {
                product = Integer.from(a.value * b.value);
                continue;
            }

            if (a instanceof Integer) a = Rational.from(a);
            if (b instanceof Integer) b = Rational.from(b);
            if (a instanceof Rational && b instanceof Rational) {
                product = Rational.from(
                    Multiplication.multiply(a.numerator, b.numerator),
                    Multiplication.multiply(a.denominator, b.denominator),
                ).simplify();
                continue;
            }

            if (a instanceof Real) a = Complex.from(a);
            if (b instanceof Real) b = Complex.from(b);
            if (a instanceof Complex && b instanceof Complex) {
                product = Complex.from(
                    Addition.add(
                        Multiplication.multiply(a.real, b.real),
                        Negation.negate(Multiplication.multiply(a.imaginary, b.imaginary)),
                    ),
                    Addition.add(
                        Multiplication.multiply(a.real, b.imaginary),
                        Multiplication.multiply(a.imaginary, b.real),
                    ),
                ).simplify();
            }
        }

        if (log) console.log(`${this.to_string()} = ${product.to_string()}`);

        return product;
    }

    to_string(parenthesizer: Parenthesizer = new Parenthesizer()): string {
        return parenthesizer.wrap(
            Precedence.MULTIPLICATION,
            p => this.operands
                .map(o => o.to_string(p))
                .join(' × '),
        );
    }

    static multiply(...values: Integer[]): Integer;
    static multiply(...values: Real[]): Real;
    static multiply(...values: Number[]): Number;
    static multiply(...values: Number[]): Number {
        return new Multiplication(...values).evaluate();
    }
}
