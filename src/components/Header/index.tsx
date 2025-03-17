import { Moon, SunMoon } from "lucide-react";
import * as S from './styles'
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <S.ContainerHeader>
      <S.ImagePoke src="https://assets.website-files.com/62c1627eee0defc3a1256898/62cf234679dbabe18fa50a1e_pokeapi_256%201.svg" alt="PokéAPI" />
      <S.ThemeToggleButton $themeMode={theme} onClick={toggleTheme}>
        {theme === "light" ? (
          <>
            Dark mode <Moon color="white" />
          </>
        ) : (
          <>
            Light mode <SunMoon />
          </>
        )}
      </S.ThemeToggleButton>
    </S.ContainerHeader>
  )
}