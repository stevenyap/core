import * as JD from "decoders"
import { Opaque, createOpaque } from "./Opaque"
import { Either, fromRight, mapEither } from "./Either"
import { Maybe, throwIfNothing } from "./Maybe"
import { ErrorPositiveInt, cleanPositiveInt } from "./PositiveInt"

const key: unique symbol = Symbol()
export type Timestamp = Opaque<number>

export function createTimestamp(value: number): Maybe<Timestamp> {
  return fromRight(createTimestampE(value))
}

export function createTimestampE(
  value: number,
): Either<ErrorPositiveInt, Timestamp> {
  const validated = cleanPositiveInt(value)
  return mapEither(validated, (int) =>
    createOpaque({
      key,
      value: int,
      unwrap: () => int,
      toJSON: () => int,
    }),
  )
}

export const timestampDecoder: JD.Decoder<Timestamp> = JD.number.transform(
  (n) => {
    return throwIfNothing(createTimestamp(n), `Invalid timestamp: ${n}`)
  },
)
