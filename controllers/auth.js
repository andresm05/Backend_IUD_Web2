const UsuarioAuth = require("../models/usuario");
const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

/*
Registra un Usuario
*/

const register = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    const usuarioAuthBD = await UsuarioAuth.findOne({ email });
    if (usuarioAuthBD) {
      return res.status(400).json({
        msg: "ya existe este usuario",
      });
    }
    const usuarioAuth = new UsuarioAuth(req.body);
    const salt = await bcryptjs.genSalt();
    const passencrypted = await bcryptjs.hashSync(password, salt);
    usuarioAuth.password = passencrypted;
    const usuarioAuthSaved = await usuarioAuth.save();
    return res.status(201).json(usuarioAuthSaved);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: e,
    });
  }
};

/*
 *Login de Usuario
 */

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    const usuarioAuth = await UsuarioAuth.findOne({ email });
    if (!usuarioAuth) {
      return res.status(404).json({
        msg: "No existe el Usuario",
      });
    }

    if (!usuarioAuth.estado) {
      return res.status(404).json({
        msg: "Usuario Inactivo",
      });
    }

    const isPassword = bcryptjs.compareSync(password, usuarioAuth.password);

    if (!isPassword) {
      return res.status(404).json({
        msg: "Usuario o contraseña incorrecta",
      });
    }

    const payload = {
      usuario: usuarioAuth.email,
      nombre: usuarioAuth.nombre,
      rol: usuarioAuth.rol,
    };

    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.json({
      usuarioAuth,
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: e,
    });
  }
};

module.exports = {register, login}
