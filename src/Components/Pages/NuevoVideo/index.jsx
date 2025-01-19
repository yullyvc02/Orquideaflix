// Importaciones necesarias
import React, { useState } from 'react';
import styled from "styled-components";
import Header from "../../Header";
import Footer from "../../Footer";

// Contenedor principal de la página
// Usa flexbox para ocupar toda la altura de la ventana
const PageContainer = styled.div`
min-height: 100vh;
display: flex;
flex-direction: column;
background: ${({ theme }) => theme.gradient};
color: ${({ theme }) => theme.text};
transition: all 0.3s ease-in-out;
`;

// Contenedro del contenido principal
// flex: 1 hace que ocupe todo el espacio dispoonible entre header y footer
const MainContent = styled.main`
flex: 1;
padding: 2rem;
background: ${({ theme }) => theme.gradient};
color: ${({ theme }) => theme.text};
transition: all 0.3s ease-in-out;
`;

// Contenedor del formulario con estilo de tarjeta
const FormContainer = styled.div`
max-width: 800px;
margin: 0 auto;
background-color: #3E7B27;
padding: 2rem;
border-radius: 8px;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// Título del formulario
const Title = styled.h1`
font-family: 'Lato', sans-serif;
color: #fff;
font-size: 2rem;
font-weight: bold;
margin-bottom: 2rem;
text-align: center;
`;

// Estilo del formulario usando flexbox para organizar los campos
const Form = styled.form`
display: flex;
flex-direction: column;
gap: 1.5rem;
`;

// Contenedor para cada grupo de campo del formulario
const FormGroup = styled.div`
display: flex;
flex-direction: column;
gap: 0.5rem;
`;

// Estilo para las etiquetas de los campos
const Label = styled.label`
font-family: 'Lato', sans-serif;
font-weight: bold;
color: #fff;
`;

// Estilo para los campos de entrada de texto
const Input = styled.input`
font-family: 'Lato', sans-serif;
padding: 0.75rem;
border: 2px solid #ffadad;
border-radius: 4px;
font-size: 1rem;

&:focus {
    outline: none;
    border-color: #4a90e2;
}
`;
// Estilo para el selector de categorías
const Select = styled.select`
font-family: 'Lato', sans-serif;
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

// Estilo para el área de texto de la descripción
const Textarea = styled.textarea`
font-family: 'Lato', sans-serif;
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

// Contenedor para los botones
const ButtonGroup = styled.div`
display: flex;
justify-content: center;
gap: 1rem;
margin-top: 1rem;
`;

// Estilo para los botones con variantes de color
const Button = styled.button`
font-family: 'Lato', sans-serif;
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

// Define diferentes colores según la variante del botón
background-color: ${props => {
    switch (props.$variant) {
    case 'save':
        return '#273E7B';
    case 'clear':
        return '#A3A3A3';
    default:
        return '#273E7B';
    }
}};
color: white;
`;

// Datos de las categorías disponibles
const categorias = [
{ nombre: "Phalaenopsis", color: "#FF9D23" },
{ nombre: "Cattleya", color: "#FF4E88" },
{ nombre: "Dendrobium", color: "#CB22D7" },
];

// Componente principal NuevoVideo
const NuevoVideo = () => {
// Estado para manejar los datos del formulario
const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    imagen: '',
    video: '',
    descripcion: ''
});

// Manejador de cambios en los campos del formulario
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
    ...prev,
    [name]: value
    }));
};

// Manejador del envío del formulario
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Envía los datos a la API
        const response = await fetch('http://localhost:3001/videos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Muestra mensaje de éxito y limpia el formulario
            alert('Video agregado con éxito');
            setFormData({
                titulo: '',
                categoria: '',
                imagen: '',
                video: '',
                descripcion: ''
            });

            // Notifica al componente padre si existe la función
            if (typeof onVideoAdded === 'function') {
                const newVideo = await response.json();
                onVideoAdded(newVideo); // Notifica a la página principal.
            }

            // Redirige a la página principal
            window.location.href = '/'; 
        } else {
            alert('Error al agregar el video');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al enviar el formulario');
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
};

// Renderizado del componente
return (
    <PageContainer>
    <Header />
    <MainContent>
        <FormContainer>
        <Title>Nuevo Video</Title>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
            <Label>Título:</Label>
            <Input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
            <Label>Categoría:</Label>
            <Select name="categoria" value={formData.categoria} onChange={handleChange} required>
                <option value="">Seleccione una categoría</option>
                {categorias.map((categoria, index) => (
                <option key={index} value={categoria.nombre}>{categoria.nombre}</option>
                ))}
            </Select>
            </FormGroup>
            <FormGroup>
            <Label>Imagen (URL):</Label>
            <Input type="text" name="imagen" value={formData.imagen} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
            <Label>Video (URL):</Label>
            <Input type="text" name='video' value={formData.video} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
            <Label>Descripción:</Label>
            <Textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required />
            </FormGroup>
            <ButtonGroup>
            <Button type="submit" $variant="save">Guardar</Button>
            <Button type="button" $variant="clear" onClick={handleClear}>Limpiar</Button>
            </ButtonGroup>
        </Form>
        </FormContainer>
    </MainContent>
    <Footer />
    </PageContainer>
);
};

export default NuevoVideo;
