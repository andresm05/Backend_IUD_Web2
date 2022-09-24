const TipoEquipo = require("../models/tipoEquipo");
const { request, response } = require("express");

/**
 * Crear un tipo de Equipo
 */
const createEquipo = async (req = request, res = response) => {
  try {
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
  } catch (e) {
    res.status(500).json({ msg: e });
  }
};

/**
 * Obtener todos los tipos de Equipo
 */
const getEquipos = async (req = request, res = response) => {
  try {
    console.log(req.query);
    const estado = req.query.estado;
    let tipoEquiposBD;
    if (estado) {
      const query = { estado: estado };
      tipoEquiposBD = await TipoEquipo.find(query);
    } else {
      tipoEquiposBD = await TipoEquipo.find();
    }
    return res.json(tipoEquiposBD);
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};
/**
 * Obtener un equipo por Id
 */

const getEquipoById = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const filter = { _id: id };
    const tipoEquipoDB = await TipoEquipo.findOne(filter);
    return res.json(tipoEquipoDB);
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

/**
 *  Editar un tipo de equipo
 */

const updateEquipoById = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const buscarTipoEquipo = await TipoEquipo.findById(id);
    if (!buscarTipoEquipo) {
      return res.status(404).json({ msj: "No existe el tipo de equipo" });
    }
    const data = req.body;
    console.log(data);
    console.log(id);
    data.fechaActualizacion = new Date();
    console.log(data);
    const tipoEquipoDB = await TipoEquipo.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res.json(tipoEquipoDB);
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

/**
 * Eliminar un tipo de Equipo
 */

const deleteEquipoById = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const tipoEquipoDB = await TipoEquipo.findById(id);
    if (!tipoEquipoDB) {
      return res.status(404).json({ msj: "No existe el tipo de equipo" });
    }
    await TipoEquipo.findByIdAndDelete(id);
    return res.status(204).json({});
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

module.exports = {
  createEquipo,
  getEquipos,
  getEquipoById,
  updateEquipoById,
  deleteEquipoById,
};
