
export enum Precedence {
    EXPONENTIATION = 0,
    MULTIPLICATION = 1,
    ADDITION = 2,
}

export class Parenthesizer {

    constructor(public precedence?: Precedence) {}

    wrap(precedence: Precedence, express: (p: Parenthesizer) => string): string {
        const parenthesize = precedence > this.precedence;
        this.precedence = precedence;
        const expression = express(this);
        return parenthesize ?
            `(${expression})`
            : expression;
    }
}
