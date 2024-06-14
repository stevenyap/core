import * as JD from "decoders"
import { Either, fromRight, left, mapEither, right } from "./Either"
import { Maybe, throwIfNothing } from "./Maybe"
import { Opaque, jsonValueCreate } from "./Opaque"
import { v6, validate, version } from "uuid"

// TODO:
// Remove this declaration after https://www.npmjs.com/package/@types/uuid release
declare module "uuid" {
  export const v6: typeof v1
}

const uuidVersion = 6
const key: unique symbol = Symbol()
/** UUID is UUID version 4 - it is not orderable!
 * THIS SHOULD NOT BE USED FOR PRODUCTION!!! */
export type UUID = Opaque<string, typeof key>
export type ErrorUUID = "INVALID_UUID"

export function createUUID(): UUID {
  return jsonValueCreate<string, typeof key>(key)(v6())
}

export const uuidDecoder: JD.Decoder<UUID> = JD.string.transform((s) => {
  return throwIfNothing(_create(s), `Invalid UUID v${uuidVersion}: ${s}`)
})

function _create(s: string): Maybe<UUID> {
  return fromRight(mapEither(_validate(s), jsonValueCreate(key)))
}

function _validate(s: string): Either<ErrorUUID, string> {
  return validate(s) === true && version(s) === uuidVersion
    ? right(s)
    : left("INVALID_UUID")
}
