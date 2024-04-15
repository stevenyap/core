import { JSONValue } from "decoders"

/** An opaque type is a type where consumers cannot create or edit it
 * thereby guaranteeing the integrity of the value
 * Use it after validation, sanitisation or to hide inner value
 **/
export type Opaque<T, K = T> = {
  [K in symbol]: T
} & {
  readonly unwrap: () => K
  readonly toJSON: () => JSONValue
}

export type Create<T> = {
  key: symbol
  value: T
  unwrap: () => T
  toJSON: () => JSONValue
}
export function createOpaque<T>(params: Create<T>): Opaque<T> {
  const { key, value, unwrap, toJSON } = params
  return {
    [key]: value,
    unwrap,
    toJSON,
  }
}

// Equality Functions
export function eq<T>(a: Opaque<T>, b: Opaque<T>): boolean {
  return a.unwrap() === b.unwrap()
}

export function gt<T>(a: Opaque<T>, b: Opaque<T>): boolean {
  return a.unwrap() > b.unwrap()
}

export function gte<T>(a: Opaque<T>, b: Opaque<T>): boolean {
  return a.unwrap() >= b.unwrap()
}

export function lt<T>(a: Opaque<T>, b: Opaque<T>): boolean {
  return a.unwrap() < b.unwrap()
}

export function lte<T>(a: Opaque<T>, b: Opaque<T>): boolean {
  return a.unwrap() <= b.unwrap()
}

// Array Functions
export function find<T>(s: T, xs: Array<Opaque<T>>): Opaque<T> | null {
  const [first, ...rest] = xs
  if (first == null) {
    return null
  }

  return first.unwrap() === s ? first : find(s, rest)
}
