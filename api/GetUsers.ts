import * as JD from "decoders"
import { User, userDecoder } from "../app/User"
import {
  noBodyParamsDecoder,
  authResponseDecoder,
  AuthGetApi,
} from "../data/Api"
import { numberFromStringDecoder } from "../data/Decoder"
import { PositiveInt, positiveIntDecoder } from "../data/PositiveInt"
import {
  NoneNegativeInt,
  noneNegativeIntDecoder,
} from "../data/NoneNegativeInt"

export type GetUsers = AuthGetApi<
  "/users/?limit=:limit&lastID=:lastID",
  UrlParams,
  ErrorCode,
  Payload
>

export type UrlParams = {
  lastID: NoneNegativeInt
  limit: PositiveInt
}

export type Payload = Array<User>

export type ErrorCode = null

export const contract: GetUsers = {
  method: "GET",
  route: "/users/?limit=:limit&lastID=:lastID",
  urlDecoder: JD.object({
    lastID: numberFromStringDecoder.transform(noneNegativeIntDecoder.verify),
    limit: numberFromStringDecoder.transform(positiveIntDecoder.verify),
  }),
  bodyDecoder: noBodyParamsDecoder,
  responseDecoder: authResponseDecoder(JD.null_, JD.array(userDecoder)),
}
