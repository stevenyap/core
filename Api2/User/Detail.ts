import * as JD from "decoders"
import { User, userDecoder } from "../../app/User"
import { authResponseDecoder, AuthGetApi } from "../../data/Api"
import { numberFromStringDecoder } from "../../data/Decoder"
import { PositiveInt, positiveIntDecoder } from "../../data/PositiveInt"

export type Contract = AuthGetApi<
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

export const contract: Contract = {
  method: "GET",
  route: "/users/:userID",
  urlDecoder: JD.object({
    userID: numberFromStringDecoder.transform(positiveIntDecoder.verify),
  }),
  responseDecoder: authResponseDecoder(
    JD.oneOf(["USER_NOT_FOUND"]),
    userDecoder,
  ),
}
