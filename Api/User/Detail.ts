import * as JD from "decoders"
import { User, UserID, userDecoder, userIDDecoder } from "../../App/User"
import { authResponseDecoder, AuthGetApi } from "../../Data/Api"

export type Contract = AuthGetApi<
  "/users/:userID",
  UrlParams,
  ErrorCode,
  Payload
>

export type UrlParams = {
  userID: UserID
}

export type Payload = User

export type ErrorCode = "USER_NOT_FOUND"

export const contract: Contract = {
  method: "GET",
  route: "/users/:userID",
  urlDecoder: JD.object({ userID: userIDDecoder }),
  responseDecoder: authResponseDecoder(
    JD.oneOf(["USER_NOT_FOUND"]),
    userDecoder,
  ),
}
