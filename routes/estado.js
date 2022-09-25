const {Router} = require('express')
const { createEstado, getEstados, getEstadoById, updateEstadoById, deleteEstadoById } = require('../controllers/estado')

const router = Router()

/**
 * Crear un estado
 */
router.post('/',createEstado)

/**
 * Obtener todos los estados
 */
router.get('/',getEstados)

/**
 * Obtener un estado
 */

router.get('/:id',getEstadoById)

/**
 *  Editar un estado
 */

router.put('/:id',updateEstadoById)

/**
 * Eliminar un estado
 */

router.delete('/:id',deleteEstadoById)

module.exports = router;