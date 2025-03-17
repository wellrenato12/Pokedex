import styled from "styled-components";
import { ThemeModeProps } from "../../Interfaces/ThemeMode";

export const Container = styled.div<ThemeModeProps>`  
  max-width: 1024px;
  margin: 2rem auto;

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  a {
    font-size: 1.25rem;
    transition: 0.2s ease-in-out;
    color: ${({ $themeMode }) => ($themeMode === "light" ? "#111827" : "#F9FAFB")};

    &:hover {
      opacity: 90%;
    }
  }

  h3 {
    font-size: 1.5rem;
    text-align: center;
    margin: 5rem auto
  }
`

export const GridPokemons = styled.div`
  margin: 2rem 0 2rem 0;

  display: grid;
  justify-items: center;
  gap: 2rem;
  grid-template-columns: repeat(5, 1fr);
`