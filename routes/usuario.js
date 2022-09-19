const {Router} = require('express')
const { createUser, getUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/usuario')

const router = Router()

/**
 * Crear un tipo de Equipo
 */
router.post('/',createUser)

/**
 * Obtener todos los tipos de Equipo
 */
router.get('/',getUsers)

/**
 * Obtener un equipo por Id
 */

router.get('/:id',getUserById)

/**
 *  Editar un tipo de equipo
 */

router.put('/:id',updateUserById)

/**
 * Eliminar un tipo de Equipo
 */

router.delete('/:id',deleteUserById)

module.exports = router;