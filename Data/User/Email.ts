import * as JD from "decoders"
import { Opaque } from "../Opaque"
import { Either, left, right, fromRight, mapEither } from "../Either"
import { Maybe, throwIfNothing } from "../Maybe"

const key: unique symbol = Symbol()
export type Email = Opaque<string, typeof key>

export function createEmail(value: string): Maybe<Email> {
  return fromRight(createEmailE(value))
}

export function createEmailE(value: string): Either<Error, Email> {
  const validated = cleanEmail(value)
  return mapEither(validated, (email) => ({
    [key]: email,
    unwrap: function () {
      return this[key]
    },
    toJSON: function () {
      return this[key]
    },
  }))
}

export type Error = "INVALID_EMAIL"
export function cleanEmail(value: string): Either<Error, string> {
  // The almost perfect email regex, taken from https://emailregex.com/
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const v = value.trim().toLowerCase()
  // Max email length is 320 as per RFC 5321 and RFC 5322
  return v.length <= 320 && emailRegex.test(value)
    ? right(v)
    : left("INVALID_EMAIL")
}

export const emailDecoder: JD.Decoder<Email> = JD.string.transform((s) => {
  return throwIfNothing(createEmail(s), `Invalid email: ${s}`)
})
