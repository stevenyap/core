import * as JD from "decoders"
import { User, userDecoder } from "../app/User"
import {
  NoBodyParams,
  noBodyParamsDecoder,
  authResponseDecoder,
  AuthContract,
} from "../data/Api"

export type GetUser = AuthContract<
  "GET",
  "/users/:userID",
  UrlParams,
  NoBodyParams,
  ErrorCode,
  Payload
>

export type UrlParams = {
  userID: number
}
const urlDecoder: JD.Decoder<UrlParams> = JD.object({
  userID: JD.number,
})

export type Payload = User
export const payloadDecoder: JD.Decoder<Payload> = userDecoder

export type ErrorCode = "USER_NOT_FOUND"
export const errorDecoder: JD.Decoder<ErrorCode> = JD.oneOf(["USER_NOT_FOUND"])

export const contract: GetUser = {
  method: "GET",
  route: "/users/:userID",
  urlDecoder,
  bodyDecoder: noBodyParamsDecoder,
  responseDecoder: authResponseDecoder(errorDecoder, payloadDecoder),
}
