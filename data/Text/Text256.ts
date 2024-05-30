import * as JD from "decoders"
import { Opaque } from "../Opaque"
import { Either, left, right, fromRight, mapEither } from "../Either"
import { Maybe, throwIfNothing } from "../Maybe"

const key: unique symbol = Symbol()
const textLength = 256
export type Text256 = Opaque<string, typeof key>

export function createText256(value: string): Maybe<Text256> {
  return fromRight(createText256E(value))
}

export function createText256E(value: string): Either<Error, Text256> {
  const validated = cleanText256(value)
  return mapEither(validated, (text) => ({
    [key]: text,
    unwrap: function () {
      return this[key]
    },
    toJSON: function () {
      return this[key]
    },
  }))
}

export type Error = "TEXT_TOO_LONG"
function cleanText256(value: string): Either<Error, string> {
  return value.length <= textLength ? right(value) : left("TEXT_TOO_LONG")
}

export const text256Decoder: JD.Decoder<Text256> = JD.string.transform((s) => {
  return throwIfNothing(
    createText256(s),
    `Text length must be less than ${textLength}`,
  )
})
