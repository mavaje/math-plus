import {integer, Number, rational} from '../number';

export class Addition {
    apply(a: Number, b: Number) {
        switch (a.type) {
            case 'integer':
                switch (b.type) {
                    case 'integer':
                        return integer(a.value + b.value);

                    case 'rational':
                        return rational(
                            this.apply(a.value * b.denominator, b.numerator),
                            b.denominator,
                        );

                    default:
                        throw new Error(`Unhandled type: ${b.type}`);
                }

            case 'rational':
                switch (b.type) {
                    case 'integer':
                        return rational(
                            this.apply(a.numerator, b.value * a.denominator),
                            a.denominator,
                        );

                    case 'rational':
                        return rational(
                            this.apply(a.numerator * b.denominator, a.denominator * b.numerator),
                            a.denominator * b.denominator,
                        );

                    default:
                        throw new Error(`Unhandled type: ${b.type}`);
                }

            default:
                throw new Error(`Unhandled type: ${a.type}`);
        }
    }
}
