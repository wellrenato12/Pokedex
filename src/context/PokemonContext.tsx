import { createContext, ReactNode, useEffect, useState } from "react"
import { Info } from "../Interfaces/Info"
import { Details } from "../Interfaces/Details"
import { api } from "../lib/axios"
import { PokemonUrl } from "../Interfaces/Pokemon"
import { showErrorToast } from "../utils/toastAlert"

interface PokemonContextProps {
  favoritePokemons: Info[]
  pokemonDetails: Details[]
  pokemonInfos: Info[]
  isLoading: boolean
  addPokemonToFavoritesList: (pokemon: Info) => void
  removePokemonFavoritesList: (id: number) => void
  addPokemonDetails: (pokemon: Details[]) => void
  addPokemonInfo: (pokemonInfos: Info[]) => void
  getPokemonDetails: () => void
  isPokemonFavorited: (id: number) => boolean
  toggleLoading: (condition: boolean) => void
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
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)
    try {
      const response = await api.get('/pokemon?limit=151&offset=0');
      setPokemons(response.data.results);
    } catch (error) {
      showErrorToast(`Falhar ao carregar os dados! ${error}`)
    } finally {
      setIsLoading(true)
    }
  }

  async function getPokemonDetails() {
    setIsLoading(true)
    try {
      const detailsPromises = pokemons.map((pokemon) =>
        api.get(pokemon.url).then((response) => response.data)
      );

      const details = await Promise.all(detailsPromises);

      setPokemonInfos(details);
      setPokemonDetails(details);
    } catch (error) {
      showErrorToast(`Falhar ao carregar os dados! ${error}`)
    } finally {
      setIsLoading(false)
    }
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

  function toggleLoading(condition: boolean) {
    setIsLoading(condition)
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
        toggleLoading,
        isLoading
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
