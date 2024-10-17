// URL de tu API
const API_URL = 'http://localhost/08-php-api-admin/controllers/peliculas.php';
const API_DIRECTORES ='http://localhost/08-php-api-admin/controllers/directores.php';

// Función para cargar las películas desde la API
async function cargarPeliculas() {
    try {
        const response = await fetch(API_URL);
        const peliculas = await response.json();
        const container = document.getElementById('movieContainer');

        peliculas.forEach(pelicula => {
            const movieElement = crearElementoPelicula(pelicula);
            container.appendChild(movieElement);
        });
    } catch (error) {
        console.error('Error al cargar las películas:', error);
    }
}

let directoresMap = {}; // Objeto para mapear directores por ID

// Función para cargar directores y crear un mapa de directores por ID
async function getDirectores() {
    try {
        const response = await fetch(API_DIRECTORES);
        const directores = await response.json();

        // Crear un mapa de directores con id como clave y nombre como valor
        directores.forEach(director => {
            directoresMap[director.id] = director.nombre +' '+ director.apellido; 
        });
    } catch (error) {
        console.error('Error al cargar directores:', error);
    }
}

// Función para crear el elemento HTML de cada película
function crearElementoPelicula(pelicula) {
    const moviePoster = document.createElement('div');
    moviePoster.className = 'movie-poster';

    moviePoster.innerHTML = `
        <img src="${pelicula.url}" alt="${pelicula.titulo}">
        <div class="movie-info">
            <h2 class="movie-title">${pelicula.titulo}</h2>
            <p class="movie-director">Director: ${directoresMap[pelicula.id_director]}</p>
            <p class="movie-price">Precio: $${pelicula.precio}</p>
        </div>
        <span class="now-showing">${pelicula.precio}€</span>
    `;

    return moviePoster;
}

// Cargar las películas cuando se cargue la página
window.addEventListener('load', async () => {
    await getDirectores(); // Cargar los directores antes de cargar las películas
    cargarPeliculas(); // Luego cargar las películas
});