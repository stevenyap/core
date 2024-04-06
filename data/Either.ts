import * as JD from "decoders"
import type { DecodeResult } from "decoders"
import type { Annotation } from "decoders/annotate"

export type Either<E, T> = Left<E> | Right<T>
export type Left<E> = { _t: "Left"; error: E }
export type Right<T> = { _t: "Right"; value: T }

/** Returns a Right value */
export function right<E, T>(value: T): Either<E, T> {
  return { _t: "Right", value }
}

/** Returns a Left value */
export function left<E, T>(error: E): Either<E, T> {
  return { _t: "Left", error }
}

/** Groups a Either[] into lefts and rights */
export function partition<E, T>(
  results: Array<Either<E, T>>,
): { lefts: E[]; rights: T[] } {
  return results.reduce(
    (accum: { lefts: E[]; rights: T[] }, value) => {
      const { lefts, rights } = accum
      if (isLeft(value)) {
        return { lefts: [...lefts, value.error], rights }
      } else {
        return { lefts, rights: [...rights, value.value] }
      }
    },
    { lefts: [], rights: [] },
  )
}

/** WARN: Coercion! Check if an Either is a Right */
export function isRight<E, T>(result: Either<E, T>): result is Right<T> {
  return result._t == "Right"
}

/** WARN: Coercion! Check if an Either is a Left */
export function isLeft<E, T>(result: Either<E, T>): result is Left<E> {
  return result._t == "Left"
}

export function fromRight<E, T>(result: Either<E, T>): T | null {
  return isRight(result) ? result.value : null
}

export function fromLeft<E, T>(result: Either<E, T>): E | null {
  return isLeft(result) ? result.error : null
}

export function fromDecodeResult<T>(
  result: DecodeResult<T>,
): Either<Annotation, T> {
  return result.ok ? right(result.value) : left(result.error)
}

export function eitherDecoder<E, T>(
  leftDecoder: JD.Decoder<E>,
  rightDecoder: JD.Decoder<T>,
): JD.Decoder<Either<E, T>> {
  return JD.define((blob, ok, err) => {
    const result = rightDecoder.decode(blob)
    if (result.ok === true) {
      return ok(right(result.value))
    } else {
      const errorResult = leftDecoder.decode(blob)
      if (errorResult.ok === true) {
        return ok(left(errorResult.value))
      } else {
        return err("Invalid Either type")
      }
    }
  })
}
