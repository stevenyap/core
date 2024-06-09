import * as JD from "decoders"
import { Either, fromRight, left, mapEither, right } from "../Either"
import { Maybe, throwIfNothing } from "../Maybe"
import { Opaque, jsonValueCreate } from "../Opaque"

const key: unique symbol = Symbol()
/** Nat include 0 */
export type Nat = Opaque<number, typeof key>
export type ErrorNat = "NOT_AN_INT" | "NOT_A_NAT"

export const Nat0: Nat = jsonValueCreate<number, typeof key>(key)(0)

export function createNat(n: number): Maybe<Nat> {
  return fromRight(createNatE(n))
}

export function createNatE(n: number): Either<ErrorNat, Nat> {
  return mapEither(_validate(n), jsonValueCreate(key))
}

export const natDecoder: JD.Decoder<Nat> = JD.number.transform((n) => {
  return throwIfNothing(createNat(n), `Invalid nat: ${n}`)
})

function _validate(n: number): Either<ErrorNat, number> {
  return Number.isInteger(n) === false
    ? left("NOT_AN_INT")
    : n < 0
      ? left("NOT_A_NAT")
      : right(n)
}
