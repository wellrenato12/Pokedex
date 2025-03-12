import styled from "styled-components";
import { Heart } from "lucide-react";

interface HeartProps {
  isFavorited: boolean;
}

export const ContainerPosition = styled.div`
  position: relative;
  transition: all .2s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }
`

export const CardPokemonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: .35rem;
  width: 10rem;
  cursor: pointer;
  
  img {
    background-color: #D3D3D3;
    border-radius: 12px;
    width: 100%;
  }

  span {
    display: flex;
    justify-content: space-between;
  }

  button {
    color: white;
    border: none;
    
  }
`

export const HeartContainer = styled(Heart).withConfig({
  shouldForwardProp: (prop) => prop !== "isFavorited",
})<HeartProps>`
  position: absolute;
  top: .35rem;
  left: .35rem;
  cursor: pointer;

  fill: ${({ isFavorited }) => (isFavorited ? "red" : "transparent")};

  transition: transform 0.2s ease-in-out, fill 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
    fill: red;
  }
`

