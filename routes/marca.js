const {Router} = require('express')
const {createMarca,getMarcaById,getMarcas,updateMarcaById,deleteMarcaById} = require('../controllers/marca')

const router = Router()

/**
 * Crear una marca
 */
router.post('/',createMarca)

/**
 * Obtener todas las marcas
 */
router.get('/',getMarcas)

/**
 * Obtener una marca por Id
 */

router.get('/:id',getMarcaById)

/**
 *  Editar una marca
 */

router.put('/:id',updateMarcaById)

/**
 * Eliminar una marca
 */

router.delete('/:id',deleteMarcaById)

module.exports = router;