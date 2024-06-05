import * as JD from "decoders"
import { Opaque } from "../Opaque"
import { Either, left, right, fromRight, mapEither } from "../Either"
import { Maybe, throwIfNothing } from "../Maybe"

const key: unique symbol = Symbol()
const textLength = 100
export type Text100 = Opaque<string, typeof key>

export function createText100(value: string): Maybe<Text100> {
  return fromRight(createText100E(value))
}

export function createText100E(value: string): Either<Error, Text100> {
  const validated = cleanText100(value)
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
function cleanText100(value: string): Either<Error, string> {
  return value.length <= textLength ? right(value) : left("TEXT_TOO_LONG")
}

export const text100Decoder: JD.Decoder<Text100> = JD.string.transform((s) => {
  return throwIfNothing(
    createText100(s),
    `Text length must be less than ${textLength}`,
  )
})
