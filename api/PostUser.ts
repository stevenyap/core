import * as JD from "decoders"
import { User, userDecoder } from "../app/User"
import {
  AuthPostApi,
  authResponseDecoder,
  NoUrlParams,
  noUrlParamsDecoder,
} from "../data/Api"

export type PostUser = AuthPostApi<
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

export type Payload = User

export type ErrorCode = "EMPTY_NAME" | "EMPTY_EMAIL" | "UNKNOWN_DB_ERROR"

export const contract: PostUser = {
  method: "POST",
  route: "/users",
  urlDecoder: noUrlParamsDecoder,
  bodyDecoder: JD.object({
    name: JD.string,
    email: JD.string,
  }),
  responseDecoder: authResponseDecoder(
    JD.oneOf(["EMPTY_NAME", "EMPTY_EMAIL", "UNKNOWN_DB_ERROR"]),
    userDecoder,
  ),
}
