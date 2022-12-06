const {Router} = require('express')
const {createMarca,getMarcaById,getMarcas,updateMarcaById,deleteMarcaById} = require('../controllers/marca')
const {validarJwt} = require('../middlewares/validarJwt')
const {esAdmin} = require('../middlewares/validarRol')

const router = Router()

/**
 * Crear una marca
 */
router.post('/',createMarca)

/**
 * Obtener todas las marcas
 */
router.get('/',validarJwt,esAdmin,getMarcas)

/**
 * Obtener una marca por Id
 */

router.get('/:id',validarJwt,esAdmin,getMarcaById)

/**
 *  Editar una marca
 */

router.put('/:id',validarJwt,esAdmin,updateMarcaById)

/**
 * Eliminar una marca
 */

router.delete('/:id',validarJwt,esAdmin,deleteMarcaById)

module.exports = router;