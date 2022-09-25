const {Router} = require('express')
const { createUser, getUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/usuario')
const {body} = require('express-validator')

const router = Router()

/**
 * Crear un usuario
 */
router.post('/',body('email').isEmail(), createUser)

/**
 * Obtener todos los usuarios
 */
router.get('/',getUsers)

/**
 * Obtener un usuario por Id
 */

router.get('/:id',getUserById)

/**
 *  Editar un usuario
 */

router.put('/:id',updateUserById)

/**
 * Eliminar un usuario
 */

router.delete('/:id',deleteUserById)

module.exports = router;