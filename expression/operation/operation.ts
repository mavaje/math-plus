import {Number} from "../number/number";
import {Expression} from "../expression";

export abstract class Operation extends Expression {
    static LOGGING_DEFAULT = false;

    public operands: Expression[];

    protected constructor(...operands: Expression[]) {
        super();
        this.operands = operands;
    }

    abstract evaluate(log?: boolean): Number;
}
