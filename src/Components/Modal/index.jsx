// Importaciones necesarias
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Definición de estilos del Modal usando styled-components
//Modal Overlay - Crea el fondo oscuro semi-transparente que cubre toda la pantalla
const ModalOverlay = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
z-index: 1000;
`;

// Contenedor principal del modal con fondo verde
const ModalContainer = styled.div`
background-color: #3E7B27;
padding: 2rem;
border-radius: 8px;
width: 500px;
max-width: 90%;
max-height: 90vh;
overflow-y: auto;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// Encabezado del modal que contiene el título y botón de cierre
const ModalHeader = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 2rem;
position:relative;
`;

// Estilos para el título del modal
const Title = styled.h2`
font-family: 'Lato', sans-serif;
margin:0;
color: #fff;
font-size: 2rem;
font-weight: bold;
`;

// Botón de cierre del modal (X)
const CloseButton = styled.button`
position: absolute;
right: 0;
background: none;
border: none;
font-size: 2rem;
cursor: pointer;
color: #fff;
padding: 0.5rem;

&:hover {
    color: #273E7B;
}
`;

// Estilos para el formulario y sus componentes
const Form = styled.form`
display: flex;
flex-direction: column;
gap: 1.5rem;
`;

// Contenedor para cada grupo de campos del formulario
const FormGroup = styled.div`
display: flex;
flex-direction: column;
gap: 0.5rem;
`;

// Estilos para las etiquetas de los campos
const Label = styled.label`
font-family:'Lato', sans-serif;
font-weight: bold;
color: #fff;
`;

// Estilos para los campos de entrada de texto
const Input = styled.input`
font-family: 'Lato',sans-serif;
padding: 0.75rem;
border: 2px solid #ffadad;
border-radius: 4px;
font-size: 1rem;

&:focus {
    outline: none;
    border-color: #4a90e2;
}
`;

// Estilos para el selector de categorías
const Select = styled.select`
font-family: 'Lato',sans-serif;
padding: 0.75rem;
border: 2px solid #ffadad;
border-radius: 4px;
font-size: 1rem;
background-color: white;

&:focus {
    outline: none;
    border-color: #4a90e2;
}
`;

// Estilos para el área de texto (descripción)
const Textarea = styled.textarea`
font-family: 'Lato',sans-serif;
padding: 0.75rem;
border: 2px solid #ffadad;
border-radius: 4px;
font-size: 1rem;
resize: vertical;
min-height: 100px;

&:focus {
    outline: none;
    border-color: #4a90e2;
}
`;

// Contenedor para los botones del formulario
const ButtonGroup = styled.div`
display: flex;
justify-content: flex-end;
gap: 1rem;
margin-top: 1rem;
`;

// Estilos para los botones con variantes de color según su función
const Button = styled.button`
font-family: 'Lato',sans-serif;
border: 2px solid #ffadad;
padding: 0.75rem 1.5rem;
border-radius: 20px;
font-size: 1rem;
font-weight: bold;
cursor: pointer;
transition: opacity 0.2s;

&:hover {
    opacity: 0.9;
}

// Define colores diferentes según la variante del botón
background-color: ${props => {
    switch (props.$variant) {
    case 'save':
        return '#273E7B';
    case 'clear':
        return '#A3A3A3';
    case 'cancel':
        return '#7B273E';
    default:
        return '#273E7B';
    }
}};
color: white;
`;


// Datos de categorías disponibles con sus respectivos colores
const categorias = [
{ nombre: "Phalaenopsis", color: "#FF9D23" },
{ nombre: "Cattleya", color: "#FF4E88" },
{ nombre: "Dendrobium", color: "#CB22D7" },
];

// URL de la API para las operaciones CRUD
const API_URL = "http://localhost:3001/videos"; 

// Componente principal EditarCard
const EditarCard = ({ video, onClose, onSave }) => {
// Estado para manejar los datos del formulario
const [formData, setFormData] = useState({
    titulo: video?.titulo || '',
    categoria: video?.categoria|| '',
    imagen: video?.imagen || '',
    video: video?.video || '',
    descripcion: video?.descripcion || ''
});

// Estados para manejar el envío del formulario y errores
const [isSubmitting, setIsSubmitting] =useState(false);
const [error, setError] =useState(null);

// Manejador de cambios en los campos del formulario
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
    ...prev,
    [name]: value
    }));
};

// Manejador del envío del formulario
const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    setError(null);

    try {
    // Envía la actualización a la API
        const response = axios.put (`${API_URL}/${video.id}`,formData);

        if (response.status === 200) {
            const updateVideo = response.data;
// Normaliza los datos del video actualizado
            const normalizeVideo = {
                id: updateVideo.id,
                titulo: updateVideo.titulo,
                categoria:updateVideo.categoria.tolowerCase().trim(),
                imagen: updateVideo.imagen.trim(),
                video: updateVideo.video,
                descripcion: updateVideo.descripcion
            };
// Notifica al componente padre y cierra el modal
            onSave(normalizeVideo);
            onClose();
        }
    } catch (error) {
        setError(error.response?.data?.message || 'Error al actualizar el video');
        console.error('Error updating video', error);
    } finally {
        setIsSubmitting(false);
    }
    
    
};

// Manejador para limpiar el formulario
const handleClear = () => {
    setFormData({
    titulo: '',
    categoria: '',
    imagen: '',
    video: '',
    descripcion: ''
    });
    setError(null);
};

// Renderizado del componente
return (
    <ModalOverlay>
    <ModalContainer>
        <ModalHeader>
        <Title>Editar Card</Title>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        {/* Muestra mensajes de error si existen */}
        {error && (
            <div style={{color: '#ff4444', marginBottom: '1rem', textAlign: 'center' }}>
                {error}
            </div>
        )}
        {/* Formulario para editar el video*/}
        <Form onSubmit={handleSubmit}>
        <FormGroup>
            <Label>Título:</Label>
            <Input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            />
        </FormGroup>

        <FormGroup>
            <Label>Categoría:</Label>
            <Select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria, index) => (
                <option
                key={index}
                value={categoria.nombre.toLowerCase()}
                style={{
                backgroundColor:categoria.color,
                color:"#fff",
                }}
                >
                {categoria.nombre}
                </option>
                ))}            
            </Select>
        </FormGroup>

        <FormGroup>
            <Label>Imagen (URL):</Label>
            <Input
            type="text"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
            />
        </FormGroup>

        <FormGroup>
            <Label>Video (URL):</Label>
            <Input
            type="text"
            name="video"
            value={formData.video}
            onChange={handleChange}
            />
        </FormGroup>

        <FormGroup>
            <Label>Descripción:</Label>
            <Textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="4"
            />
        </FormGroup>

        <ButtonGroup>
            <Button type="submit" $variant="save">
            {isSubmitting ? 'Guardando...':'Guardar'}
            
            </Button>
            <Button type="button" $variant="clear" onClick={handleClear} disabled={isSubmitting}>
            Limpiar
            </Button>
            <Button type="button" $variant="cancel" onClick={onClose} disabled={isSubmitting}>
            Cancelar
            </Button>
        </ButtonGroup>
        </Form>
    </ModalContainer>
    </ModalOverlay>
);
};

export default EditarCard;