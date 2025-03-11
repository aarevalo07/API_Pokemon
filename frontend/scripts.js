// Escuchar el evento click del botón "Buscar Pokemon"
document.getElementById('buscar').addEventListener('click', function () {
    const nombrePokemon = document.getElementById('entrada').value.trim().toLowerCase();
    if (nombrePokemon) {
        buscarPokemon(nombrePokemon); // Llama a la función para buscar el Pokémon
    } else {
        alert('Por favor, ingresa el nombre de un Pokémon.');
    }
});

// Función para buscar un Pokémon por nombre
async function buscarPokemon(nombre) {
    try {
        // Ruta relativa al archivo JSON (desde la carpeta frontend)
        const respuesta = await fetch(`http://localhost:3000/pokemon/${nombre}`);
        if (!respuesta.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        }
        const datos = await respuesta.json();


        if (datos.error) {
            document.getElementById('nombre_pokemon').textContent = datos.error;
        } else {
            // Mostrar el nombre del Pokémon
            document.getElementById('nombre_pokemon').textContent = datos.name.toUpperCase();

            // Mostrar el id del pokemon
            document.getElementById('id_pokemon').textContent = `ID: ${datos.id}`;

            // Mostrar la imagen del Pokémon
            const imagenPokemon = document.getElementById('imagen_pokemon');
            imagenPokemon.src = datos.sprite;
            imagenPokemon.alt = datos.name;

            // Mostrar los tipos del Pokémon
            const tipoPokemon = document.getElementById('tipos');
            
            //Limpiar el contenido
            tipoPokemon.innerHTML = '';

            datos.types.forEach(tipo => {
                const tipo_texto = document.createElement('div');
                tipo_texto.textContent = tipo.toUpperCase();
                tipo_texto.classList.add(`tipo-${tipo.toLowerCase()}`)
                tipoPokemon.appendChild(tipo_texto)
            });
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al cargar los datos.');
    }
}