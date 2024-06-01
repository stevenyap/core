export type RemoteData<E, T> = NotAsked | Loading | Failure<E> | Success<T>

export type NotAsked = { _t: "NotAsked" }
export type Loading = { _t: "Loading" }
export type Failure<E> = { _t: "Failure"; error: E }
export type Success<T> = { _t: "Success"; data: T }

export type GetRemoteDataType<T> = T extends {
  _t: "Success"
  data: infer DataType
}
  ? DataType
  : never

export function notAsked<E, T>(): RemoteData<E, T> {
  return { _t: "NotAsked" }
}

export function loading<E, T>(): RemoteData<E, T> {
  return { _t: "Loading" }
}

export function failure<E, T>(error: E): RemoteData<E, T> {
  return { _t: "Failure", error }
}

export function success<E, T>(data: T): RemoteData<E, T> {
  return { _t: "Success", data }
}
