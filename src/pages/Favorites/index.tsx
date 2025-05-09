import { useContext } from "react"
import { PokemonContext } from "../../context/PokemonContext"
import { GridPokemon } from "../../components/GridPokemon";
import * as S from './styles'
import { ThemeContext } from "../../context/ThemeContext";
import { Header } from "../../components/Header";
import { CircularProgress } from "@mui/material";

export function Favorites() {
  const {
    favoritePokemons,
    pokemonDetails,
    isLoading
  } = useContext(PokemonContext)

  const { theme } = useContext(ThemeContext)

  return (
    <S.Container $themeMode={theme}>
      <Header />
      <div>
        <h1>Lista de pokemons favoritos</h1>
        <a href="/">Voltar</a>
      </div>
      {favoritePokemons.length > 0 ? (
        isLoading ? (
          <CircularProgress
            sx={{
              display: 'flex',
              margin: '5rem auto',
            }}
          />
        ) : (
          <GridPokemon
            filteredPokemons={[]}
            pokemonInfos={[]}
            pokemonDetails={pokemonDetails}
            favoritePokemons={favoritePokemons}
            isFavoritesPage={true}
          />
        )
      ) : <h3>Você ainda não adicionou nenhum pokemon aos favoritos.</h3>}
    </S.Container>
  )
}