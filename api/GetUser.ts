import * as JD from "decoders"
import { User, userDecoder } from "../app/User"
import {
  noBodyParamsDecoder,
  authResponseDecoder,
  AuthGetApi,
} from "../data/Api"

export type GetUser = AuthGetApi<
  "/users/{userID=:number}",
  UrlParams,
  ErrorCode,
  Payload
>

export type UrlParams = {
  userID: number
}

export type Payload = User

export type ErrorCode = "USER_NOT_FOUND"

export const contract: GetUser = {
  method: "GET",
  route: "/users/{userID=:number}",
  urlDecoder: JD.object({
    userID: JD.number,
  }),
  bodyDecoder: noBodyParamsDecoder,
  responseDecoder: authResponseDecoder(
    JD.oneOf(["USER_NOT_FOUND"]),
    userDecoder,
  ),
}
