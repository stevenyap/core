import * as JD from "decoders"

// Author of Decoders deliberately hide the Annotation type but we need it
// so this is a hack to coaxe out the type
export type Annotation = Parameters<typeof JD.formatInline>[0]

export const numberFromStringDecoder: JD.Decoder<number> = JD.string
  .transform(Number)
  .transform(JD.number.verify)

export const stringNumberDecoder: JD.Decoder<number> = JD.either(
  JD.number,
  numberFromStringDecoder,
)
