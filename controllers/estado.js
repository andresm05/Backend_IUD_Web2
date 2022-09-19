const Estado = require("../models/estado");
const { request, response } = require("express");

/**
 * Crea un tipo de Equipo
 */
 const createEstado = async (req = request, res = response) => {
    const nombre = req.body.nombre.toLowerCase();
    const estadoRes = req.body.estado;
    const datos = {
      nombre,
      estado: estadoRes
    };
    const estadoBd = await Estado.findOne({ nombre });
    if (estadoBd) {
      return res.status(400).json({ msg: "Ya existe nombre" });
    }
    const estado = new Estado(datos);
    console.log(estado);
    await estado.save();
    res.status(201).json(req.body);
  };

  /**
 * Obtener todos los tipos de Equipo
 */
const getEstados = () => {};

/**
 * Obtener un equipo por Id
 */

const getEstadoById = () => {};

/**
 *  Editar un tipo de equipo
 */

const updateEstadoById = () => {};

/**
 * Eliminar un tipo de Equipo
 */

const deleteEstadoById = () => {};

module.exports = {
  createEstado,
  getEstados,
  getEstadoById,
  updateEstadoById,
  deleteEstadoById,
};