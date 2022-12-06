const express = require("express");

const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");

const tipoEquipo = require("./routes/tipoEquipo");
const estadoEquipo = require("./routes/estado");
const usuario = require("./routes/usuario");
const marca = require("./routes/marca");
const inventario = require("./routes/inventario");
const auth = require("./routes/auth")
/**
 * Middleware
 */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cors());

app.use("/api/tipoequipos", tipoEquipo);
app.use("/api/estadoEquipos", estadoEquipo);
app.use("/api/usuarios", usuario);
app.use("/api/marcas", marca);
app.use("/api/inventarios", inventario);

//AUTENTICACIÓN Y AUTORIZACIÓN
app.use("/api/auth", auth)

app.get("*", (req, res) => {
  return res.status(404).json({
    msj: "pagina no encontrada",
  });
});

module.exports = app;
