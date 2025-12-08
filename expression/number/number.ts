import {Parenthesizer} from "../../parenthesizer";
import {Expression} from "../expression";

export abstract class Number extends Expression {

    evaluate(): Number {
        return this;
    }

    log() {
        console.log(this.to_string());
    }

    toString(): string {
        return this.to_string();
    }

    abstract is(value: Number): boolean;

    abstract is_zero(): boolean;

    abstract negate(): Number;

    abstract simplify(): Number;

    abstract to_string(parenthesizer?: Parenthesizer, unit?: string): string;
}
