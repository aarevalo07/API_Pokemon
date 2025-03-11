// Escuchar el evento click del botón "Buscar Pokemon"
document.getElementById("buscar").addEventListener("click", function () {
    try{
        const idPokemon = parseInt(document
            .getElementById("entrada")
            .value.trim());
        const nombrePokemon = document
            .getElementById("entrada")
            .value.trim()
            .toLowerCase();
        if (idPokemon) {
            buscarPokemonId(idPokemon); // Llama a la función para buscar el Pokémon
        } else if (nombrePokemon) {
            buscarPokemon(nombrePokemon); // Llama a la función para buscar el Pokémon
        } else {
            alert("Por favor, ingresa el nombre o id de un Pokémon.");
        }
    } catch (error) {
        alert("Hubo un error al cargar los datos.");
    }
});

async function agregarPokemon() {
    const nombre = document.getElementById("nombre").value.trim().toLowerCase();

    const id = document.getElementById("id").value;

    const types = document
        .getElementById("tipo1")
        .value.split(",")
        .map((tipo) => tipo.trim());

    const sprite = document.getElementById("imagen").value;

    // Crea un objeto con los datos
    const datosPokemon = {
        id: parseInt(id),
        name: nombre,
        types: types,
        sprite: sprite,
    };

    const pokemonJSON = JSON.stringify(datosPokemon);

    console.log(pokemonJSON);

    // Envía los datos al servidor
    fetch("http://localhost:3000/api/pokemon/agregar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: pokemonJSON,
    });
    res.json({ message: 'Pokémon agregado correctamente' });
}

async function eliminarPokemon() {
    const nombre = document.getElementById('entrada').value.trim().toLowerCase();

    fetch(`http://localhost:3000/api/pokemon/delete/${nombre}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
          },
    });
    res.send('pokemon borrado');
}

async function updatePokemon() {
    const nombreViejo = document.getElementById("entrada").value.trim().toLowerCase();
    const nombre = document.getElementById("nombre").value.trim().toLowerCase();

    const id = document.getElementById("id").value;

    const types = document
        .getElementById("tipo1")
        .value.split(",")
        .map((tipo) => tipo.trim());

    const sprite = document.getElementById("imagen").value;

    const datosPokemon = {
        id: parseInt(id),
        name: nombre,
        types: types,
        sprite: sprite,
    };

    const pokemonJSON = JSON.stringify(datosPokemon);

    fetch(`http://localhost:3000/api/pokemon/update/${nombreViejo}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: pokemonJSON,
    });
}

// Función para buscar un Pokémon por nombre
async function buscarPokemon(nombre) {
    try {
        // Ruta relativa al archivo JSON (desde la carpeta frontend)
        const respuesta = await fetch(
            `http://localhost:3000/api/pokemon/${nombre}`
        );
        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo JSON");
        }
        const datos = await respuesta.json();

        if (datos.error) {
            document.getElementById("nombre_pokemon").textContent = datos.error;
        } else {
            // Mostrar el nombre del Pokémon
            document.getElementById("nombre_pokemon").textContent =
                datos.name.toUpperCase();

            // Mostrar el id del pokemon
            document.getElementById(
                "id_pokemon"
            ).textContent = `ID: ${datos.id}`;

            // Mostrar la imagen del Pokémon
            const imagenPokemon = document.getElementById("imagen_pokemon");
            imagenPokemon.src = datos.sprite;
            imagenPokemon.alt = datos.name;

            // Mostrar los tipos del Pokémon
            const tipoPokemon = document.getElementById("tipos");

            //Limpiar el contenido
            tipoPokemon.innerHTML = "";

            datos.types.forEach((tipo) => {
                const tipo_texto = document.createElement("div");
                tipo_texto.textContent = tipo.toUpperCase();
                tipo_texto.classList.add(`tipo-${tipo.toLowerCase()}`);
                tipoPokemon.appendChild(tipo_texto);
            });
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un error al cargar los datos.");
    }
}

async function buscarPokemonId(id) {
    try {
        // Ruta relativa al archivo JSON (desde la carpeta frontend)
        const respuesta = await fetch(
            `http://localhost:3000/api/pokemon/id/${id}`
        );
        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo JSON");
        }
        const datos = await respuesta.json();
        
        if (datos.error) {
            document.getElementById("nombre_pokemon").textContent = datos.error;
        } else {
            // Mostrar el nombre del Pokémon
            document.getElementById("nombre_pokemon").textContent =
                datos.name.toUpperCase();

            // Mostrar el id del pokemon
            document.getElementById(
                "id_pokemon"
            ).textContent = `ID: ${datos.id}`;

            // Mostrar la imagen del Pokémon
            const imagenPokemon = document.getElementById("imagen_pokemon");
            imagenPokemon.src = datos.sprite;
            imagenPokemon.alt = datos.name;

            // Mostrar los tipos del Pokémon
            const tipoPokemon = document.getElementById("tipos");

            //Limpiar el contenido
            tipoPokemon.innerHTML = "";

            datos.types.forEach((tipo) => {
                const tipo_texto = document.createElement("div");
                tipo_texto.textContent = tipo.toUpperCase();
                tipo_texto.classList.add(`tipo-${tipo.toLowerCase()}`);
                tipoPokemon.appendChild(tipo_texto);
            });
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un error al cargar los datos.");
    }
}
