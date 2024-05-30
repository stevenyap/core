import * as JD from "decoders"

export const numberFromStringDecoder: JD.Decoder<number> = JD.string
  .transform(Number)
  .transform(JD.number.verify)

export const stringNumberDecoder: JD.Decoder<number> = JD.either(
  JD.number,
  numberFromStringDecoder,
)
