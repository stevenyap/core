import * as JD from "decoders"
import { Opaque } from "../Opaque"
import { Either, left, right, fromRight, mapEither } from "../Either"
import { Maybe, throwIfNothing } from "../Maybe"

const key: unique symbol = Symbol()
export type Password = Opaque<string, typeof key>

export function createPassword(value: string): Maybe<Password> {
  return fromRight(createPasswordE(value))
}

export function createPasswordE(value: string): Either<Error, Password> {
  const validated = cleanPassword(value)
  return mapEither(validated, (password) => ({
    [key]: password,
    unwrap: function () {
      return this[key]
    },
    toJSON: function () {
      return this[key]
    },
  }))
}

export type Error = "INVALID_PASSWORD"
export function cleanPassword(value: string): Either<Error, string> {
  const v = value.toLowerCase()
  return v.length >= 6 ? right(v) : left("INVALID_PASSWORD")
}

export const passwordDecoder: JD.Decoder<Password> = JD.string.transform(
  (s) => {
    return throwIfNothing(createPassword(s), `Invalid password: ${s}`)
  },
)
