const { Router } = require("express");
const router = Router();
const _ = require("underscore");
const fs = require("fs")

const datosPokemon = require("../pokemon.json");

router.get("/", (req, res) => {
    res.send("Hola mundo desde la API para consultar Pokemon");
});

// Agregar Pokemon
router.post("/pokemon/agregar", (req, res) => {
    const { id, name, types, sprite } = req.body;

    if (id && name && types && sprite) {
        const nuevoPokemon = req.body;

        leerJSON = JSON.parse(fs.readFileSync('backend/pokemon.json'));
        leerJSON.pokemon.push(nuevoPokemon);
        fs.writeFileSync("backend/pokemon.json", JSON.stringify(leerJSON, null, 2));

        res.json({ message: 'Pokémon agregado correctamente', pokemon: nuevoPokemon });
    } else {
        res.status(500).json({ error: "Datos incompletos" });
    }
});

// Eliminar Pokemon
router.delete("/pokemon/delete/:nombre", (req, res) => {
    const nombre = req.params.nombre.toLowerCase();
    const index = datosPokemon.pokemon.findIndex(
        (poke) => poke.name.toLowerCase() === nombre
    );

    if (index !== -1) {
        datosPokemon.pokemon.splice(index, 1);
        res.send(`Pokémon ${nombre} eliminado correctamente`);
    } else {
        res.status(404).json({ error: "No se encontró el pokemon" });
    }
});

//Actualizar Pokemon
router.put("/pokemon/update/:nombre", (req, res) => {
    const nombre = req.params.nombre.toLowerCase();
    const { id, name, types, sprite } = req.body;

    if (id && name && types && sprite) {
        const pokemon = datosPokemon.pokemon.find(
            (poke) => poke.name.toLowerCase() === nombre
        );

        if (pokemon) {
            pokemon.id = id;
            pokemon.name = name;
            pokemon.types = types;
            pokemon.sprite = sprite;
            res.json(datosPokemon);
        } else {
            res.status(404).json({ error: "No se encontró el pokemon" });
        }


    } else {
        res.status(500).json({ error: "Datos incompletos" });
    }
});

// Mostrar todos los Pokemones en formato JSON
router.get("/pokemon", (req, res) => {
    res.json(datosPokemon);
});

// Mostrar Pokemon especifico
router.get("/pokemon/:nombre", (req, res) => {
    const nombre = req.params.nombre.toLowerCase();
    const pokemon = datosPokemon.pokemon.find(
        (poke) => poke.name.toLowerCase() === nombre
    );

    if (pokemon) {
        res.json(pokemon);
    } else {
        res.status(404).json({ error: "No se encontró el pokemon" });
    }
});

module.exports = router;
