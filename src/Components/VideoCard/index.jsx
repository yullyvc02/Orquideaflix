// Importaciones necesarias
import React from 'react';
import styled from 'styled-components';
// Importación de iconos de la librería Lucide-react
import { Edit, Trash2, Play } from 'lucide-react';

// Contenedor principal de la tarjeta
// Define el diseño base de la tarjeta de video
const Card = styled.div`
width: 280px;
background-color: #001F3F;
border-radius: 10px;
padding: 16px;
margin: 10px;
box-shadow: 0 4px 8px rgba(0,0,0,0.2);
display: flex;
flex-direction: column;
gap: 10px;
`;

// Componente para la imagen del video
// Asegura que todas las imagenes tengan el mismo tamaño y proporción
const Image = styled.img`
width: 100%;
height: 180px;
object-fit: cover;
border-radius: 8px;
`;

// Estilo para el título del video
const Title = styled.h3`
color: white;
margin: 8px 0;
font-size: 1.2rem;
`;

// Contenedor para los botones de acción
// Usa flexbox para distribuir los botones uniformemente
const ButtonContainer = styled.div`
display: flex;
flex-wrap: wrap;
gap: 8px;
margin-top: auto;
justify-content: space-between;
`;

// Componente Button con estilos condicionales según su variante
// Incluye estados para disabled y hover
const Button = styled.button`
flex: 1;
min-width: 80px;
padding: 8px;
border: none;
border-radius: 5px;
cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'} ;
opacity: ${props => props.disabled ? 0.6 : 1};
// Colores diferentes según la variante del botón
background-color: ${props => {
    if (props.$variant === 'delete') return '#C69749' ; 
    if (props.$variant === 'edit') return '#577B8D';
return '#57A6A1';
}}; 
color: white;
display:flex;
align-items:center;
justify-content:center;
gap: 4px;
font-size: 0.9rem;

&:hover {
    opacity: ${props => props.disabled ? 0.6 : 0.9} ;
}
`;

// Componente principal VideoCard
// Recibe como props: video (datos del video), onEdit (función para editar)
//onDelete (función para eliminar) y isDeleting (estado de eliminación)
const VideoCard = ({ video, onEdit, onDelete, isDeleting }) => {
// Si no hay video, no renderiza nada
if (!video) return null;

return (
    <Card>
    {/* Imagen del video con manejo de error si la imagen no carga*/}
    <Image 
        src={video.imagen} 
        alt={video.titulo} 
        onError={(e) => {
        // Si la imagen falla, carga una imagen de placeholder
        e.target.src = '/placeholder-image.jpg';
        e.target.onerror = null;
        }}
    />
    {/* Título del video */}
    <Title>{video.titulo}</Title>
    {/* Contenedor de botones de acción */}
    <ButtonContainer>
    {/* Botón para ver el video - abre en nueva pestaña*/}
        <Button onClick={() => window.open(video.video, '_blank')}>
        <Play size={14} /> Ver video
        </Button>
{/* Botón para editar - deshabilitado durante la eliminación*/}
        <Button onClick={() => onEdit(video)} $variant="edit" disabled={isDeleting}>
        <Edit size={14} /> Editar
        </Button>
        {/* Botón para eliminar - muestra estado de eliminación*/}
        <Button onClick={() => onDelete(video.id)} $variant="delete" disabled={isDeleting}>
        <Trash2 size={14} /> { isDeleting ? 'Borrando...' : 'Borrar'}
        </Button>
    </ButtonContainer>
    </Card>
);
};

export default VideoCard;