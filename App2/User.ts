import * as JD from "decoders"
import { Email, emailDecoder } from "../data/user/Email"
import { PositiveInt, positiveIntDecoder } from "../data/PositiveInt"
import { Text100, text100Decoder } from "../data/Text/Text100"

export type User = {
  id: PositiveInt
  name: Text100
  email: Email
}

export const userDecoder: JD.Decoder<User> = JD.object({
  id: positiveIntDecoder,
  name: text100Decoder,
  email: emailDecoder,
})
