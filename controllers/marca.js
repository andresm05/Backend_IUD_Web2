const Marca = require('../models/marca')
const { request, response } = require("express");

/**
 * Crea una marca
 */
 const createMarca = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const datos = {
      nombre
    };
    const marcaBd = await Marca.findOne({ nombre });
    if (marcaBd) {
      return res.status(400).json({ msg: "Ya existe la marca" });
    }
    const marca = new Marca(datos);
    console.log(marca);
    await marca.save();
    res.status(201).json(req.body);
  };

 /**
 * Obtener todas las marcas
 */
const getMarcas = () => {};

/**
 * Obtener una marca por Id
 */

const getMarcaById = () => {};

/**
 *  Editar una marca por id
 */

const updateMarcaById = () => {};

/**
 * Eliminar una marca por id
 */

const deleteMarcaById = () => {};

module.exports = {
  createMarca,
  getMarcas,
  getMarcaById,
  updateMarcaById,
  deleteMarcaById,
};