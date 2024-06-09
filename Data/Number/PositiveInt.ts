import * as JD from "decoders"
import { Either, fromRight, left, mapEither, right } from "../Either"
import { Maybe, throwIfNothing } from "../Maybe"
import { Opaque, jsonValueCreate } from "../Opaque"

const key: unique symbol = Symbol()
/** PositiveInt does not include 0 */
export type PositiveInt = Opaque<number, typeof key>
export type ErrorPositiveInt = "NOT_AN_INT" | "NOT_A_POSITIVE_INT"

export const PositiveInt20: PositiveInt = jsonValueCreate<number, typeof key>(
  key,
)(20)

export function createPositiveInt(n: number): Maybe<PositiveInt> {
  return fromRight(createPositiveIntE(n))
}

export function createPositiveIntE(
  n: number,
): Either<ErrorPositiveInt, PositiveInt> {
  return mapEither(_validate(n), jsonValueCreate(key))
}

export const positiveIntDecoder: JD.Decoder<PositiveInt> = JD.number.transform(
  (n) => {
    return throwIfNothing(createPositiveInt(n), `Invalid positive int: ${n}`)
  },
)

function _validate(n: number): Either<ErrorPositiveInt, number> {
  return Number.isInteger(n) === false
    ? left("NOT_AN_INT")
    : n <= 0
      ? left("NOT_A_POSITIVE_INT")
      : right(n)
}
