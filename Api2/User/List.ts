import * as JD from "decoders"
import { User, userDecoder } from "../../app/User"
import { authResponseDecoder, AuthGetApi } from "../../data/Api"
import { numberFromStringDecoder } from "../../data/Decoder"
import { PositiveInt, positiveIntDecoder } from "../../data/PositiveInt"

export type Contract = AuthGetApi<
  "/users/?limit=:limit&lastID=:lastID",
  UrlParams,
  ErrorCode,
  Payload
>

export type UrlParams = {
  lastID: PositiveInt | null
  limit: PositiveInt
}

export type Payload = Array<User>

export type ErrorCode = null

export const contract: Contract = {
  method: "GET",
  route: "/users/?limit=:limit&lastID=:lastID",
  urlDecoder: JD.object({
    lastID: JD.string.transform((v) =>
      v === ""
        ? null
        : numberFromStringDecoder
            .transform(positiveIntDecoder.verify)
            .verify(v),
    ),
    limit: numberFromStringDecoder.transform(positiveIntDecoder.verify),
  }),
  responseDecoder: authResponseDecoder(JD.null_, JD.array(userDecoder)),
}
