export abstract class Number {
    simplify(): Number {
        return this;
    }

    toString(): string {
        return this.to_string();
    }

    log() {
        console.log(this.to_string());
    }

    abstract to_string(): string;
}
