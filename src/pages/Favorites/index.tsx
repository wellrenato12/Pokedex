import { useContext } from "react"
import { PokemonContext } from "../../context/PokemonContext"
import { GridPokemon } from "../../components/GridPokemon";
import * as S from './styles'

export function Favorites() {
  const {
    favoritePokemons,
    pokemonDetails,
  } = useContext(PokemonContext)

  return (
    <S.Container>
      <div>
        <h1>Lista de pokemons favoritos</h1>
        <a href="/">Voltar</a>
      </div>
      {favoritePokemons.length > 0 ? (
        <GridPokemon
          filteredPokemons={[]}
          pokemonInfos={[]}
          pokemonDetails={pokemonDetails}
          favoritePokemons={favoritePokemons}
          isFavoritesPage={true}
        />
      ) : <h3>Você ainda não adicionou nenhum pokemon aos favoritos.</h3>}
    </S.Container>
  )
}