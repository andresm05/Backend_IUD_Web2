const Usuario = require("../models/usuario");
const { request, response } = require("express");
const {validationResult} = require('express-validator')

/**
 * Crear un usuario
 */

const createUser = async (req = request, res = response) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ err: errors.array()})
    }
    const nombre = req.body.nombre.toLowerCase();
    const email = req.body.email;
    const datos = {
      nombre,
      email,
    };
    const emailBd = await Usuario.findOne({ email });
    if (emailBd) {
      return res.status(400).json({ msg: "Ya existe el usuario" });
    }
    const usuario = new Usuario(datos);
    console.log(usuario);
    await usuario.save();
    res.status(201).json(req.body);
  } catch (e) {
    res.status(500).json({ msg: e });
  }
};

/**
 * Obtener todos los usuarios
 */
const getUsers = async (req = request, res = response) => {
  try {
    console.log(req.query);
    const estado = req.query.estado;
    let usuariosBD;
    if (estado) {
      const query = { estado: estado };
      usuariosBD = await Usuario.find(query);
    } else {
      usuariosBD = await Usuario.find();
    }

    return res.json(usuariosBD);
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

/**
 * Obtener un usuario por Id
 */

const getUserById = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const filter = { _id: id };
    const usuarioBD = await Usuario.findOne(filter);
    return res.json(usuarioBD);
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

/**
 *  Editar un usuario
 */

const updateUserById = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const buscarUser = await Usuario.findById(id);
    if (!buscarUser) {
      return res.status(404).json({ msj: "No existe el usuario" });
    }
    const data = req.body;
    console.log(data);
    console.log(id);
    data.fechaActualizacion = new Date();
    console.log(data);

    const usuarioBD = await Usuario.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res.json(usuarioBD);
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

/**
 * Eliminar un usuario
 */

const deleteUserById = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const usuarioBD = await Usuario.findById(id);
    if (!usuarioBD) {
      return res.status(404).json({ msj: "No existe el usuario" });
    }
    await Usuario.findByIdAndDelete(id);
    return res.status(204).json({});
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
