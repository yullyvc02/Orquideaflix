// Importación de la utilidad para crear estilos globales
import { createGlobalStyle } from "styled-components";
// Importación de las fuentes personalizadas
import LatoRegular from "./Fonts/Lato-Regular.ttf";
import LatoBold from "./Fonts/Lato-Bold.ttf";

// Creación de los estilos globables usando styled-components
const GlobalStyles = createGlobalStyle`
// Declaración de fuentes personalizadas
@font-face {
    font-family: "Lato"; // Nombre de la fuente
    src: url(${LatoRegular}), format('truetype'); // Ruta y formato
    font-weight: normal; // Peso normal
    font-style: normal;
}

@font-face {
    font-family: "Lato"; // Mismo nombre para variante
    src: url(${LatoBold}), format('truetype'); // Variante negrita
    font-weight: bold;
    font-style: normal;
}

// Reset básico de estilos
*{
    margin: 0;
    padding:0;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif; // Aplicar fuente Lato a todo
}

// Configuración básica de HTML y body 
html, body {
    height: 100%;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%; // Previene ajustes de texto en iOS
}

// Estilos del body con soporte para tema claro/oscuro
    body {
        background:${({ theme }) => theme.background};
        color: ${({ theme }) => theme.tex};
        transition: all 0.3s ease-in-out; // Transición suave al cambiar tema
    }

// Configuración del contenedor raíz
    #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        position: relative; // Para el botón de tema 
    }
// Estilos para el contenido principal
    main {
        display: block;
    }
// Estilos básicos para encabezados
    h1 {
        font-size: 2em;
        margin: 0.67em 0;
    }
// Estilos para elementos horizontales
    hr {
        box-sizing: content-box;
        height: 0;
        overflow: visible;
    }
// Estilos para código preformateado
    pre {
        font-family: monospace, monospace;
        font-size: 1em;
    }
// Estilos para enlaces
    a {
        background-color: transparent;
    }
// Estilos para abreviaciones
    abbr[title] {
        border-bottom: none;
        text-decoration: underline;
        text-decoration: underline dotted;
    }
// Estilos para texto en negrita
    b,
    strong {
        font-weight: bolder;
    }
// Estilos para elementos de código
    code,
    kbd,
    samp {
        font-family: monospace, monospace;
        font-size: 1em;
    }
// Estilos para texto pequeño
    small {
        font-size: 80%;
    }
// Estilos para subíndices y superíndices
    sub,
    sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
    }

    sub {
        bottom: -0.25em;
    }

    sup {
        top: -0.5em;
    }
// Estilos para imágenes
    img {
        border-style: none;
    }
// Estilos para elementos de formulario
    button,
    input,
    optgroup,
    select,
    textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
    }
// Estilos específicos para botones y campos de entrada
    button,
    input {
        overflow: visible;
    }

    button,
    select {
        text-transform: none;
    }

    main {
    flex: 1 0 auto;
}
// Normalización de botones y elementos tipo botón
    button,
    [type="button"],
    [type="reset"],
    [type="submit"] {
        appearance:button;
        -webkit-appearance: button;
    }
// ELiminación de bordes internos en Firefox
    button::-moz-focus-inner,
    [type="button"]::-moz-focus-inner,
    [type="reset"]::-moz-focus-inner,
    [type="submit"]::-moz-focus-inner {
        border-style: none;
        padding: 0;
    }
// Estilos de focus para accesibilidad
    button:-moz-focusring,
    [type="button"]:-moz-focusring,
    [type="reset"]:-moz-focusring,
    [type="submit"]:-moz-focusring {
        outline: 1px dotted ButtonText;
    }
// Estilos para campos de formulario
    fieldset {
        padding: 0.35em 0.75em 0.625em;
    }

    legend {
        box-sizing: border-box;
        color: inherit;
        display: table;
        max-width: 100%;
        padding: 0;
        white-space: normal;
    }
// Estilos para elementos específicos de formulario
    progress {
        vertical-align: baseline;
    }

    textarea {
        overflow: auto;
    }

    [type="checkbox"],
    [type="radio"] {
        box-sizing: border-box;
        padding: 0;
    }
// Estilos específicos para navegadores WebKit/Chrome
    [type="number"]::-webkit-inner-spin-button,
    [type="number"]::-webkit-outer-spin-button {
        height: auto;
    }

    [type="search"] {
        appearance:textfield;
        -webkit-appearance: textfield;
        outline-offset: -2px;
    }

    [type="search"]::-webkit-search-decoration {
        -webkit-appearance: none;
    }

    ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
    }
// Estilos para elementos semánticos HTML 5
    details {
        display: block;
    }

    summary {
        display: list-item;
    }

    template {
        display: none;
    }

    [hidden] {
        display: none;
    }

`;



export default GlobalStyles;