import * as JD from "decoders"
import { Email, emailDecoder } from "../data/user/Email"
import { PositiveInt, positiveIntDecoder } from "../data/PositiveInt"
import { Text100, text100Decoder } from "../data/Text/Text100"

// Sample file to represent a core type in App context
export type User = {
  id: PositiveInt
  name: Text100
  email: Email
}

// TODO How to parseDontValidate this easily with the errors?

export const userDecoder: JD.Decoder<User> = JD.object({
  id: positiveIntDecoder,
  name: text100Decoder,
  email: emailDecoder,
})
