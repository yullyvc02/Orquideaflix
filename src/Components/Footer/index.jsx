// Importación de styled-components y la utilidad de animaciones 
import styled, { keyframes } from 'styled-components';

// Definición de la animación del fondo
// Crea un efecto de movimiento suave del fondo en un ciclo infinito
const moveBackground =keyframes`
0% {
    background-position: 0 0; // Posición inicial
}
50% {
    background-position: 50% 50%; // Punto medio de la animación
}
100% {
    background-position:  0 0; // Regresa a la posición inicial
}
`;

// Componente principal del footer
const FooterStyled = styled.footer`
display: flex;
justify-content: space-between;
align-items: center;
background: ${({ theme }) => theme.gradient}; // Usa el gradiente definido en el tema
padding: 1rem 2rem;
height: 80px;
width: 100%;
position: relative;
bottom: 0;
left: 0;
right: 0;
background-image: url('/img/flor_gift.gif'); // Imagen de fondo animada
background-repeat: repeat;
background-size: 80px 80px;
animation: ${moveBackground} 6s ease-in-out infinite; // Aplica la animación definida
color: ${({ theme }) => theme.text};
transition: all 0.3s ease-in-out;

// Estilos responsivos para pantallas pequeñas
@media (max-width: 768px) {
    FooterStyled {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
}

Redes {
    margin-left: 0;
    justify-content: center;
}

Logo {
    margin: 0 auto;
    height: auto;
    max-height: 60px;
}

InfoContainer {
    small, p {
        margin: 0;
        text-align:center;
    }
}
}
`;

// Componente para el logo
const Logo = styled.img`
height: 81px; 
width: auto;
`;

// Commponente para los iconos de redes sociales
const Redes=styled.div`
display:flex;
align-items: center;
gap: 8px;
margin-left:300px;



img {
    width: 30px;
    height: 30px;
    transition: transform 0.3s ease;


&:hover {
    transform: scale(1.5); // Efecto de escala al pasar el mouse
}
}
`;

// Contenedor para la información de copyright y créditos
const InfoContainer = styled.div`
display:flex;
flex-direction: column;
align-items: center;
gap:0.5rem;


small {
    margin: 0 auto;
    text-align: center;
    font-weight: 400;
    color: #fff;
}

p {
    margin: 0 auto;
    text-align: center;
    font-weight:  400;
    color: #fff;
}
`;

// Componente funcional footer que integra todos los elementos
const Footer = () => {
return (
    <FooterStyled >
    <Logo src="/img/Logo.png" alt="Logo" />
    <Redes>
        <a href="https://github.com/yullyvc02" target="_blank" rel="noopener noreferrer">
    {/* Enlaces a redes sociales con atributos de seguridad*/}
        <img src="/img/github.png" alt="Github" />
        </a>
        <a href="https://www.linkedin.com/in/yully-garz%C3%B3n-hern%C3%A1ndez-790141258/" target="_blank" rel="noopener noreferrer">
        <img src="/img/linkedin.png" alt="Linkedin" />
        </a>
    </Redes>
    <InfoContainer>
    <p>Desarrollado por Yully Garzón</p>
    <small>&copy;2025 Todos los derechos reservados</small>
    </InfoContainer>
    </FooterStyled>
);
};

export default Footer;
