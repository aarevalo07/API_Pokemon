const express = require("express");

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

// Routes
app.use('/api', require('./routes/index'));

app.listen(app.get("port"), () => {
    console.log(`Server on PORT ${app.get("port")}`);
});
