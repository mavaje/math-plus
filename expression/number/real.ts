import {Number} from "./number";

export abstract class Real extends Number {
    absolute(): Real {
        return this.is_negative()
            ? this.negate()
            : this;
    }

    is_positive(): boolean {
        return !this.is_zero() && !this.is_negative();
    }

    abstract is_negative(): boolean;

    abstract negate(): Real;

    abstract simplify(): Real;
}
