import { Abilities } from "./Abilities"
import { Info } from "./Info"
import { Stats } from "./Stats"

export interface Details extends Info {
  abilities: Abilities[]
  stats: Stats[]
  height: number
}