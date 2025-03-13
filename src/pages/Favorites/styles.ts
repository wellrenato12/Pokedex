import styled from "styled-components";

export const Container = styled.div`  
  max-width: 1024px;
  margin: auto;
`

export const GridPokemons = styled.div`
  margin: 2rem 0 2rem 0;

  display: grid;
  justify-items: center;
  gap: 2rem;
  grid-template-columns: repeat(5, 1fr);
`