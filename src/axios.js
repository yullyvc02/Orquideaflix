// Importación de axios para realizar peticiones HTTP
import axios from "axios";

// URL base de la API donde se encuentran los datos de los videos
const API_URL = "http://localhost:3001/videos"; 

// Función para normalizar los datos recibidos de la API
// Asegura un formato consistente independientemente de las variaciones en los nombres de las propiedades
const normalizeData = (data) => {
    return data.map((item) => ({
        id: item.id, // ID del item
        titulo: item.titulo || item.titulo, // Título
        categoria: (item.categoria || item.category).toLowerCase().trim(), // Categoria, normalizada a minúsculas y sin espacios
        imagen: (item.imagen || item.image).trim(), // URL de la imagen, eliminando espacios
        video: item.video || item.videoUrl, // URL del video
        descripcion: item.descripcion || item.description, // Descripción del video
    }));
};

// Función asíncrona para obtener y categorizar los datos de orquídeas
export const fetchOrchids = async () => {
    try {
        // Realiza la petición GET a la API
        const response = await axios.get(API_URL);
// Verifica que la respuesta sea un array
        if (!Array.isArray(response.data)) {
            throw new Error('La respuesta no es un array');
        }
// Normaliza los datos recibidos
        const normalizedData = normalizeData(response.data);
// Organiza las orquídeas por categorías
        const categorizedOrchids = {
            // Filtra las orquídreas por cada categoría específica
            phalaenopsis: normalizedData.filter(orchid => orchid.categoria === "phalaenopsis"),
            cattleya: normalizedData.filter(orchid => orchid.categoria === "cattleya"),
            dendrobium: normalizedData.filter(orchid => orchid.categoria === "dendrobium"),
        };

        return categorizedOrchids;
    } catch (error) {
        // Manejo de errores: registra el error y devuelve un objeto con arrays vacios
        console.error('Error en fetchOrchids:', error);
        return {
            phalaenopsis: [],
            cattleya: [],
            dendrobium: []
        };
    }
};


