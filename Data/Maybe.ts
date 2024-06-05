import * as JD from "decoders"

/** This is just a sugar syntax for T | null
 * but the decoder is better
 * */
export type Maybe<T> = T | Nothing
export type Just<T> = T
export type Nothing = null

export function just<T>(value: T): Just<T> {
  return value
}

export function nothing(): Nothing {
  return null
}

export function maybe<T>(value: T | null | undefined): Maybe<T> {
  return value == null ? nothing() : just(value)
}

export function fromMaybe<T>(m: Maybe<T>): T | null {
  return m == null ? null : m
}

export function throwIfNothing<T>(m: Maybe<T>, errorMsg: string): T {
  if (m == null) {
    throw new Error(errorMsg)
  }

  return m
}

export function maybeDecoder<T>(
  valueDecoder: JD.Decoder<T>,
): JD.Decoder<Maybe<T>> {
  return JD.nullable(valueDecoder)
}
