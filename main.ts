import {Addition} from "./operation/addition";
import {Integer} from "./number/integer";
import {Rational} from "./number/rational";
import {Number} from "./number/number";
import {Multiplication} from "./operation/multiplication";

const values: Number[] = [
    Integer.from(0),
    Integer.from(1),
    Integer.from(2),
    Rational.from(1, 2),
    Rational.from(1, 3),
    Rational.from(3, 2),
];

values.forEach(a => {
    values.forEach(b => {
        const result = Addition.apply(a, b);
        console.log(`${a} + ${b} = ${result}`);
    });
});

values.forEach(a => {
    values.forEach(b => {
        const result = Multiplication.apply(a, b);
        console.log(`${a} * ${b} = ${result}`);
    });
});
