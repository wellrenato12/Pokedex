import { createContext, ReactNode, useEffect, useState } from "react"
import { Info } from "../Interfaces/Info"
import { Details } from "../Interfaces/Details"
import { api } from "../lib/axios"
import { PokemonUrl } from "../Interfaces/Pokemon"

interface PokemonContextProps {
  favoritePokemons: Info[]
  pokemonDetails: Details[]
  pokemonInfos: Info[]
  addPokemonToFavoritesList: (pokemon: Info) => void
  removePokemonFavoritesList: (id: number) => void
  addPokemonDetails: (pokemon: Details[]) => void
  addPokemonInfo: (pokemonInfos: Info[]) => void
  getPokemonDetails: () => void
  isPokemonFavorited: (id: number) => boolean
}

interface PokemonProviderProps {
  children: ReactNode
}

export const PokemonContext = createContext({} as PokemonContextProps)

export function PokemonProvider({ children }: PokemonProviderProps) {
  const [favoritePokemons, setFavoritePokemons] = useState<Info[]>(() => {
    const storedFavorites = localStorage.getItem("favoritePokemons")
    return storedFavorites ? JSON.parse(storedFavorites) : []
  })
  const [pokemonDetails, setPokemonDetails] = useState<Details[]>([])
  const [pokemonInfos, setPokemonInfos] = useState<Info[]>([])
  const [pokemons, setPokemons] = useState<PokemonUrl[]>([])

  useEffect(() => {
    getPokemons();
  }, [])

  useEffect(() => {
    if (pokemons.length > 0) {
      getPokemonDetails();
    }
  }, [pokemons])

  useEffect(() => {
    localStorage.setItem("favoritePokemons", JSON.stringify(favoritePokemons))
  }, [favoritePokemons])

  async function getPokemons() {
    const response = await api.get('/pokemon?limit=151&offset=0');
    setPokemons(response.data.results);
  }

  async function getPokemonDetails() {
    const detailsPromises = pokemons.map((pokemon) =>
      api.get(pokemon.url).then((response) => response.data)
    );

    const details = await Promise.all(detailsPromises);

    setPokemonInfos(details);
    setPokemonDetails(details);
  }

  function addPokemonToFavoritesList(pokemon: Info) {
    setFavoritePokemons((prevState) => [...prevState, pokemon])
  }

  function removePokemonFavoritesList(id: number) {
    const newListPokemonsFavorites = favoritePokemons.filter((fav) => fav.id !== id)
    setFavoritePokemons(newListPokemonsFavorites)
  }

  function addPokemonDetails(pokemon: Details[]) {
    setPokemonDetails((prevState) => [...prevState, ...pokemon])
  }

  function addPokemonInfo(pokemonInfos: Info[]) {
    setPokemonInfos((prevState) => [...prevState, ...pokemonInfos])
  }

  function isPokemonFavorited(id: number) {
    return favoritePokemons.some((fav) => fav.id === id)
  }

  return (
    <PokemonContext.Provider
      value={{
        addPokemonToFavoritesList,
        removePokemonFavoritesList,
        favoritePokemons,
        addPokemonDetails,
        pokemonDetails,
        pokemonInfos,
        addPokemonInfo,
        getPokemonDetails,
        isPokemonFavorited,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
