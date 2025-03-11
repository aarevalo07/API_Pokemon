const express = require("express");
const fs = require('fs')
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Habilitar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// Middlewares
app.use(express.json());

const datosPokemon = JSON.parse(fs.readFileSync('backend/pokemon.json', 'utf-8'))

// Routes
app.get('/', (req, res) => {
    res.send('Hola mundo desde la API para consultar Pokemon');
});


app.get('/pokemon/:nombre', (req, res) => {
    const nombre = req.params.nombre.toLowerCase();
    const pokemon = datosPokemon.pokemon.find(p => p.name.toLowerCase() === nombre);

    if (pokemon) {
        res.json(pokemon)
    } else {
        res.status(404).json({ error: "No se encontró el pokemon" })
    }
});

app.listen(app.get("port"), () => {
    console.log(`Server on PORT ${app.get("port")}`);
});
