import * as JD from "decoders"
import { Either, fromRight, left, mapEither, right } from "./Either"
import { Maybe, throwIfNothing } from "./Maybe"
import { Opaque } from "./Opaque"

const key: unique symbol = Symbol()
export type PositiveInt = Opaque<number, typeof key>

export function createPositiveInt(n: number): Maybe<PositiveInt> {
  return fromRight(createPositiveIntE(n))
}

export function createPositiveIntE(
  n: number,
): Either<ErrorPositiveInt, PositiveInt> {
  const validated = cleanPositiveInt(n)
  return mapEither(validated, (int) => ({
    [key]: int,
    unwrap: () => int,
    toJSON: () => int,
  }))
}

export type ErrorPositiveInt = "NOT_AN_INT" | "NOT_A_POSITIVE_INT"
export function cleanPositiveInt(n: number): Either<ErrorPositiveInt, number> {
  return Number.isInteger(n) === false
    ? left("NOT_AN_INT")
    : n <= 0
      ? left("NOT_A_POSITIVE_INT")
      : right(n)
}

export const positiveIntDecoder: JD.Decoder<PositiveInt> = JD.number.transform(
  (n) => {
    return throwIfNothing(createPositiveInt(n), `Invalid positive int: ${n}`)
  },
)

const positiveInt_ = {
  20: dangerPositiveInt(20),
}

export function positiveInt(int: keyof typeof positiveInt_): PositiveInt {
  return positiveInt_[int]
}

function dangerPositiveInt(int: number): PositiveInt {
  return {
    [key]: int,
    unwrap: () => int,
    toJSON: () => int,
  }
}
