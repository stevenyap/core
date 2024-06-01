import * as JD from "decoders"
import { User, userDecoder } from "../app/User"
import { NoUrlParams, authResponseDecoder, AuthGetApi } from "../data/Api"

export type Profile = AuthGetApi<"/profile", NoUrlParams, ErrorCode, Payload>

export type Payload = User

export type ErrorCode = null

export const contract: Profile = {
  method: "GET",
  route: "/profile",
  urlDecoder: JD.always({}),
  bodyDecoder: JD.never("_"),
  responseDecoder: authResponseDecoder(JD.null_, userDecoder),
}
