import { FormEvent, useEffect, useState } from "react"
import * as S from './styles'
import { api } from "../../lib/axios"
import { ButtonType } from "../../components/ButtonType"
import { defaultTheme } from "../../styles/themes/default"
import { ButtonMui } from "../../components/ButtonMui"
import { ChevronDown } from 'lucide-react';
import { CardPokemon } from "../../components/CardPokemon"
import { Details } from "../../Interfaces/Details"
import { Info } from "../../Interfaces/Info"
import { PokemonUrl } from "../../Interfaces/Pokemon"
import { Types } from "../../Interfaces/Types"

export function Home() {
  const [pokemons, setPokemons] = useState<PokemonUrl[]>([])
  const [pokemonInfos, setPokemonInfos] = useState<Info[]>([])
  const [filteredPokemons, setFilteredPokemons] = useState<Info[]>([])
  const [types, setTypes] = useState<Types[]>([])
  const [name, setName] = useState("")
  const [valueButton, setValueButton] = useState('ID ASC')
  const [pokemonDetails, setPokemonDetails] = useState<Details[]>([])

  useEffect(() => {
    getPokemons()
  }, [])

  useEffect(() => {
    if (pokemons.length > 0) {
      getPokemonDetails()
    }
  }, [pokemons])

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

  async function getPokemons() {
    const response = await api.get('/pokemon?limit=151&offset=0')
    setPokemons(response.data.results)
  }

  async function getPokemonDetails() {
    const detailsPromises = pokemons.map((pokemon) => (
      api.get(pokemon.url).then((response) => response.data)
    ))

    const details = await Promise.all(detailsPromises)
    setPokemonInfos(details)
    setPokemonDetails(details)
  }

  async function getTypes() {
    const response = await api.get('/type')
    setTypes(response.data.results)
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
      <S.ImagePoke src="https://assets.website-files.com/62c1627eee0defc3a1256898/62cf234679dbabe18fa50a1e_pokeapi_256%201.svg" alt="PokéAPI" />

      <S.SearchPokemon>
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
          {types.map((type) => {
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
          })}
        </S.ContainerButtonsType>
        <S.ContainerButtonReset>
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

      <S.GridPokemons>
        {(filteredPokemons.length > 0 ? filteredPokemons : pokemonInfos).map((pokemon) => {
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
    </S.Container>
  )
}