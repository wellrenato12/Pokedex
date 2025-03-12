import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import './styles/global.css'
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
