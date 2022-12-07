const {Router} = require('express')
const {getInventarios, createInventario, updateInventarioById, deleteInventarioById, getInventarioById} = require('../controllers/inventario')
const {validarJwt} = require('../middlewares/validarJwt')
const {esAdmin} = require('../middlewares/validarRol')

const router = Router()

router.get('/',validarJwt,getInventarios)

router.get('/:id',validarJwt,getInventarioById)

router.post('/',validarJwt,esAdmin,createInventario)

router.put('/:id',validarJwt,esAdmin,updateInventarioById)

router.delete('/:id',validarJwt,esAdmin,deleteInventarioById)

module.exports = router