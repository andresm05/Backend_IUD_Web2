const {Router} = require('express')
const { createUser, getUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/usuario')
const {body} = require('express-validator')
const { validarJwt } = require('../middlewares/validarJwt')
const { esAdmin } = require('../middlewares/validarRol')

const router = Router()

/**
 * Crear un usuario
 */
router.post('/',body('email').isEmail(),validarJwt,esAdmin,createUser)

/**
 * Obtener todos los usuarios
 */
router.get('/',validarJwt,esAdmin,getUsers)

/**
 * Obtener un usuario por Id
 */

router.get('/:id',validarJwt,esAdmin,getUserById)

/**
 *  Editar un usuario
 */

router.put('/:id',body('email').isEmail(),validarJwt,esAdmin,updateUserById)

/**
 * Eliminar un usuario
 */

router.delete('/:id',validarJwt,esAdmin,deleteUserById)

module.exports = router;