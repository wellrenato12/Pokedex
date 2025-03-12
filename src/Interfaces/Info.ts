import { Sprites } from "./Sprites"

export interface Info {
  id: number
  base_experience: number
  name: string
  sprites: Sprites
  types: {
    [key: number]: {
      type: {
        name: string
      }
    }
  }
}