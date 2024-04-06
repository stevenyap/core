import * as JD from "decoders"
import { Tokens } from "./UrlToken"

export type PublicContract<
  M extends Method,
  R extends string,
  U extends UrlRecord<R>,
  B,
  E,
  T,
> = {
  method: M
  route: R
  urlDecoder: JD.Decoder<U>
  bodyDecoder: JD.Decoder<B>
  responseDecoder: (status: number) => JD.Decoder<ResponseJson<E, T>>
}

// Auth APIs requires a request header "authorization: Bearer <JWT-Token>"
export type AuthContract<
  M extends Method,
  R extends string,
  U extends UrlRecord<R>,
  B,
  E,
  T,
> = {
  method: M
  route: R
  urlDecoder: JD.Decoder<U>
  bodyDecoder: JD.Decoder<B>
  responseDecoder: (status: number) => JD.Decoder<AuthResponseJson<E, T>>
}

// Admin APIs requires a request header "authorization: Bearer <JWT-Token>"
export type AdminContract<
  M extends Method,
  R extends string,
  U extends UrlRecord<R>,
  B,
  E,
  T,
> = {
  method: M
  route: R
  urlDecoder: JD.Decoder<U>
  bodyDecoder: JD.Decoder<B>
  responseDecoder: (status: number) => JD.Decoder<AuthResponseJson<E, T>>
}

// Auth Stream APIs requires a request header "authorization: Bearer <JWT-Token>"
export type AuthStreamContract<
  M extends "POST" | "PUT",
  R extends string,
  U extends UrlRecord<R>,
  E,
  T,
> = {
  method: M
  route: R
  urlDecoder: JD.Decoder<U>
  responseDecoder: (status: number) => JD.Decoder<AuthResponseJson<E, T>>
}

// Admin Stream APIs requires a request header "authorization: Bearer <JWT-Token>"
export type AdminStreamContract<
  M extends "POST" | "PUT",
  R extends string,
  U extends UrlRecord<R>,
  E,
  T,
> = {
  method: M
  route: R
  urlDecoder: JD.Decoder<U>
  responseDecoder: (status: number) => JD.Decoder<AdminResponseJson<E, T>>
}

export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
export type UrlRecord<R extends string> = Record<Tokens<R>, string | number>

export type Ok200<D> = { _t: "Ok"; data: D }
export type Err400<E> = { _t: "Err"; code: E }
export type InternalErr500 = { _t: "ServerError"; errorID: string }
export type ResponseJson<E, D> = Ok200<D> | Err400<E> | InternalErr500

export type AuthErr400<E> = {
  _t: "Err"
  code: E | "UNAUTHORISED" | "UNAUTHORISED_LOCATION"
}
export type AuthResponseJson<E, D> = Ok200<D> | AuthErr400<E> | InternalErr500

export type AdminErr400<E> = { _t: "Err"; code: E | "UNAUTHORISED" }
export type AdminResponseJson<E, D> = Ok200<D> | AdminErr400<E> | InternalErr500

export function responseDecoder<E, T>(
  errorDecoder: JD.Decoder<E>,
  dataDecoder: JD.Decoder<T>,
) {
  return function (status: number): JD.Decoder<ResponseJson<E, T>> {
    switch (status) {
      case 200:
        return ok200Decoder(dataDecoder)
      case 400:
        return err400Decoder(errorDecoder)
      case 500:
        return internalErr500Decoder()
      default:
        throw new Error("Invalid status number: `${status}`")
    }
  }
}

export function authResponseDecoder<E, T>(
  errorDecoder: JD.Decoder<E>,
  dataDecoder: JD.Decoder<T>,
) {
  return function (status: number): JD.Decoder<AuthResponseJson<E, T>> {
    switch (status) {
      case 200:
        return ok200Decoder(dataDecoder)
      case 400:
        return authErr400Decoder(errorDecoder)
      case 500:
        return internalErr500Decoder()
      default:
        throw new Error("Invalid status number: `${status}`")
    }
  }
}

export function adminResponseDecoder<E, T>(
  errorDecoder: JD.Decoder<E>,
  dataDecoder: JD.Decoder<T>,
) {
  return function (status: number): JD.Decoder<AdminResponseJson<E, T>> {
    switch (status) {
      case 200:
        return ok200Decoder(dataDecoder)
      case 400:
        return adminErr400Decoder(errorDecoder)
      case 500:
        return internalErr500Decoder()
      default:
        throw new Error("Invalid status number: `${status}`")
    }
  }
}

export function ok200Decoder<D>(
  dataDecoder: JD.Decoder<D>,
): JD.Decoder<Ok200<D>> {
  return JD.object({
    _t: JD.constant("Ok"),
    data: JD.unknown, // Issue here https://github.com/nvie/decoders/issues/930
  }).transform(({ _t, data }) => ({ _t, data: dataDecoder.verify(data) }))
}

export function err400Decoder<E>(
  errorDecoder: JD.Decoder<E>,
): JD.Decoder<Err400<E>> {
  return JD.object({
    _t: JD.constant("Err"),
    code: JD.unknown, // Issue here https://github.com/nvie/decoders/issues/930
  }).transform(({ _t, code }) => ({ _t, code: errorDecoder.verify(code) }))
}

export function authErr400Decoder<E>(
  errorDecoder: JD.Decoder<E>,
): JD.Decoder<AuthErr400<E>> {
  return JD.object({
    _t: JD.constant("Err"),
    code: JD.unknown, // Issue here https://github.com/nvie/decoders/issues/930
  }).transform(({ _t, code }) => ({
    _t,
    code: JD.either(
      JD.constant("UNAUTHORISED"),
      JD.constant("UNAUTHORISED_LOCATION"),
      errorDecoder,
    ).verify(code),
  }))
}

export function adminErr400Decoder<E>(
  errorDecoder: JD.Decoder<E>,
): JD.Decoder<AdminErr400<E>> {
  return JD.object({
    _t: JD.constant("Err"),
    code: JD.unknown, // Issue here https://github.com/nvie/decoders/issues/930
  }).transform(({ _t, code }) => ({
    _t,
    code: JD.either(JD.constant("UNAUTHORISED"), errorDecoder).verify(code),
  }))
}

export function internalErr500Decoder(): JD.Decoder<InternalErr500> {
  return JD.object({
    _t: JD.constant("ServerError"),
    errorID: JD.string,
  })
}

// Convenience

export type NoUrlParams = Record<string, never>
export type NoBodyParams = Record<string, never>

export const noUrlParamsDecoder = JD.object({})
export const noBodyParamsDecoder = JD.object({})
