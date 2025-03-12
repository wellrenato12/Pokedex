import { ComponentProps, ReactNode } from "react"
import { ButtonContainer } from "./styles"
import { defaultTheme } from "../../styles/themes/default"

export interface ButtonTypeProps extends ComponentProps<'button'> {
  $typePoke: keyof typeof defaultTheme
  children: ReactNode
  filterPokemonsByType?: (pokemonType: string) => void
  pokemonType?: string
}

export function ButtonType({ $typePoke, children, filterPokemonsByType, pokemonType, ...props }: ButtonTypeProps) {
  function handleClick() {
    if (filterPokemonsByType && pokemonType) {
      filterPokemonsByType(pokemonType)
    }
  }

  return (
    <ButtonContainer onClick={handleClick} $typePoke={$typePoke} {...props}>
      {children}
    </ButtonContainer>
  )
}