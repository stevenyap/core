const _t = Symbol()
export type Email = { [_t]: string }

export function create(s: string): Email | null {
  // TODO Add email validation here
  return { [_t]: s }
}

export function unwrap(e: Email): string {
  return e[_t]
}
