import { createContext, ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/themes/default";

interface ThemeContextProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps)

export function ThemeProviderComponent({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light"
  })

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  function toggleTheme() {
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}