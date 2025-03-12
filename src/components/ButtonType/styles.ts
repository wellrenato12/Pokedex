import styled from "styled-components";
import { ButtonTypeProps } from ".";
import { defaultTheme } from "../../styles/themes/default";

type ButtonContainerProps = Pick<ButtonTypeProps, "$typePoke">

export const ButtonContainer = styled.button<ButtonContainerProps>`
  background-color: ${(props) => defaultTheme[props.$typePoke] || defaultTheme.normal};

  padding: .35rem .75rem;
  border-radius: 1rem;
  width: 5.5rem;
  color: white;
  cursor: pointer;
  margin: .25rem;
  font-size: 1.05rem;

  transition: 0.3s;

  &:hover {
    opacity: 75%;
  }

  &:disabled {
    cursor: default;
    opacity: 100%;
  }
`