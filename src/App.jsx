// Importaciones necesarias
import React from "react";
// Importaciones para el enrutamiento
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Importaciones de componentes de páginas
import Home from "./Components/Pages/Home";
import NuevoVideo from "./Components/Pages/NuevoVideo";
// Importaciones para estilos
import styled from "styled-components";
import GlobalStyles from "./Components/Global Styles";
// Importación del contexto del tema
import { useTheme }  from "./ThemeContext";
// Importación de iconos para el toggle del tema
import { Sun, Moon } from "lucide-react"; 


// Componente estilizado para el botón de cambio de tema
// Posicionado fijo en la esquina superior derecha
const ThemeToggleButton = styled.button`
position: fixed ;
top: 90px;
right: 6px;
// Estilos que cambian según el tema actual
background: ${({theme }) => theme.background};
  border: 1px solid ${({theme }) => theme.text};
  border-radius: 20px;
  color: ${({ theme }) => theme.text};
// Estilos del botón
cursor: pointer;
padding: 8px 16px;
display:flex;
align-items: center;
gap: 8px;

// Animación y capa
transition: all 0.3 ease-in-out;
z-index:1000;

// Efecto hover
  &:hover {
    opacity: 0.8;
  }

  // Estilos para los iconos
  svg {
    width: 20px;
    height: 20px;
  }
`;

// Componente principal de la aplicación
function App() {
// Obtiene el estado del tema y la función para cambiarlo del contexto
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
  // BrowserRouter para manejar la navegación
    <BrowserRouter>
    {/* Estilos globales de la aplicación */}
      <GlobalStyles />
      {/* Botón para cambiar entre tema claro y oscuro*/}
        <ThemeToggleButton onClick={toggleTheme}>
          {isDarkTheme ? <Moon /> : <Sun />} {/* Muestra el icono según el tema actual */}
          {isDarkTheme ? "Oscuro" : "Claro"} {/* Muestra el texto según el tema actual */}
        </ThemeToggleButton>
        {/* Definición de rutas de la aplicación*/}
        <Routes>
        {/* Ruta principal que renderiza el componente Home */}
          <Route path="/" element={<Home />} />
          {/* Ruta para crear nuevo video */}
          <Route path="/nuevo-video" element={<NuevoVideo />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

