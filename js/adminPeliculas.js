const API_URL = 'https://kvnsc.es/controllers/peliculas.php';
const API_DIRECTORES ='https://kvnsc.es/controllers/directores.php';

const errorElement = document.getElementById('createError');

function limpiarHTML(str) {
    return str.replace(/[^\w.@-]/gi, function (e) {
        return '&#' + e.charCodeAt(0) + ';';
    });
}

function validarNombre(nombre) {
    return nombre.length >= 2 && nombre.length <= 30;
}

function validarPrecio(precio){
    return precio>0;
}

// Función para cargar directores y poblar el select
async function cargarDirectores(select) {
    try {
        const response = await fetch(API_DIRECTORES);
        const directores = await response.json(); // Suponiendo que la API devuelve JSON
        
        const selectDirector = document.getElementById(select);
        selectDirector.innerHTML = ''; // Limpiar opciones previas

        directores.forEach(director => {
            const option = document.createElement('option');
            option.value = director.id;  // El id del director como valor
            option.textContent = director.nombre + ' ' + director.apellido;  // El nombre del director como texto
            selectDirector.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar directores:', error);
        errorElement.textContent = 'Hubo un error al cargar los directores.';
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

const pelTableBody = document.querySelector('#pelTable tbody');

// Función para cargar las películas y rellenar la tabla
async function cargarPeliculas() {
    try {
        await getDirectores(); // Asegurarse de que los directores estén cargados antes

        const response = await fetch(API_URL);
        const peliculas = await response.json();
        
        pelTableBody.innerHTML = ''; // Limpiar la tabla antes de rellenarla

        peliculas.forEach(pelicula => {
            const sanitizedNombre = limpiarHTML(pelicula.titulo);
            const sanitizedPrecio = limpiarHTML(pelicula.precio);
            const nombreDirector = directoresMap[pelicula.id_director];

            // Creamos la fila para la tabla
            const row = document.createElement('tr');
            row.dataset.id = pelicula.id;

            row.innerHTML = `
                <td>${pelicula.id}</td>
                <td>
                    <span class="listado">${sanitizedNombre}</span>
                    <input class="edicion" type="text" value="${sanitizedNombre}" style="display:none;">
                </td>
                <td>
                    <span class="listado">${sanitizedPrecio}</span>
                    <input class="edicion" type="email" value="${sanitizedPrecio}" style="display:none;">
                </td>
                <td>
                    <span class="listado">${nombreDirector}</span>
                    <select name="directores" class="edicion"></select>
                </td>
                <td class="td-btn">
                    <button class="listado" onclick="editMode(${pelicula.id})">Editar</button>
                    <button class="listado" onclick="deletePel(${pelicula.id})">Eliminar</button>
                    <button class="edicion" onclick="updatePel(${pelicula.id})" style="display:none;">Guardar</button>
                    <button class="edicion" onclick="cancelEdit(${pelicula.id})" style="display:none;">Cancelar</button>
                </td>
            `;

            pelTableBody.appendChild(row);

            // Después de que el <select> ha sido creado, cargamos los directores en él
            const selectElement = row.querySelector('select');
            cargarDirectoresSelect(selectElement, pelicula.id_director);
        });
    } catch (error) {
        console.error('Error al cargar las películas:', error);
    }
}

// Nueva función que recibe un elemento <select> y lo llena con los directores
async function cargarDirectoresSelect(selectElement, idDirectorSeleccionado) {
    try {
        const response = await fetch(API_DIRECTORES);
        const directores = await response.json();

        selectElement.innerHTML = ''; // Limpiar opciones previas

        directores.forEach(director => {
            const option = document.createElement('option');
            option.value = director.id; // El id del director como valor
            option.textContent = director.nombre + ' ' + director.apellido; // El nombre del director como texto

            // Seleccionamos la opción correcta si el id coincide
            if (director.id === idDirectorSeleccionado) {
                option.selected = true;
            }

            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar directores:', error);
    }
}

function createPelicula(event){
    event.preventDefault();
    const newtitulo = document.getElementById('createPelicula').value.trim();
    const newprecio = document.getElementById('createPrecio').value.trim();
    const newdirector = document.getElementById('selectDirector').value;

    if(!validarNombre(newtitulo)){
        errorElement.textContent='El titulo debe contener entre 2 y 30 caracteres'
        return;
    }

    if(!validarPrecio(newprecio)){
        errorElement.textContent='El precio no puede ser negativo';
        return;
    }

    // errorElement.textContent = '';
    fetch(`${API_URL}?metodo=nuevo`,{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({titulo:newtitulo, precio:newprecio, id_director:newdirector})
    })
    .then(response=>response.json())
    .then(result =>{
        console.log("pelicula creada: ",result)
        cargarPeliculas()
        event.target.reset();
    })
    .catch(error=>{
        console.error("Error: ",JSON.stringify(error))
    })
}

function updatePel(id){
    const row = document.querySelector(`tr[data-id="${id}"]`);
    const newTitulo = row.querySelector(`td:nth-child(2) input`).value.trim();
    const newPrecio = row.querySelector(`td:nth-child(3) input`).value.trim();
    const newDir = row.querySelector(`td:nth-child(4) select`).value;

    if(!validarNombre(newTitulo)){
        errorElement.textContent='El titulo debe contener entre 2 y 30 caracteres'
        return;
    }

    if(!validarPrecio(newPrecio)){
        errorElement.textContent='El precio no puede ser negativo';
        return;
    }

    fetch(`${API_URL}?id=${id}&metodo=actualizar`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({titulo:newTitulo, precio:newPrecio, id_director:newDir})
    })
    .then(response=>response.json())
    .then(result => {
        console.log('Pelicula actualizada',result)
        cargarPeliculas();
    })
    .catch(error=>{
        console.error("Error: ",JSON.stringify(error))
    })
}

function deletePel(id){
    if(confirm('¿Estás seguro de que quieres eliminar esta película?')){
        fetch(`${API_URL}?id=${id}&metodo=eliminar`, {
             method: 'POST',
        })
        .then(response => response.json())
        .then(result => {
             console.log('Pelicula eliminada: ', result);
             cargarPeliculas();
        })
        .catch(error => console.error('Error: ', error));
     }

}

function editMode(id){
    const row = document.querySelector(`tr[data-id="${id}"]`);
    row.querySelectorAll('.edicion').forEach(ro => {
        ro.style.display = 'inline-block';
    })
    row.querySelectorAll('.listado').forEach(ro => {
        ro.style.display = 'none';
    })
}
function cancelEdit(id){
    const row = document.querySelector(`tr[data-id="${id}"]`);
    row.querySelectorAll('.edicion').forEach(ro => {
        ro.style.display = 'none';
    })
    row.querySelectorAll('.listado').forEach(ro => {
        ro.style.display = 'inline-block';
    })
}

// Llamar la función para cargar las películas cuando se cargue la página
document.addEventListener('DOMContentLoaded', cargarPeliculas);

// Llamar la función para cargar los directores cuando se cargue la página
document.addEventListener('DOMContentLoaded', cargarDirectores('selectDirector'));
document.getElementById('createForm').addEventListener('submit', createPelicula);