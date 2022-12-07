const {Router} = require('express')
const { createEquipo, getEquipos, getEquipoById, updateEquipoById, deleteEquipoById } = require('../controllers/tipoEquipo')
const {validarJwt} = require('../middlewares/validarJwt')
const {esAdmin} = require('../middlewares/validarRol')

const router = Router()

/**
 * Crear un tipo de Equipo
 */
router.post('/',validarJwt,esAdmin,createEquipo)

/**
 * Obtener todos los tipos de Equipo
 */
router.get('/',validarJwt,esAdmin,getEquipos)

/**
 * Obtener un equipo por Id
 */

router.get('/:id',validarJwt,esAdmin,getEquipoById)

/**
 *  Editar un tipo de equipo
 */

router.put('/:id',validarJwt,esAdmin,updateEquipoById)

/**
 * Eliminar un tipo de Equipo
 */

router.delete('/:id',validarJwt,esAdmin,deleteEquipoById)

module.exports = router;