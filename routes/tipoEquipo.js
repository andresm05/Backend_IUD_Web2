const {Router} = require('express')
const { createEquipo, getEquipos, getEquipoById, updateEquipoById, deleteEquipoById } = require('../controllers/tipoEquipo')

const router = Router()

/**
 * Crear un tipo de Equipo
 */
router.post('/',createEquipo)

/**
 * Obtener todos los tipos de Equipo
 */
router.get('/',getEquipos)

/**
 * Obtener un equipo por Id
 */

router.get('/:id',getEquipoById)

/**
 *  Editar un tipo de equipo
 */

router.put('/:id',updateEquipoById)

/**
 * Eliminar un tipo de Equipo
 */

router.delete('/:id',deleteEquipoById)

module.exports = router;