const Inventario = require("../models/inventario");
const { request, response } = require("express");
const Usuario = require("../models/usuario");
const Marca = require("../models/marca");
const TipoEquipo = require("../models/tipoEquipo");
const Estado = require("../models/estado");
/**
 * Obtener todos los inventarios
 */
const getInventarios = async (req = request, res = response) => {
  try {
    const inventarios = await Inventario.find()
      .populate({
        path: "usuario",
        match: { estado: true },
      })
      .populate({
        path: "marca",
      })
      .populate({
        path: "tipoEquipo",
      })
      .populate({
        path: "estado",
      });
    res.json(inventarios);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msj: "Error al obtener inventarios" });
  }
};
/**
 * Crear inventario
 */
const createInventario = async (req = request, res = response) => {
  try {
    data = req.body;
    if (
      Object.keys(data).includes("serial") &&
      Object.keys(data).includes("modelo") &&
      Object.keys(data).includes("precio") &&
      Object.keys(data).includes("usuario") &&
      Object.keys(data).includes("marca") &&
      Object.keys(data).includes("tipoEquipo") &&
      Object.keys(data).includes("estado")
    ) {
      serial = req.body.serial;
      const { usuario, marca, estado, tipoEquipo } = data;
      //Validaciones
      const inventarioBD = await Inventario.findOne({ serial });
      if (inventarioBD) {
        return res.status(400).json({ msg: "Ya existe el inventario" });
      }
      const usuarioBD = await Usuario.findOne({
        _id: usuario._id,
        estado: true,
      });
      const marcaBD = await Marca.findOne({ _id: marca._id, estado: true });
      const tipoEquipoBD = await TipoEquipo.findOne({
        _id: tipoEquipo._id,
        estado: true,
      });
      const estadoBD = await Estado.findOne({ _id: estado._id, estado: true });

      if (!tipoEquipoBD) {
        return res
          .status(400)
          .json({ msj: "no existe el tipo de equipo o está inactivo" });
      }
      if (!estadoBD) {
        return res
          .status(400)
          .json({ msj: "no existe el estado o está inactivo" });
      }
      if (!marcaBD) {
        return res
          .status(400)
          .json({ msj: "no existe la marca o está inactiva" });
      }
      if (!usuarioBD) {
        return res
          .status(400)
          .json({ msj: "no existe el usuario o está inactivo" });
      }
      const inventario = new Inventario(data);
      await inventario.save();
      res.status(201).json(inventario);
    } else {
      return res.status(400).json({ msg: "Faltan parámetros" });
    }
  } catch (e) {
    res.status(500).json({ msg: e });
  }
};

/**
 * Consultar inventario por id
 */
const getInventarioById = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const filter = { _id: id };
    const inventario = await Inventario.findOne(filter)
      .populate({
        path: "usuario",
        match: { estado: true },
      })
      .populate({
        path: "marca",
      })
      .populate({
        path: "tipoEquipo",
      })
      .populate({
        path: "estado",
      });
    return res.json(inventario);
  } catch (e) {
    return res.status(500).json({ msg: e });
  }
};
/**
 * Actualizar inventario por id
 */
const updateInventarioById = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const buscarInventario = await Inventario.findById(id);
    if (!buscarInventario) {
      return res.status(404).json({ msj: "No existe el inventario" });
    }
    const data = req.body;

    const inventario = await Inventario.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res.json(inventario);
  } catch (e) {
    return res.status(500).json({ msg: e });
  }
};

/**
 * Eliminar inventario por id
 */
const deleteInventarioById = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const buscarInventario = await Inventario.findById(id);
    if (!buscarInventario) {
      return res.status(404).json({ msj: "No existe el inventario" });
    }
    await Inventario.findByIdAndDelete(id);
    res.status(204).json({});
  } catch (e) {
    res.status(500).json({ msg: e });
  }
};

module.exports = {
  getInventarios,
  createInventario,
  getInventarioById,
  updateInventarioById,
  deleteInventarioById,
};
