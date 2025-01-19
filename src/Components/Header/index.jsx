// Importaciones necesarias
import React, { useState} from 'react'; // React y hook de estado
import { useNavigate, useLocation } from 'react-router-dom'; // Hooks para navegación
import styled from "styled-components"; // Estilos



// Contenedor principal del header
const HeaderContainer = styled.header`
display: flex;
justify-content: space-between; // Distribuir elementos a los extremos
align-items: center; // Centra elementos verticalmente
background-color: #e5edf1; // Color de fondo base
padding: 1rem 2rem;
height: 80px;
background: ${({theme }) => theme.gradient}; // Gradiente del tema
color: ${({ theme }) => theme.text}; // Color de texto del tema
transition: all 0.3s ease-in-out; // Transición suave para cambios
`;
// Estilo para el logo
const Logo = styled.img`
height: 230px;  // Altura fija
width: auto; // Ancno automático para mantener proporciones
`;
// Barra de navegación
const Navigation = styled.nav`
display: flex;
align-items: center;
background-color:#BFECFF; // Fondo azul claro
border-radius: 30px; // Bordes redondeados
height: 60px; 
padding: 0rem;
gap: 2rem; // Espacio entre elementos
position:relative;
`;

// Botón de navegación
const Button =styled.button`
all:unset; // Resetea todos los estilos por defecto
cursor:pointer;
display:flex;
flex-direction: column; // Apila icono y texto verticalmente
justify-content: center;
align-items: center;
width: 100px;
height: 60px;
border-radius: 20px;
// Color de fondo condicional basado en si está activo
background-color: ${props => (props.$isActive ? "#0096ff": "transparent")};
// Color de texto condicional
color:${props => (props.$isActiveisActive ? "#000": "#000")};
font-size: 0.8rem;
font-weight: bold;
text-align: center;

// Efecto hover
&:hover {
    background-color: ${props => (props.isActive ? "#007acc":"#FFF6E3")};

}
`
// Estilo para los iconos
const IconImage = styled.img`
width: 24px;
height: 24px;
margin-bottom: 5px;;
transition: filter 0.3s ease;
// Ajusta el brillo según si está activo
filter: ${props => (props.$isActive ? "brightness(1)": "brightness(0.5)")};
`;

// Componente funcional Header
const Header = () => {
const navigate = useNavigate(); // Hook para navegación programática
const location = useLocation(); // Hook para obtener la ubicación actual
const currentPath = location.pathname; // Ruta actual

return (
<HeaderContainer>
<Logo src="/img/Logo.png" alt="Logo" />
<Navigation>
{/* Botón Home*/}
<Button
$isActive={currentPath === '/'} // Activo si estamos en home
onClick={() => navigate('/')} // Navega al home al hacer clic
>

<IconImage
src="/icons/Home.png"
alt="Home Icon"
$isActive={currentPath === '/'}
/>
Home
</Button>
{/* Botón Nuevo Video*/}
<Button
$isActive={currentPath === '/nuevo-video'} // Activo si estamos en nuevo video
onClick={() => navigate('/nuevo-video')} // Navega a nuevo video
>
<IconImage
src="/icons/Nuevo_video.png" 
alt="Nuevo Video Icon"
$isActive={currentPath === '/nuevo-video'}
/>
Nuevo video
</Button>
</Navigation>
</HeaderContainer>

);
};

export default Header;