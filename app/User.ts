import * as JD from "decoders"

// Sample file to represent a core type in App context
export type User = {
  id: number
  name: string
  email: string
}

export const userDecoder: JD.Decoder<User> = JD.object({
  id: JD.number,
  name: JD.string,
  email: JD.string,
})
