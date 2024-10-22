const API_URL = 'https://kvnsc.es/controllers/directores.php';
const errorElement = document.getElementById('createError');

function limpiarHTML(str) {
    return str.replace(/[^\w.@-]/gi, function (e) {
        return '&#' + e.charCodeAt(0) + ';';
    });
}

function validarNombre(nombre) {
    return nombre.length >= 2 && nombre.length <= 50;
}

function validarApellido(apellido) {
    return apellido.length >= 2 && apellido.length <= 50;
}

function validarBio(biografia) {
    return biografia.length >= 2;
}

function getDirectores() {
    fetch(API_URL)
        .then(response => response.json())
        .then(directores => {
            const tableBody = document.querySelector('#dirTable tbody');
            tableBody.innerHTML = '';
            directores.forEach(dir => {
                const sanitizedNombre = limpiarHTML(dir.nombre);
                const sanitizedApellido = limpiarHTML(dir.apellido);
                const sanitizedBio = limpiarHTML(dir.biografia);
                const fecha=limpiarHTML(dir.f_nacimiento)

                tableBody.innerHTML += `
                    <tr data-id="${dir.id}">
                        <td>
                            ${dir.id}
                        </td>
                        <td>
                            <span class="listado">${sanitizedNombre}</span>
                            <input class="edicion" type="text" value="${sanitizedNombre}">
                        </td>
                        <td>
                            <span class="listado">${sanitizedApellido}</span>
                            <input class="edicion" type="email" value="${sanitizedApellido}">
                        </td>
                        <td>
                            <span class="listado">${fecha}</span>
                            <input class="edicion" type="date">
                        </td>
                        <td>
                            <span class="listado">${sanitizedBio}</span>
                            <textarea rows="5" class="edicion">${sanitizedBio}</textarea>
                        </td>
                        <td class="td-btn">
                            <button class="listado" onclick="editMode(${dir.id})">Editar</button>
                            <button class="listado" onclick="deleteDir(${dir.id})">Eliminar</button>
                            <button class="edicion" onclick="updateDir(${dir.id})">Guardar</button>
                            <button class="edicion" onclick="cancelDir(${dir.id})">Cancelar</button>
                        </td>
                    </tr>
                `                
            });
        })
        .catch(error => console.log('Error:', error));
}


function createDirector(event) {
    event.preventDefault();
    const nombre = document.getElementById('createDirector').value.trim()
    const apellido = document.getElementById('createApellido').value.trim()
    const fecha = document.getElementById('createFecha').value;
    const bio = document.getElementById('createBiografia').value.trim();

    if(!validarNombre(nombre)){
        errorElement.textContent = 'El nombre debe tener entre 2 y 50 caracteres.';
        return;
    }

    if(!validarApellido(apellido)){
        errorElement.textContent = 'El apellido debe tener entre 2 y 50 caracteres.';
        return;
    }

    // if(!validarBio(bio)){
    //     errorElement.textContent = 'La biografía debe tener más de 2 caracteres';
    //     return;
    // }

    errorElement.textContent = '';
    console.log(bio)
    console.log(fecha)

    fetch(`${API_URL}?metodo=nuevo`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({nombre,apellido,f_nacimiento: fecha,biografia:bio})
    })
    .then(response=>response.json())
    .then(result => {
        console.log('Director creado',result)
        getDirectores()
        event.target.reset();
    })
    .catch(error=>{
        console.error('Error: ',JSON.stringify(error))
    })    
}

function updateDir(id){
    const row = document.querySelector(`tr[data-id="${id}"]`);
    const newNombre = row.querySelector(`td:nth-child(2) input`).value.trim();
    const newApellido = row.querySelector(`td:nth-child(3) input`).value.trim();
    const newFecha = row.querySelector(`td:nth-child(4) input`).value;
    const newBio = row.querySelector(`td:nth-child(5) textarea`).value;

    console.log(row.querySelector(`td:nth-child(4) input`).value)
    console.log('Fecha enviada:', newFecha);
    

    if(!validarNombre(newNombre)){
        errorElement.textContent = 'El nombre debe tener entre 2 y 50 caracteres.';
        return;
    }

    if(!validarApellido(newApellido)){
        errorElement.textContent = 'El apellido debe tener entre 2 y 50 caracteres.';
        return;
    }

    if(!validarBio(newBio)){
        errorElement.textContent = 'La biografía debe tener más de 2 caracteres';
        return;
    }

    fetch(`${API_URL}?id=${id}&metodo=actualizar`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({nombre: newNombre, apellido: newApellido, f_nacimiento: newFecha, biografia:newBio})
    })
    .then(response=>response.json())
    .then(result => {
        console.log('Director actualizado',result)
        getDirectores();
    })
    .catch(error=>{
        alert('Error al actualizar el director')
    })

}

function deleteDir(id){
    if(confirm('¿Estás seguro de que quieres eliminar este director?')){
        fetch(`${API_URL}?id=${id}&metodo=eliminar`, {
             method: 'POST',
        })
        .then(response => response.json())
        .then(result => {
             console.log('Director eliminado: ', result);
             getDirectores();
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

function mostrarErrores(errores){
    arrayErrores = Object.values(errores);
    errorElement.innerHTML = '<ul>';
    arrayErrores.forEach(error => {
        return errorElement.innerHTML += `<li>${error}</li>`;
    });
    errorElement.innerHTML += '</ul>';
}


document.getElementById('createForm').addEventListener('submit', createDirector);
getDirectores();