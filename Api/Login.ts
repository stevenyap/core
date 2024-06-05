import * as JD from "decoders"
import { User, userDecoder } from "../App/User"
import {
  NoUrlParams,
  noUrlParamsDecoder,
  PostApi,
  responseDecoder,
} from "../Data/Api"
import { Password, passwordDecoder } from "../Data/User/Password"
import { Email, emailDecoder } from "../Data/User/Email"

export type Contract = PostApi<
  "/login",
  NoUrlParams,
  BodyParams,
  ErrorCode,
  Payload
>

export type BodyParams = {
  email: Email
  password: Password
}

export type Payload = { user: User; token: string }

export type ErrorCode = "USER_NOT_FOUND" | "INVALID_PASSWORD"

export const contract: Contract = {
  method: "POST",
  route: "/login",
  urlDecoder: noUrlParamsDecoder,
  bodyDecoder: JD.object({
    email: emailDecoder,
    password: passwordDecoder,
  }),
  responseDecoder: responseDecoder(
    JD.oneOf(["USER_NOT_FOUND", "INVALID_PASSWORD"]),
    JD.object({ user: userDecoder, token: JD.string }),
  ),
}
