const Estado = require("../models/estado");
const { request, response } = require("express");

/**
 * Crear un estado
 */
const createEstado = async (req = request, res = response) => {
  try {
    if (
      Object.keys(req.body).includes("nombre")
    ) {
      const nombre = req.body.nombre.toUpperCase();
      const datos = {
        nombre,
      };
      const estadoBd = await Estado.findOne({ nombre });
      if (estadoBd) {
        return res.status(400).json({ msg: "Ya existe el estado" });
      }
      const estado = new Estado(datos);
      console.log(estado);
      await estado.save();
      res.status(201).json(req.body);
    } else {
      return res.status(400).json({ msg: "Faltan parámetros" });
    }
  } catch (e) {
    res.status(500).json({ msg: e });
  }
};

/**
 * Obtener todos los estados
 */
const getEstados = async (req = request, res = response) => {
  try {
    console.log(req.query);
    const estado = req.query.estado;
    let estadoBD;
    if (estado) {
      const query = { estado: estado };
      estadoBD = await Estado.find(query);
    } else {
      estadoBD = await Estado.find();
    }

    return res.status(200).json(estadoBD);
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

/**
 * Obtener un estado por Id
 */

const getEstadoById = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const filter = { _id: id };
    const estadoBD = await Estado.findOne(filter);
    return res.status(200).json(estadoBD);
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

/**
 *  Editar un estado
 */

const updateEstadoById = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const buscarEstado = await Estado.findById(id);
    if (!buscarEstado) {
      return res.status(404).json({ msj: "No existe el estado" });
    }
    const data = req.body;
    console.log(data);
    console.log(id);
    data.fechaActualizacion = new Date();
    data.nombre = data.nombre.toUpperCase();
    console.log(data);
    const estadoBD = await Estado.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res.json(estadoBD);
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

/**
 * Eliminar un tipo de Equipo
 */

const deleteEstadoById = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const estadoBD = await Estado.findById(id);
    if (!estadoBD) {
      return res.status(404).json({ msj: "No existe el estado" });
    }
    await Estado.findByIdAndDelete(id);
    return res.status(204).json({});
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

module.exports = {
  createEstado,
  getEstados,
  getEstadoById,
  updateEstadoById,
  deleteEstadoById,
};
