import * as JD from "decoders"
import { Either, fromRight, left, mapEither, right } from "./Either"
import { Maybe, throwIfNothing } from "./Maybe"
import { Opaque } from "./Opaque"

const key: unique symbol = Symbol()
export type NoneNegativeInt = Opaque<number, typeof key>

export function createNoneNegativeInt(n: number): Maybe<NoneNegativeInt> {
  return fromRight(createNoneNegativeIntE(n))
}

export function createNoneNegativeIntE(
  n: number,
): Either<ErrorNoneNegativeInt, NoneNegativeInt> {
  const validated = cleanNoneNegativeInt(n)
  return mapEither(validated, (int) => ({
    [key]: int,
    unwrap: () => int,
    toJSON: () => int,
  }))
}

export type ErrorNoneNegativeInt = "NOT_AN_INT" | "NOT_A_NONE_NEGATIVE_INT"
export function cleanNoneNegativeInt(
  n: number,
): Either<ErrorNoneNegativeInt, number> {
  return Number.isInteger(n) === false
    ? left("NOT_AN_INT")
    : n < 0
      ? left("NOT_A_NONE_NEGATIVE_INT")
      : right(n)
}

export const noneNegativeIntDecoder: JD.Decoder<NoneNegativeInt> =
  JD.number.transform((n) => {
    return throwIfNothing(
      createNoneNegativeInt(n),
      `Invalid none negative int: ${n}`,
    )
  })
