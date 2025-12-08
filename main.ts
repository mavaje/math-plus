import {Addition} from "./expression/operation/addition";
import {Integer} from "./expression/number/integer";
import {Rational} from "./expression/number/rational";
import {Number} from "./expression/number/number";
import {Multiplication} from "./expression/operation/multiplication";
import {Division} from "./expression/operation/division";
import {Inversion} from "./expression/operation/inversion";
import {Floor} from "./expression/operation/floor";
import {Modulus} from "./expression/operation/modulus";
import {Complex} from "./expression/number/complex";
import {Negation} from "./expression/operation/negation";
import {Operation} from "./expression/operation/operation";

Operation.LOGGING_DEFAULT = true;

const expression = new Multiplication(
    new Integer(2),
    new Addition(
        new Multiplication(
            new Integer(3),
            new Addition(
                new Integer(3),
                new Integer(17),
            ),
            new Integer(5),
        ),
        new Integer(4),
    ),
);

console.log(expression.to_string());
console.log(expression.evaluate());

// const values: Number[] = [
//     Integer.from(0),
//     Integer.from(1),
//     Integer.from(2),
//     Rational.from(1, 2),
//     Rational.from(1, 3),
//     Rational.from(3, 2),
//     Complex.I,
//     Complex.from(0, -1),
//     Complex.from(1, 1),
// ];
//
// Object.entries({
//     'inverse': Inversion,
//     'floor': Floor,
// }).forEach(([symbol, operation]) => {
//     values.forEach(a => {
//         const equation = `${symbol}(${a})`;
//         try {
//             const result = new operation(a).evaluate();
//             console.log(`${equation} = ${result}`);
//         } catch {
//             console.error(`${equation} = ERROR`);
//         }
//     });
// });
//
// Object.entries({
//     '+': Addition,
//     '*': Multiplication,
//     '/': Division,
//     '%': Modulus,
// }).forEach(([symbol, operation]) => {
//     values.forEach(a => {
//         values.forEach(b => {
//             const equation = `${a} ${symbol} ${b}`;
//             // try {
//                 const result = new operation(a, b).evaluate();
//                 console.log(`${equation} = ${result}`);
//             // } catch {
//             //     console.error(`${equation} = ERROR`);
//             // }
//         });
//     });
// });
