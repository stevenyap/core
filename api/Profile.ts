import * as JD from "decoders"
import { User, userDecoder } from "../app/User"
import {
  NoUrlParams,
  authResponseDecoder,
  AuthGetApi,
  noUrlParamsDecoder,
} from "../data/Api"

export type Contract = AuthGetApi<"/profile", NoUrlParams, ErrorCode, Payload>

export type Payload = User

export type ErrorCode = null

export const contract: Contract = {
  method: "GET",
  route: "/profile",
  urlDecoder: noUrlParamsDecoder,
  responseDecoder: authResponseDecoder(JD.null_, userDecoder),
}
