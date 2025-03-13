import { Details } from '../../Interfaces/Details'
import { Info } from '../../Interfaces/Info'
import { defaultTheme } from '../../styles/themes/default'
import { CardPokemon } from '../CardPokemon'
import * as S from './styles'

interface GridPokemonProps {
  isFavoritesPage?: boolean;
  filteredPokemons: Info[];
  pokemonInfos: Info[];
  pokemonDetails: Details[];
  favoritePokemons: Info[];
}

export function GridPokemon({
  filteredPokemons,
  pokemonInfos,
  pokemonDetails,
  favoritePokemons,
  isFavoritesPage = false
}: GridPokemonProps) {
  const pokemonsToShow = isFavoritesPage
    ? favoritePokemons
    : filteredPokemons.length > 0
      ? filteredPokemons
      : pokemonInfos;

  return (
    <S.GridPokemons>
      {pokemonsToShow.map((pokemon) => {
        const typeName = pokemon.types[0].type.name as keyof typeof defaultTheme
        const pokemonDetail = pokemonDetails.find((pokemonDetail) => pokemonDetail.id === pokemon.id)

        if (!pokemonDetail) {
          return null
        }

        return (
          <CardPokemon
            pokemon={pokemon}
            typeName={typeName}
            key={pokemon.id}
            pokemonDetail={pokemonDetail}
          />
        )
      })}
    </S.GridPokemons>
  )
}