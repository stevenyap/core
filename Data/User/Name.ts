import * as JD from "decoders"
import { Opaque, jsonValueCreate } from "../Opaque"
import { Either, left, right, fromRight } from "../Either"
import { Maybe, throwIfNothing } from "../Maybe"
import { createText100 } from "../Text"

const key: unique symbol = Symbol()
export type Name = Opaque<string, typeof key>
export type ErrorName = "INVALID_NAME"

export function createName(s: string): Maybe<Name> {
  return fromRight(createNameE(s))
}

export function createNameE(s: string): Either<ErrorName, Name> {
  const text100 = createText100(s)
  if (text100 == null) return left("INVALID_NAME")

  return right(jsonValueCreate<string, typeof key>(key)(text100.unwrap()))
}

export const nameDecoder: JD.Decoder<Name> = JD.string.transform((s) => {
  return throwIfNothing(createName(s), `Invalid name: ${s}`)
})
