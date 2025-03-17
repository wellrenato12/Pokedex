import styled from "styled-components";
import { ThemeModeProps } from "../../Interfaces/ThemeMode";

export const Container = styled.div`  
  max-width: 1024px;
  margin: auto;
`

export const ContainerImage = styled.div`
  position: relative;
`

export const ThemeToggleButton = styled.button<ThemeModeProps>`
  position: absolute;
  top: -30px;
  right: -10px;
  background-color: ${({ $themeMode }) => $themeMode === "light" ? "#111827" : "#F9FAFB"};
  color: ${({ $themeMode }) => ($themeMode === "light" ? "#F9FAFB" : "#111827")};
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: ${({ $themeMode }) =>
      $themeMode === "light" ? "#374151" : "#E5E7EB"};
  }
`;

export const ImagePoke = styled.img`
  display: flex;
  width: 16rem;
  margin: 4rem auto;
`

export const SearchPokemon = styled.div<ThemeModeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 2rem;
  border-radius: 1rem;
  background-color: ${({ $themeMode }) => $themeMode === "light" ? "#111827" : "#F9FAFB"};
  color: ${({ $themeMode }) => ($themeMode === "light" ? "#F9FAFB" : "#111827")};
  width: 100%;

  input {
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
    outline: none;
    font-size: 18px;
    background-color: ${({ $themeMode }) => $themeMode === "light" ? "#F9FAFB" : "#111827"};
    color: ${({ $themeMode }) => ($themeMode === "light" ? "#111827" : "#F9FAFB")};

    &::placeholder {
      color: ${({ $themeMode }) => ($themeMode === "light" ? "#111827" : "#F9FAFB")};
      opacity: 0.75;
    }
  }
`

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0 1rem;
`

export const FavoritesLink = styled.a<ThemeModeProps>`
  font-size: 1.25rem;
  transition: 0.2s ease-in-out;
  color: ${({ $themeMode }) => ($themeMode === "light" ? "#111827" : "#F9FAFB")};

  &:hover {
    opacity: 90%;
  }
`

export const ContainerButtonsType = styled.div`
  flex: 1;

  p {
    font-size: 1.5rem;
  }
`

export const ContainerButtonReset = styled.div<ThemeModeProps>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: none;

  width: 11rem;

  button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: ${({ $themeMode }) => $themeMode === "light" ? "#111827" : "#F9FAFB"};
    color: ${({ $themeMode }) => ($themeMode === "light" ? "#F9FAFB" : "#111827")};
    font-family: "VT323", sans-serif;
    height: 3rem;
    font-size: 1rem;
    cursor: pointer;
    border: none;
  }
`