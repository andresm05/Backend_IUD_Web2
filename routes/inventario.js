const {Router} = require('express')
const {getInventarios, createInventario, updateInventarioById, deleteInventarioById, getInventarioById} = require('../controllers/inventario')
const {body} = require('express-validator')

const router = Router()

router.get('/', getInventarios)

router.get('/:id', getInventarioById)

router.post('/', createInventario)

router.put('/:id',  updateInventarioById)

router.delete('/:id', deleteInventarioById)

module.exports = router