import {Number} from '../number/number';
import {Integer} from "../number/integer";
import {Rational} from "../number/rational";
import {Multiplication} from "./multiplication";
import { Reciprocal } from './reciprocal';

export class Division {
    static apply(a: Integer|Rational, b: Integer|Rational): Integer|Rational;
    static apply(a: Number, b: Number): Number;
    static apply(a: Number, b: Number): Number {
        return Multiplication.apply(
            a,
            Reciprocal.apply(b),
        );
    }
}
