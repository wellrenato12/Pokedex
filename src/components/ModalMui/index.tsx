import { Details } from '../../Interfaces/Details';
import { defaultTheme } from '../../styles/themes/default';
import { ButtonType } from '../ButtonType';
import { ModalMuiContainer, ModalMuiContent } from './styles';
import * as S from './styles'

interface ModalMuiProps {
  handleCloseModal: () => void
  open: boolean
  pokemonDetail: Details
}

export function ModalMui({
  handleCloseModal,
  open,
  pokemonDetail,
}: ModalMuiProps) {
  const heightInMeters = pokemonDetail.height / 10

  return (
    <ModalMuiContainer
      open={open}
      onClose={handleCloseModal}
    >
      <ModalMuiContent>
        <S.ImageContainer>
          <img src={pokemonDetail.sprites.front_default} alt="Imagem do Pokemon" />
          <span>{pokemonDetail.id}</span>
          <S.CloseButton onClick={handleCloseModal} />
        </S.ImageContainer>
        <S.NameContainer>
          <div>
            <span>
              {pokemonDetail.name}
            </span>
            <span>
              Altura:{' '}
              {heightInMeters.toFixed(1)}m
            </span>
          </div>
          <div>
            {Object.values(pokemonDetail.types).map((typeObj) => {
              const typeName = typeObj.type.name as keyof typeof defaultTheme
              return (
                <ButtonType
                  key={pokemonDetail.id}
                  $typePoke={typeName}
                  disabled
                >
                  {typeObj.type.name}
                </ButtonType>
              )
            })}
          </div>
        </S.NameContainer>
        <S.StatsContainer>
          <h2>Stats</h2>
          <div>
            {pokemonDetail.stats.map((stat) => (
              <span key={pokemonDetail.id}>{stat.stat.name}: <strong>{stat.base_stat}</strong></span>
            ))}
          </div>
        </S.StatsContainer>
        <S.HabilidadesContainer>
          <h2>Habilidades</h2>
          <div>
            {pokemonDetail.abilities.map((ability) => (
              <span key={pokemonDetail.id}>{ability.ability.name}</span>
            ))}
          </div>
        </S.HabilidadesContainer>
      </ModalMuiContent>
    </ModalMuiContainer >
  )
}