// Importación de dependencias necesarias de React
import React, { createContext, useState, useContext } from "react";
// Importación del ThemeProvider de styled-components para manejar temas
import { ThemeProvider } from "styled-components";

// Creación del contexto que almacenará la información del tema
const ThemeContext = createContext();

// Definición del tema claro con sus propiedades
const lightTheme = {
    background: "#FFFFFF", // Fondo blanco
    text: "#000000", // Texto negro
    gradient: "linear-gradient(175deg,#A64D79 4.16%,#A64D79  48%, #A64D79)", // Gradiente purpura
    secondary:"#E5E5E5", // Color secundario gris claro
    accent:"#2A7AE4" // Color de acento azul
};

// Definición del tema oscuro con sus propiedades
const darkTheme = {
    background: "#000000", // Fondo negro
    text: "#FFFFFF", // Texto blanco
    gradient: "linear-gradient(175deg, #3B0944 4.16%, #3B0944 48%,  #3B0944)", // Gradiente púrpura oscuro
    secondary: "#2C2C2C", // Color secundario gris oscuro
    accent:"#4B9EFF" // Color de acento azul claro
};


// Componente proveedor del contexto del tema
export const ThemeContextProvider = ({ children }) => {
// Estado para controlar si el tema actual es oscuro
const [isDarkTheme, setIsDarkTheme] = useState(false);
// Función para alternar entre el tema claro y oscuro
const toggleTheme = () => setIsDarkTheme(!isDarkTheme);
// Selección del tema actual basado en isDarkTheme
const theme = isDarkTheme ? darkTheme : lightTheme;

return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
);
};

// Hook personalizado para acceder al contexto del tema desde cualquier componente
export const useTheme = () => useContext(ThemeContext);
