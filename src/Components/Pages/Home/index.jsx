// Importaciones necesarias de React y sus hooks
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Importación de componentes
import Header from "../../Header";
import Footer from "../../Footer";
import Banner from "../../Banner";
import Categorias from "../../Categorias";
// Importación de la función para obtener datos de la API
import { fetchOrchids } from "../../../axios";

// Contenedor principal de la página
// Usa flexbox para asegurar que el footer siempre esté al final
// Aplica el gradiente y color de texto según el tema actual
const PageContainer = styled.div`
min-height: 100vh;
display: flex;
flex-direction: column;
background: ${({ theme }) => theme.gradient};
color: ${({ theme }) => theme.text};
transition: all 0.3s ease-in-out;
`;
// Contenedor principal que ocupa espacio disponible entre header y footer
//flex:1 asegura que tome todo el espacio vertical disponible

const MainContent = styled.main`
flex: 1;
`;

// Contenedor que limita el ancho del contenido y añade padding
// Usado para mantener el contenido centrado y con márgenes consistentes
const ContentContainer = styled.div`
max-width: 1200px;
margin: 0 auto;
padding: 2rem;
`;

// Componente principal Home
const Home = () => {
// Estado para almacenar los videos categorizados por tipo de orquídeas
// Inicializado con arrays vacios para cada categoría
const [videos, setVideos] = useState({
    phalaenopsis: [],
    cattleya: [],
    dendrobium: [],
});

// useEffect para cargar los videos cuando el componente se monta
useEffect(() => {
// Función asíncrona para cargar los videos
    const loadVideos = async () => {
    try {
    // Contiente los datos de la API
        const response = await fetchOrchids();
        console.log("Datos recibidos en Home:", response);
        setVideos(response); 
        // Actualiza el estado de los videos categorizados
    } catch (error) {
        // Manejo de errores si la carga falla
        console.error("Error cargando videos en Home:", error);
    }
    };
// Ejecuta la función de carga
    loadVideos();
}, []); // Array de dependencias vacio significa que solo se ejecuta al montar el componente

// Renderizado del componente
return (
    <PageContainer>
    {/* Header de la página*/}
    <Header />
    <MainContent>
    {/* Banner principal */}
        <Banner />
        {/* Contenedor del contenido principal*/}
        <ContentContainer>
        {/* Componente de categorías que recibe los videos como prop */}
        <Categorias videos={videos} />
        </ContentContainer>
    </MainContent>
    {/* Footer de la página*/}
    <Footer />
    </PageContainer>
);
};

// Exportación del componente
export default Home;
