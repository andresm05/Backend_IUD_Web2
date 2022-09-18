const {Router} = require('express')
const { createEstado, getEstados, getEstadoById, updateEstadoById, deleteEstadoById } = require('../controllers/estado')

const router = Router()

/**
 * Crear un tipo de Equipo
 */
router.post('/',createEstado)

/**
 * Obtener todos los tipos de Equipo
 */
router.get('/',getEstados)

/**
 * Obtener un equipo por Id
 */

router.get('/:id',getEstadoById)

/**
 *  Editar un tipo de equipo
 */

router.put('/:id',updateEstadoById)

/**
 * Eliminar un tipo de Equipo
 */

router.delete('/:id',deleteEstadoById)

module.exports = router;