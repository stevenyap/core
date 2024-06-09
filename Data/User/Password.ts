import * as JD from "decoders"
import { Opaque, jsonValueCreate } from "../Opaque"
import { Either, left, right, fromRight, mapEither } from "../Either"
import { Maybe, throwIfNothing } from "../Maybe"

const key: unique symbol = Symbol()
/** Note: Adjust the logic to fit your project requirements */
export type Password = Opaque<string, typeof key>
export type ErrorPassword = "INVALID_PASSWORD"

export function createPassword(s: string): Maybe<Password> {
  return fromRight(createPasswordE(s))
}

export function createPasswordE(s: string): Either<ErrorPassword, Password> {
  const validated = _validate(s)
  return mapEither(validated, jsonValueCreate(key))
}

export const passwordDecoder: JD.Decoder<Password> = JD.string.transform(
  (s) => {
    return throwIfNothing(createPassword(s), `Invalid password: ${s}`)
  },
)

function _validate(s: string): Either<ErrorPassword, string> {
  // Note: Adjust this to your project requirements
  const v = s.toLowerCase()
  return v.length >= 6 ? right(v) : left("INVALID_PASSWORD")
}
