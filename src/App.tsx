import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import './styles/global.css'
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { ToastContainer } from "react-toastify";
import { Favorites } from "./pages/Favorites";
import { PokemonProvider } from "./context/PokemonContext";

export function App() {
  return (
    <PokemonProvider>
      <ThemeProvider theme={defaultTheme}>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </PokemonProvider>
  )
}
