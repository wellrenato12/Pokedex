import styled from "styled-components";

export const Container = styled.div`  
  max-width: 1024px;
  margin: auto;
`

export const ImagePoke = styled.img`
  display: flex;
  width: 16rem;
  margin: 4rem auto;
`

export const SearchPokemon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 2rem;
  border-radius: 1rem;
  color: white;
  background-color: #313131;
  width: 100%;

  input {
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
    outline: none;
    font-size: 18px;
    color: black;

    &::placeholder {
      color: gray;
      opacity: 0.75;
    }
  }
`

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0 1rem;
`

export const FavoritesLink = styled.a`
  font-size: 1.25rem;
  transition: 0.2s ease-in-out;

  &:hover {
    color: red;
  }
`

export const ContainerButtonsType = styled.div`
  flex: 1;

  p {
    font-size: 1.5rem;
  }
`

export const ContainerButtonReset = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: none;
  background-color: transparent;

  width: 11rem;

  button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: black;
    font-family: "VT323", sans-serif;
    color: white;
    height: 3rem;
    font-size: 1rem;
    cursor: pointer;
    border: none;
  }
`