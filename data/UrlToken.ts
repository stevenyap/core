// type T = Tokens<"/x/:x/y/:y?z=:z">
export type Tokens<T extends string> = UrlTokens<T> | QueryTokens<T>

// Adapted from https://www.uplift.ltd/posts/validating-routes-with-typescript/
// type T = UrlTokens<"/:a/x/:b/y/:c">
export type UrlTokens<T extends string> = T extends `${infer Url}?${infer _}`
  ? UrlTokens<Url>
  : T extends
      | `${infer _}/:${infer Token}/${infer Rest}`
      | `:${infer Token}/${infer Rest}`
  ? Token | UrlTokens<Rest>
  : T extends
      | `${infer _}/:${infer Token}`
      | `:${infer Token}/`
      | `:${infer Token}`
  ? Token
  : never

// type T = QueryTokens<"/?x=:x&y=:y&z=:z">
export type QueryTokens<T extends string> =
  T extends `${infer _}?${infer Query}`
    ? QueryTokens<Query>
    : T extends `${infer Token}=:${infer _}&${infer Rest}`
    ? Token | QueryTokens<Rest>
    : T extends `${infer Token}=:${infer _}`
    ? Token
    : never
