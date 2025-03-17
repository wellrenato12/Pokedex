import styled from "styled-components";
import { ThemeModeProps } from "../../Interfaces/ThemeMode";

export const ContainerHeader = styled.div`
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