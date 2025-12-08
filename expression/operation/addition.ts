import {Number} from '../number/number';
import {Integer} from "../number/integer";
import {Rational} from "../number/rational";
import {Multiplication} from "./multiplication";
import {Complex} from "../number/complex";
import {Real} from "../number/real";
import {Operation} from "./operation";
import {Parenthesizer, Precedence} from "../../parenthesizer";
import {Expression} from "../expression";

export class Addition extends Operation {
    static IDENTITY = Integer.ZERO;

    constructor(...addends: Expression[]) {
        super(...addends);
    }

    evaluate(log = Operation.LOGGING_DEFAULT): Number {
        let sum: Number = Addition.IDENTITY;

        for (const addend of this.operands) {
            let a = sum;
            let b = addend;

            if (b instanceof Operation) b = b.evaluate();

            if (a instanceof Integer && b instanceof Integer) {
                sum = Integer.from(a.value + b.value);
                continue;
            }

            if (a instanceof Integer) a = Rational.from(a);
            if (b instanceof Integer) b = Rational.from(b);
            if (a instanceof Rational && b instanceof Rational) {
                sum = Rational.from(
                    Addition.add(
                        Multiplication.multiply(a.numerator, b.denominator),
                        Multiplication.multiply(b.numerator, a.denominator),
                    ),
                    Multiplication.multiply(a.denominator, b.denominator),
                ).simplify();
                continue;
            }

            if (a instanceof Real) a = Complex.from(a);
            if (b instanceof Real) b = Complex.from(b);
            if (a instanceof Complex && b instanceof Complex) {
                sum = Complex.from(
                    Addition.add(a.real, b.real),
                    Addition.add(a.imaginary, b.imaginary),
                ).simplify();
            }
        }

        if (log) console.log(`${this.to_string()} = ${sum.to_string()}`);

        return sum;
    }

    to_string(parenthesizer: Parenthesizer = new Parenthesizer()): string {
        return parenthesizer.wrap(
            Precedence.ADDITION,
            p => this.operands
                .map(o => o.to_string(p))
                .join(' + '),
        );
    }

    static add(...addends: Integer[]): Integer;
    static add(...addends: Real[]): Real;
    static add(...addends: Number[]): Number;
    static add(...addends: Number[]): Number {
        return new Addition(...addends).evaluate();
    }
}
