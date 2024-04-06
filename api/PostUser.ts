import * as JD from "decoders"
import { User, userDecoder } from "../app/User"
import {
  authResponseDecoder,
  AuthContract,
  NoUrlParams,
  noUrlParamsDecoder,
} from "../data/Api"

// /contract/api/PostUser.ts
export type PostUser = AuthContract<
  "POST",
  "/users",
  NoUrlParams,
  BodyParams,
  ErrorCode,
  Payload
>

export type BodyParams = {
  name: string
  email: string
}
const paramsDecoder: JD.Decoder<BodyParams> = JD.object({
  name: JD.string,
  email: JD.string,
})

export type Payload = User
export const payloadDecoder: JD.Decoder<Payload> = userDecoder

export type ErrorCode = "EMPTY_NAME" | "EMPTY_EMAIL" | "UNKNOWN_DB_ERROR"
export const errorDecoder: JD.Decoder<ErrorCode> = JD.oneOf([
  "EMPTY_NAME",
  "EMPTY_EMAIL",
  "UNKNOWN_DB_ERROR",
])

export const contract: PostUser = {
  method: "POST",
  route: "/users",
  urlDecoder: noUrlParamsDecoder,
  bodyDecoder: paramsDecoder,
  responseDecoder: authResponseDecoder(errorDecoder, payloadDecoder),
}
