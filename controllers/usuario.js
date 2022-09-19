const Usuario = require("../models/usuario");
const { request, response } = require("express");

/**
 * Crea un usuario
 */

const createUser = async (req = request, res = response) => {
    const nombre = req.body.nombre.toLowerCase();
    const email = req.body.email;
    const datos = {
      nombre,
      email
    };
    const emailBd = await Usuario.findOne({ email });
    if (emailBd) {
      return res.status(400).json({ msg: "Ya existe el usuario" });
    }
    const usuario = new Usuario(datos);
    console.log(usuario);
    await usuario.save();
    res.status(201).json(req.body);
  };

  
  /**
 * Obtener todos los usuarios
 */
const getUsers = () => {};

/**
 * Obtener un usuario por Id
 */

const getUserById = () => {};

/**
 *  Editar un usuario
 */

const updateUserById = () => {};

/**
 * Eliminar un usuario
 */

const deleteUserById = () => {};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};