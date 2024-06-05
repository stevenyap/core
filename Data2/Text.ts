import * as JD from "decoders"
import { Opaque } from "./Opaque"
import { Either, left, right, fromRight, mapEither } from "./Either"
import { Maybe, throwIfNothing } from "./Maybe"

const key: unique symbol = Symbol()
const textLength = 65536
export type Text = Opaque<string, typeof key>

export function createText100(value: string): Maybe<Text> {
  return fromRight(createText100E(value))
}

export function createText100E(value: string): Either<Error, Text> {
  const validated = cleanText100(value)
  return mapEither(validated, (text) => ({
    [key]: text,
    unwrap: () => text,
    toJSON: () => text,
  }))
}

export type Error = "TEXT_TOO_LONG"
function cleanText100(value: string): Either<Error, string> {
  return value.length <= textLength ? right(value) : left("TEXT_TOO_LONG")
}

export const textDecoder: JD.Decoder<Text> = JD.string.transform((s) => {
  return throwIfNothing(
    createText100(s),
    `Text length must be less than ${textLength}`,
  )
})
