// type Test =
//   UrlRecord<"/{a=:string}/x/y/{b=:number}/{c=:boolean}?x=:string&y=:number?&z=:boolean[]">
export type UrlRecord<T extends string> =
  T extends `${infer Url}?${infer Query}`
    ? MergeNever<UrlParams<Url>, QueryParams<Query>>
    : UrlParams<T>

// Does not allow nullable or array
// type U = UrlRecord<"/{a:string}/x/{b:number}/y/{c:boolean}">
// type U = UrlParams<"/{a=:string}/x/y/{b=:number}/{c=:boolean}">
export type UrlParams<T extends string> = T extends
  | `${infer _}/{${infer Token}}/${infer Rest}`
  | `{${infer Token}}/${infer Rest}`
  ? KeyValue<Token> & UrlParams<Rest>
  : T extends
      | `${infer _}/{${infer Token}}`
      | `${infer _}/{${infer Token}}/`
      | `{${infer Token}}/`
      | `{${infer Token}}`
  ? KeyValue<Token>
  : never

type KeyValue<T extends string> = T extends `${infer Key}=:${infer Value}`
  ? { [K in Key]: Primitive<Value> }
  : never

// Note that array in URL has different implementation in ExpressJS and Teki
// But we chose the one that is easiest to understand in a string
// And we have to code it to match ExpressJS and Teki later
// type Q = QueryParams<"x=:string&y=:number?&z=:boolean[]">
type QueryParams<T extends string> =
  T extends `${infer Key}=:${infer Value}&${infer Rest}`
    ? { [P in RemoveBracket<Key>]: PrimitiveExt<Value> } & QueryParams<Rest>
    : T extends `${infer Key}=:${infer Value}`
    ? { [P in RemoveBracket<Key>]: PrimitiveExt<Value> }
    : never

type RemoveBracket<T> = T extends `${infer Token}[]` ? Token : T

// Typescript doesn't simplify `{ x: string } & { y: number }` into { x: string; y: number }
// This type is created to do that
export type MergeObject<A> = {
  [K in keyof A]: A[K]
}

export type MergeNever<A, B> = [A] extends [never]
  ? [B] extends [never]
    ? never // Both A and B are never
    : B // Only A is never
  : B extends never
  ? A // Only B is never
  : A & B // Neither A nor B are never

type Primitive<T extends string> = T extends "string"
  ? string
  : T extends "number"
  ? number
  : T extends "boolean"
  ? boolean
  : never

type PrimitiveExt<T extends string> = T extends "string"
  ? string
  : T extends "number"
  ? number
  : T extends "boolean"
  ? boolean
  : T extends "string?"
  ? string | null
  : T extends "number?"
  ? number | null
  : T extends "boolean?"
  ? boolean | null
  : T extends "string[]"
  ? string[]
  : T extends "number[]"
  ? number[]
  : T extends "boolean[]"
  ? boolean[]
  : `Invalid PrimitiveExt: ${T}`
