import * as JD from "decoders"
import { User, userDecoder } from "../../App/User"
import { authResponseDecoder, AuthGetApi } from "../../Data/Api"
import { numberFromStringDecoder } from "../../Data/Decoder"
import { PositiveInt, positiveIntDecoder } from "../../Data/Number/PositiveInt"
import { Nat, natDecoder } from "../../Data/Number/Nat"

export type Contract = AuthGetApi<
  "/users?limit=:limit&offset=:offset",
  UrlParams,
  ErrorCode,
  Payload
>

export type UrlParams = {
  limit: PositiveInt
  offset: Nat
}

export type Payload = Array<User>

export type ErrorCode = null

export const contract: Contract = {
  method: "GET",
  route: "/users?limit=:limit&offset=:offset",
  urlDecoder: JD.object({
    limit: numberFromStringDecoder.transform(positiveIntDecoder.verify),
    offset: numberFromStringDecoder.transform(natDecoder.verify),
  }),
  responseDecoder: authResponseDecoder(JD.null_, JD.array(userDecoder)),
}
