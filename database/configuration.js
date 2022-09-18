const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const stringConexion = process.env.DATABASE_URL;

const mongoConn = () => {
  try {
    mongoose.connect(stringConexion, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión exitosa!");
  } catch (e) {
    console.log("Error de conexión", e);
    throw new Error("Error de conexión");
  }
};

module.exports = { mongoConn };
