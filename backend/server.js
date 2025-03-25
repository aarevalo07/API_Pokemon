const express = require("express");
const initDB = require("../config/db");
const cors = require("cors");

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Habilitar CORS
app.use(
    cors({
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);

// Middlewares
app.use(express.json());

// Routes
app.use("/api", require("./routes/index"));

app.listen(app.get("port"), () => {
    console.log(`Server on PORT ${app.get("port")}`);
});

initDB()