
export type Integer = {
    type: 'integer';
    value: bigint;
};

export type Rational = {
    type: 'rational';
    numerator: Integer;
    denominator: Integer;
};

export type Number =
    Integer |
    Rational;

export type NumberType = Number['type'];

export function integer(value: number | bigint): Integer {
    if (typeof value !== 'bigint') value = BigInt(value);
    return {value};
}

export function rational(
    numerator: number | bigint,
    denominator: number | bigint,
): Rational {
    if (typeof numerator !== 'bigint') numerator = BigInt(numerator);
    if (typeof denominator !== 'bigint') denominator = BigInt(denominator);

    let gcd = numerator < 0n ? -numerator : numerator;
    let remainder = denominator;

    while (remainder > 0n) {
        [gcd, remainder] = [remainder, gcd % remainder];
    }

    numerator /= gcd;
    denominator /= gcd;

    return {
        numerator: integer(numerator),
        denominator: integer(denominator),
    };
}
