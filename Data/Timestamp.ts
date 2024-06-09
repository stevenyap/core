import * as JD from "decoders"
import { Opaque, jsonValueCreate } from "./Opaque"
import { Either, fromRight, left, mapEither, right } from "./Either"
import { Maybe, throwIfNothing } from "./Maybe"

const key: unique symbol = Symbol()
/** Timestamp is epoch second */
export type Timestamp = Opaque<number, typeof key>
export type ErrorTimestamp = "NOT_AN_INT" | "NOT_A_TIMESTAMP"

export function createNow(): Timestamp {
  return jsonValueCreate<number, typeof key>(key)(Date.now())
}

export function createTimestamp(value: number): Maybe<Timestamp> {
  return fromRight(createTimestampE(value))
}

export function createTimestampE(n: number): Either<ErrorTimestamp, Timestamp> {
  return mapEither(_validate(n), jsonValueCreate(key))
}

export const timestampDecoder: JD.Decoder<Timestamp> = JD.number.transform(
  (n) => {
    return throwIfNothing(createTimestamp(n), `Invalid timestamp: ${n}`)
  },
)

function _validate(n: number): Either<ErrorTimestamp, number> {
  return Number.isInteger(n) === false
    ? left("NOT_AN_INT")
    : n <= 0
      ? left("NOT_A_TIMESTAMP")
      : right(n)
}
