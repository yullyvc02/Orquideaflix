// Importaciones necesarias
import React, { useEffect, useState } from "react"; // Importación de React y hooks básicos
import styled from "styled-components"; // Para estilos con CSS-in-JS
import VideoCard from "../VideoCard"; // Componente para mostrar los videos individuales
import EditarCard from "../Modal"; // Componente modal para edición
import { fetchOrchids } from "../../axios"; // Función para obtener datos de orquídeas
import axios from "axios"; 

// Definición de componentes estilizados
const CategoriasContainer = styled.div`
display: flex;
flex-direction: column;
gap: 3rem;
padding: 1rem;
`;

// Estilo para cada categoría individual
const CategoriaItem = styled.div`
margin-bottom: 1rem;
padding: 0.5rem;
border-radius: 15px;
font-size: 1.2rem;
font-weight: bold;
color: #fff;
text-align: center;
background-color: ${(props) => props.$bgColor}; // Color dinámico basado en props
transition: transform 0.3s ease;
max-width: 200px;
margin: auto;
&:hover {
transform: scale(1.05); // Efecto de escala al pasar el mouse
}
`;

// Contenedor para la grid de videos
const VideosContainer = styled.div`
display: flex;
flex-wrap: wrap;
gap: 1rem;
justify-content: center;
`;

// URL base para las peticiones API
const API_URL = "http://localhost:3001/videos"; 

// Componente principal Categorías
const Categorias = () => {
// Estado para las categorías predefinidas
const [categorias] = useState([
{ nombre: "phalaenopsis", color: "#FF9D23" },
{ nombre: "cattleya", color: "#FF4E88" },
{ nombre: "dendrobium", color: "#CB22D7" },
]);

// Estado para almacenar los videos por categoría
const [videos, setVideos] = useState({
phalaenopsis: [],
cattleya: [],
dendrobium: [],
});

// Estados para manejar el modal y la edición/eliminación
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedVideo, setSelectedVideo] = useState(null);
const [isDeleting, setIsDeleting] = useState(false);

// Efecto para cargar los videos al montar el componente
useEffect(() => {
    loadVideos();
}, []);

// Función para cargar los videos desde la API
const loadVideos = async () => {
try {
const response = await fetchOrchids();
console.log("Datos recibidos:", response);
setVideos(response); // Actualiza el estado con los datos categorizados
} catch (error) {
console.error("Error cargando videos:", error);
}
};



// Manejador para abrir el modal de edición
const handleEdit = (video) => {
setSelectedVideo(video);
setIsModalOpen(true);
};

// Manejador para eliminar videos
const handleDelete = async (videoId) => {
    if (!videoId) return;
    
    if (window.confirm('¿Estás seguro de que deseas eliminar este video?')) {
        setIsDeleting(true);
        try {
            const response = await axios.delete(`${API_URL}/${videoId}`);
            
            if (response.status === 200) {
                // Actualizar el estado local eliminando el video
                const updatedVideos = { ...videos };
                Object.keys(updatedVideos).forEach(categoria => {
                    updatedVideos[categoria] = updatedVideos[categoria].filter(
                        video => video.id !== videoId
                    );
                });
                setVideos(updatedVideos);
                alert('Video eliminado con éxito');
            }
        } catch (error) {
            console.error('Error al eliminar el video:', error);
            alert('Error al eliminar el video. Por favor, intenta nuevamente.');
        } finally {
            setIsDeleting(false);
        }
    }
};

// Manejador para guardar cambios en un video
const handleSave = async (updatedVideo) => {
    try {
        const response = await axios.put(`${API_URL}/${updatedVideo.id}`, updatedVideo);
        if (response.status === 200) {
            // Recargar todos los videos para asegurar datos actualizados
            const datosActualizados = await fetchOrchids();
            setVideos(datosActualizados);
            setIsModalOpen(false);
        }
    } catch (error) {
        console.error('Error al guardar el video:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
    }
};
// Renderizando del componente
return (
<CategoriasContainer>
{categorias.map((categoria) => (
<div key={categoria.nombre}>
<CategoriaItem $bgColor={categoria.color}>
{categoria.nombre.toUpperCase()}
</CategoriaItem>
<VideosContainer>
{videos[categoria.nombre]?.map((video) => (
<VideoCard
key={video.id}
video={video} // Pasar el video directamente
onEdit={() => handleEdit(video)}
onDelete={() => handleDelete(video.id)}
isDeleting={isDeleting}

/>
))}
</VideosContainer>
</div>
))}
{isModalOpen && selectedVideo && (
<EditarCard
video={selectedVideo}
onClose={() => setIsModalOpen(false)}
onSave={handleSave}
/>
)}
</CategoriasContainer>
);
};

export default Categorias;