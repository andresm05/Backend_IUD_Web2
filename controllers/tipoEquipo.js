const TipoEquipo = require("../models/tipoEquipo");
const { request, response } = require("express");

/**
 * Crea un tipo de Equipo
 */
const createEquipo = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const datos = {
    nombre,
  };
  const tipoEquipoBD = await TipoEquipo.findOne({ nombre });
  if (tipoEquipoBD) {
    return res.status(400).json({ msg: "Ya existe nombre" });
  }
  const tipoEquipo = new TipoEquipo(datos);
  console.log(tipoEquipo);
  await tipoEquipo.save();
  res.status(201).json(req.body);
};

/**
 * Obtener todos los tipos de Equipo
 */
const getEquipos = () => {};

/**
 * Obtener un equipo por Id
 */

const getEquipoById = () => {};

/**
 *  Editar un tipo de equipo
 */

const updateEquipoById = () => {};

/**
 * Eliminar un tipo de Equipo
 */

const deleteEquipoById = () => {};

module.exports = {
  createEquipo,
  getEquipos,
  getEquipoById,
  updateEquipoById,
  deleteEquipoById,
};
