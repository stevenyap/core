import * as JD from "decoders"
import { User, userDecoder } from "../app/User"
import {
  AuthPostApi,
  authResponseDecoder,
  NoUrlParams,
  noUrlParamsDecoder,
} from "../data/Api"
import { Text100, text100Decoder } from "../data/Text/Text100"
import { Email, emailDecoder } from "../data/user/Email"

export type PostUser = AuthPostApi<
  "/users",
  NoUrlParams,
  BodyParams,
  ErrorCode,
  Payload
>

export type BodyParams = {
  name: Text100
  email: Email
}

export type Payload = User

export type ErrorCode = "UNKNOWN_DB_ERROR"

export const contract: PostUser = {
  method: "POST",
  route: "/users",
  urlDecoder: noUrlParamsDecoder,
  bodyDecoder: JD.object({
    name: text100Decoder,
    email: emailDecoder,
  }),
  responseDecoder: authResponseDecoder(
    JD.oneOf(["UNKNOWN_DB_ERROR"]),
    userDecoder,
  ),
}
