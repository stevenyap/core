import * as JD from "decoders"
import { Email, emailDecoder } from "../Data/User/Email"
import { UUID, createUUID, uuidDecoder } from "../Data/UUID"
import { Opaque, jsonValueCreate } from "../Data/Opaque"
import { Name, nameDecoder } from "../Data/User/Name"

export type User = {
  id: UserID
  name: Name
  email: Email
}

// Opaque type

const userIDKey: unique symbol = Symbol()
export type UserID = Opaque<string, typeof userIDKey>
export type ErrorUserID = "INVALID_USER_ID"

export function createUserID(): UserID {
  return _create(createUUID())
}

export const userIDDecoder: JD.Decoder<UserID> = uuidDecoder
  .describe("INVALID_USER_ID")
  .transform(_create)

// Purposely receive UUID to express UserID is UUID
function _create(uuid: UUID): UserID {
  return jsonValueCreate<string, typeof userIDKey>(userIDKey)(uuid.unwrap())
}

export const userDecoder: JD.Decoder<User> = JD.object({
  id: userIDDecoder,
  name: nameDecoder,
  email: emailDecoder,
})
