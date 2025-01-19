// Importación de styled-components para crear componentes con estilos
import styled from "styled-components";

// Contendedor principal del banner con imagen de fondo
const BannerContainer = styled.div`
position: relative; // Permite posicionamiento absoluto de elementos hijos
height: 500px; // Altura fija del banner
width: 100%; // Ancho completo
background-image: url('/orquidea.png'); // Imagen de fondo
background-size: cover; // la imagen cubre todo el contenedor
background-position: center; // centrado de la imagen
overflow: hidden; // Oculta contenido que sale del contenedor

// Pseudo-elemento para crear una capa semi-transparente oscura sobre la imagen
&::before {
    content: '';
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3); // Overlay negro con 30% de opacidad
}
`;

// Contenedor del contenido del banner
const BannerContent = styled.div`
position: relative; // Para estar por encima del overlay
height: 100%; // Altura completa del contenedor padre
display: flex; // Uso de flexbox para alineación
flex-direction: column; // Elementos apilados verticalmente
align-items: center; // Centrado horizontal
justify-content:center; // Centrado Vertical
padding: 1rem;
max-width: 1000px; // Ancho máximo del contenido
margin: 0 auto; // Centrado horizontal automático
text-align:center;
`;

// Contenedor del texto del banner
const BannerText = styled.div`
width: 100%;
color: white; // Texto en color blanco
text-align: center;
padding: 1rem;


// Estilos para el titulo h1
h1 {
    
    align-items:center;
    font-weight: bold;
    margin-bottom: 1rem;
    padding:10px 20px;
    border-radius:20px;
    font: oblique 50px 'Lato', sans-serif; // Fuente en cursiva
    -webkit-text-stroke: 1px purple; // Borde del texto en púrpura Para Chrome y Safari 
    text-transform: uppercase; // Texto en mayúsculas
    
}

// Estilos para el subtítulo h2
h2 {
    
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    padding:10px 20px;
    font-family: 'Lato', sans-serif;
    font:italic 30px 'Lato', sans-serif;
    
}


// Estilos para el párrafo
p {
    font-size: 1.1rem;
    max-width: 800px; // Ancho máximo del texto
    text-align: justify; // Texto justificado
    margin: 0 auto; // Centrado horizontal
}
`;

// Tarjeta dentro del banner
const BannerCard = styled.div`
display:flex;
flex-direction:column;
max-width: 300px;
width:100%;
padding: 1rem;
border-radius: 15px;
`;

// Imagen dentro de la tarjeta
const CardImage = styled.img`
width: 110%; // Ancho ligeramente mayor que el contenedor
height: 170px;
object-fit: cover; // Ajuste de la imagen manteniendo proporción
border-radius: 20px; // Bordes redondeados
margin-bottom: 2rem;
`;

// Componente funcional Banner
const Banner = () => {
    return (
        <BannerContainer>
            <BannerContent>
                <BannerText>
                    <h1>Orquídeas</h1>
                    <h2>La Elegancia y Diversidad de las Orquídeas</h2>
                    <p>
                    Las orquídeas son conocidas por su belleza exótica y su amplia variedad de colores y formas. 
                    Estas flores, que pertenecen a una de las familias más grandes de plantas con flor, 
                    se encuentran en diversos hábitats alrededor del mundo. Además de su atractivo estético, 
                    las orquídeas tienen un valor simbólico y cultural en muchas sociedades.
                    </p>
                </BannerText>
                <BannerCard>
                    <CardImage
                    src={'/Cardmin.png'}
                    alt="Miniatura orquídea"
                    />
                </BannerCard>
            </BannerContent>
        </BannerContainer>

    );
};

// Exportación del componente
export default Banner;
