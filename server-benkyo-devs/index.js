const express = require("express");

const app = express();

app.listen(4000, () => {
	console.log("Servidor iniciado en el puerto 4000");
});

app.get("/", (req, res) => {
	res.send("¡Hola mundo!");
});
