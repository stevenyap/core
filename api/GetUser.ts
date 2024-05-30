import * as JD from "decoders"
import { User, userDecoder } from "../app/User"
import {
  noBodyParamsDecoder,
  authResponseDecoder,
  AuthGetApi,
} from "../data/Api"
import { numberFromStringDecoder } from "../data/Decoder"
import { PositiveInt, positiveIntDecoder } from "../data/PositiveInt"

export type GetUser = AuthGetApi<
  "/users/:userID",
  UrlParams,
  ErrorCode,
  Payload
>

export type UrlParams = {
  userID: PositiveInt
}

export type Payload = User

export type ErrorCode = "USER_NOT_FOUND"

export const contract: GetUser = {
  method: "GET",
  route: "/users/:userID",
  urlDecoder: JD.object({
    userID: numberFromStringDecoder.transform(positiveIntDecoder.verify),
  }),
  bodyDecoder: noBodyParamsDecoder,
  responseDecoder: authResponseDecoder(
    JD.oneOf(["USER_NOT_FOUND"]),
    userDecoder,
  ),
}
