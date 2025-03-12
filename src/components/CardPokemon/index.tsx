import { useState } from "react";
import { defaultTheme } from "../../styles/themes/default";
import { ButtonType } from "../ButtonType";
import { ModalMui } from "../ModalMui";
import * as S from './styles'
import { showSuccessToast } from "../../utils/toastAlert";
import { Details } from "../../Interfaces/Details";
import { Info } from "../../Interfaces/Info";

interface CardPokemonProps {
  pokemon: Info
  pokemonDetail: Details
  typeName: keyof typeof defaultTheme
}

export function CardPokemon({ pokemon, typeName, pokemonDetail }: CardPokemonProps) {
  const [open, setOpen] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  function handleOpenModal() {
    setOpen(true)
  }

  function handleCloseModal() {
    setOpen(false)

  }

  function handleFavoriteToggle() {
    setIsFavorited((prevState) => !prevState)

    showSuccessToast(
      isFavorited ? (
        `${pokemon.name} adicionado aos favoritos!`
      ) : (
        `${pokemon.name} removido dos favoritos!`
      )
    )
  }

  return (
    <S.ContainerPosition>
      <S.HeartContainer
        onClick={handleFavoriteToggle}
        isFavorited={isFavorited}
      />
      <S.CardPokemonContainer onClick={handleOpenModal} key={pokemon.id}>
        <img src={pokemon.sprites.front_default} alt="Pokemon" />
        <span>
          <p>
            #
            {pokemon.id < 10 && '00' + pokemon.id}
            {pokemon.id >= 10 && pokemon.id < 100 && '0' + pokemon.id}
            {pokemon.id >= 100 && pokemon.id}
          </p>
          <p>EXP: {pokemon.base_experience}</p>
        </span>
        <h2>{pokemon.name}</h2>
        <ButtonType
          key={typeName}
          $typePoke={typeName}
        >
          {typeName}
        </ButtonType>
      </S.CardPokemonContainer>
      <ModalMui
        handleCloseModal={handleCloseModal}
        open={open}
        pokemonDetail={pokemonDetail}
      />
    </S.ContainerPosition>
  )
}