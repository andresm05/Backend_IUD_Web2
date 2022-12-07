const {Router} = require('express')
const { createEstado, getEstados, getEstadoById, updateEstadoById, deleteEstadoById } = require('../controllers/estado')
const {validarJwt} = require('../middlewares/validarJwt')
const {esAdmin} = require('../middlewares/validarRol')

const router = Router()

/**
 * Crear un estado
 */
router.post('/',validarJwt,esAdmin,createEstado)

/**
 * Obtener todos los estados
 */
router.get('/',validarJwt,esAdmin,getEstados)

/**
 * Obtener un estado
 */

router.get('/:id',validarJwt,esAdmin,getEstadoById)

/**
 *  Editar un estado
 */

router.put('/:id',validarJwt,esAdmin,updateEstadoById)

/**
 * Eliminar un estado
 */

router.delete('/:id',validarJwt,esAdmin,deleteEstadoById)

module.exports = router;