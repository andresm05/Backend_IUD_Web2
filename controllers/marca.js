const Marca = require("../models/marca");
const { request, response } = require("express");

/**
 * Crear una marca
 */
const createMarca = async (req = request, res = response) => {
  try {
    if (Object.keys(req.body).includes("nombre")) {
      const nombre = req.body.nombre.toUpperCase();
      const datos = {
        nombre,
      };
      const marcaBd = await Marca.findOne({ nombre });
      if (marcaBd) {
        return res.status(400).json({ msg: "Ya existe la marca" });
      }
      const marca = new Marca(datos);
      console.log(marca);
      await marca.save();
      res.status(201).json(req.body);
    } else {
      return res.status(400).json({ msg: "Faltan parámetros" });
    }
  } catch (e) {
    res.status(500).json({ msg: e });
  }
};

/**
 * Obtener todas las marcas
 */
const getMarcas = async (req = request, res = response) => {
  try {
    console.log(req.query);
    const estado = req.query.estado;
    let marcasBD;
    if (estado) {
      const query = { estado: estado };
      marcasBD = await Marca.find(query);
    } else {
      marcasBD = await Marca.find();
    }

    return res.status(200).json(marcasBD);
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

/**
 * Obtener una marca por Id
 */

const getMarcaById = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const filter = { _id: id };
    const marcaBD = await Marca.findOne(filter);
    return res.status(200).json(marcaBD);
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

/**
 *  Editar una marca por id
 */

const updateMarcaById = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const buscarMarca = await Marca.findById(id);
    if (!buscarMarca) {
      return res.status(404).json({ msj: "No existe la marca" });
    }
    const data = req.body;
    console.log(data);
    console.log(id);
    data.fechaActualizacion = new Date();
    data.nombre= data.nombre.toUpperCase();
    console.log(data);
    const marcaDB = await Marca.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res.json(marcaDB);
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

/**
 * Eliminar una marca por id
 */

const deleteMarcaById = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const marcaBD = await Marca.findById(id);
    if (!marcaBD) {
      return res.status(404).json({ msj: "No existe la marca" });
    }
    await Marca.findByIdAndDelete(id);
    return res.status(204).json({});
  } catch (e) {
    return res.status(500).json({ msj: e });
  }
};

module.exports = {
  createMarca,
  getMarcas,
  getMarcaById,
  updateMarcaById,
  deleteMarcaById,
};
