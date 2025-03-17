import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { ToastContainer } from "react-toastify";
import { Favorites } from "./pages/Favorites";
import { PokemonProvider } from "./context/PokemonContext";
import { ThemeProviderComponent } from "./context/ThemeContext";
import { GlobalStyle } from "./styles/global";

export function App() {
  return (
    <PokemonProvider>
      <ThemeProviderComponent>
        <GlobalStyle />
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favoritos" element={<Favorites />} />
          </Routes>
        </BrowserRouter>
      </ThemeProviderComponent>
    </PokemonProvider>
  )
}
