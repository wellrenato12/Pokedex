import { FormEvent, useContext, useEffect, useState } from "react"
import * as S from './styles'
import { api } from "../../lib/axios"
import { ButtonType } from "../../components/ButtonType"
import { defaultTheme } from "../../styles/themes/default"
import { ButtonMui } from "../../components/ButtonMui"
import { ChevronDown } from 'lucide-react';
import { Info } from "../../Interfaces/Info"
import { Types } from "../../Interfaces/Types"
import { PokemonContext } from "../../context/PokemonContext"
import { GridPokemon } from "../../components/GridPokemon"
import { ThemeContext } from "../../context/ThemeContext"
import { Header } from "../../components/Header"
import { showErrorToast } from "../../utils/toastAlert"
import { CircularProgress } from "@mui/material"

export function Home() {
  const [filteredPokemons, setFilteredPokemons] = useState<Info[]>([])
  const [types, setTypes] = useState<Types[]>([])
  const [name, setName] = useState("")
  const [valueButton, setValueButton] = useState('ID ASC')

  const {
    favoritePokemons,
    pokemonDetails,
    pokemonInfos,
    getPokemonDetails,
    toggleLoading,
    isLoading
  } = useContext(PokemonContext)

  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    getTypes()
  }, [])

  useEffect(() => {
    if (name === "") {
      getPokemonDetails()
    } else {
      filterPokemonsByName(name)
    }
  }, [name])

  useEffect(() => {
    localStorage.setItem("favoritePokemons", JSON.stringify(favoritePokemons));
  }, [favoritePokemons]);

  async function getTypes() {
    toggleLoading(false)
    try {
      const response = await api.get('/type')
      setTypes(response.data.results)
    } catch (error) {
      showErrorToast(`Falhar ao carregar os dados! ${error}`)
    } finally {
      toggleLoading(true)
    }
  }

  function handleSearchPokemon(event: FormEvent<HTMLInputElement>) {
    const searchValue = event.currentTarget.value
    setName(searchValue)

    if (searchValue === "") {
      setFilteredPokemons(pokemonInfos)
    } else {
      filterPokemonsByName(searchValue)
    }
  }

  function filterPokemonsByName(pokemonName: string) {
    const newListFilteredPokemons = pokemonInfos.filter((pokemon) => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()))

    setFilteredPokemons(newListFilteredPokemons)
  }

  function filterPokemonsByType(pokemonType: string) {
    const typePokemon = pokemonInfos.filter((pokemon) => pokemon.types[0].type.name === pokemonType)

    setFilteredPokemons(typePokemon)
  }

  function resetFilter() {
    setFilteredPokemons(pokemonInfos)

    setName('')
    setValueButton('ID ASC')
  }

  function valueButtonChange(value: string) {
    setValueButton(value)
  }

  function filterByOrder(order: string) {
    if (order === 'ASC') {
      const idAsc = [...pokemonInfos].sort((a, b) => a.id - b.id)
      setFilteredPokemons(idAsc)
    }

    if (order === 'DESC') {
      const idDesc = [...pokemonInfos].sort((a, b) => b.id - a.id)
      setFilteredPokemons(idDesc)
    }
  }

  function filterByName(order: string) {
    if (order === 'ASC') {
      const nameAsc = [...pokemonInfos].sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
        return 0
      })
      setFilteredPokemons(nameAsc)
    }
    if (order === 'DESC') {
      const nameDesc = [...pokemonInfos].sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
        return 0
      })
      setFilteredPokemons(nameDesc)
    }
  }

  function filterByExp(order: string) {
    if (order === 'ASC') {
      const expAsc = [...pokemonInfos].sort((a, b) => b.base_experience - a.base_experience)

      setFilteredPokemons(expAsc)
    }

    if (order === 'DESC') {
      const expDesc = [...pokemonInfos].sort((a, b) => a.base_experience - b.base_experience)

      setFilteredPokemons(expDesc)
    }
  }

  return (
    <S.Container>
      <Header />
      <S.SearchPokemon $themeMode={theme}>
        <input
          onChange={handleSearchPokemon}
          placeholder="Procurar Pokemon"
          type="text"
          value={name}
        />
        <p>Use esta entrada para procurar qualquer pokémon. Num instante.</p>
      </S.SearchPokemon>

      <S.Buttons>
        <S.ContainerButtonsType>
          <p>Filtre por tipo:</p>
          {isLoading ? (
            <CircularProgress
              sx={{
                display: 'flex',
                margin: 'auto',
              }}
            />
          ) : (
            types.map((type) => {
              const typeName = type.name as keyof typeof defaultTheme
              return (
                <ButtonType
                  key={type.name}
                  filterPokemonsByType={filterPokemonsByType}
                  $typePoke={typeName}
                  pokemonType={type.name}
                >
                  {type.name}
                </ButtonType>
              )
            })
          )}
        </S.ContainerButtonsType>
        <S.ContainerButtonReset $themeMode={theme}>
          <button onClick={resetFilter}>
            Limpar Filtro
          </button>
          <ButtonMui
            valueButton={valueButton}
            valueButtonChange={valueButtonChange}
            filterByName={filterByName}
            filterByOrder={filterByOrder}
            filterByExp={filterByExp}
          >
            {valueButton}
            <ChevronDown />
          </ButtonMui>
        </S.ContainerButtonReset>
      </S.Buttons>

      <S.FavoritesLink $themeMode={theme} href="/favoritos">
        Lista de favoritos
      </S.FavoritesLink>

      {isLoading ? (
        <CircularProgress
          sx={{
            display: 'flex',
            margin: '5rem auto',
          }}
        />
      ) : (
        <GridPokemon
          filteredPokemons={filteredPokemons}
          pokemonInfos={pokemonInfos}
          pokemonDetails={pokemonDetails}
          favoritePokemons={favoritePokemons}
          isFavoritesPage={false}
        />
      )}
    </S.Container>
  )
}