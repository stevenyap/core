import * as JD from "decoders"
import type { DecodeResult } from "decoders"
import { Maybe, just, nothing } from "./Maybe"

export type Either<E, T> = Left<E> | Right<T>
export type Left<E> = { readonly _t: "Left"; readonly error: E }
export type Right<T> = { readonly _t: "Right"; readonly value: T }

/** Returns a Right value */
export function right<T>(value: T): Right<T> {
  return { _t: "Right", value }
}

/** Returns a Left value */
export function left<E>(error: E): Left<E> {
  return { _t: "Left", error }
}

export function mapEither<E, A, B>(
  either: Either<E, A>,
  fn: (a: A) => B,
): Either<E, B> {
  if (either._t === "Left") {
    return either
  } else {
    return right(fn(either.value))
  }
}

/** Groups a Either[] into lefts and rights */
export function partition<E, T>(
  results: Array<Either<E, T>>,
): { lefts: E[]; rights: T[] } {
  return results.reduce(
    (accum: { lefts: E[]; rights: T[] }, value) => {
      const { lefts, rights } = accum
      if (value._t === "Left") {
        return { lefts: [...lefts, value.error], rights }
      } else {
        return { lefts, rights: [...rights, value.value] }
      }
    },
    { lefts: [], rights: [] },
  )
}

export function fromRight<E, T>(result: Either<E, T>): Maybe<T> {
  return result._t === "Right" ? just(result.value) : nothing()
}

export function fromLeft<E, T>(result: Either<E, T>): Maybe<E> {
  return result._t === "Left" ? just(result.error) : nothing()
}

/** Annotation type is not exported from decoders package
 * hence, we have to do a sleight of hand to trick it out
 */
export function fromDecodeResult<T>(
  result: DecodeResult<T>,
): Either<Exclude<typeof result.error, undefined>, T> {
  return result.ok ? right(result.value) : left(result.error)
}

/** Type inference for a JD.object({ t: JD.Decoder<T> }) is always { t: T | undefined }
 * hence, we have to do a roundabout way to decode an Either type
 * Ref: https://github.com/nvie/decoders/issues/930
 */
export function leftDecoder<E>(
  errorDecoder: JD.Decoder<E>,
): JD.Decoder<Left<E>> {
  return JD.define((blob, ok, err) => {
    const result = JD.object({
      _t: JD.constant("Left"),
      error: JD.unknown,
    }).decode(blob)
    if (result.ok === false) {
      return err(result.error)
    }

    const errorM = errorDecoder.decode(result.value.error)
    if (errorM.ok === false) {
      return err(errorM.error)
    }

    return ok({ _t: "Left", error: errorM.value })
  })
}

/** Type inference for a JD.object({ t: JD.Decoder<T> }) is always { t: T | undefined }
 * hence, we have to do a roundabout way to decode an Either type
 * Ref: https://github.com/nvie/decoders/issues/930
 */
export function rightDecoder<T>(
  valueDecoder: JD.Decoder<T>,
): JD.Decoder<Right<T>> {
  return JD.define((blob, ok, err) => {
    const result = JD.object({
      _t: JD.constant("Right"),
      value: JD.unknown,
    }).decode(blob)
    if (result.ok === false) {
      return err(result.error)
    }

    const valueM = valueDecoder.decode(result.value.value)
    if (valueM.ok === false) {
      return err(valueM.error)
    }

    return ok({ _t: "Right", value: valueM.value })
  })
}

export function eitherDecoder<E, T>(
  errorDecoder: JD.Decoder<E>,
  valueDecoder: JD.Decoder<T>,
): JD.Decoder<Either<E, T>> {
  return JD.select(JD.object({ _t: JD.oneOf(["Left", "Right"]) }), ({ _t }) => {
    switch (_t) {
      case "Left":
        return leftDecoder(errorDecoder)
      case "Right":
        return rightDecoder(valueDecoder)
    }
  })
}
