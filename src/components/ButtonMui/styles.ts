import { Button } from "@mui/material";
import styled from "styled-components";

interface MenuButtonProps {
  $themeMode: string
}

export const Container = styled.div`
  max-width: 11rem;
  border-radius: .75rem;
  background-color: #313131;
`

export const MenuButton = styled(Button)<MenuButtonProps>`
  &.MuiButtonBase-root {
    background-color: ${(props) => (props.$themeMode === 'light' ? 'black' : 'white')};
    color: ${(props) => (props.$themeMode === 'light' ? 'white' : 'black')};
    width: 100%;
  }
`;