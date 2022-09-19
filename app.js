const express = require('express');

const app = express();

const tipoEquipo = require('./routes/tipoEquipo')
const estadoEquipo = require('./routes/estado')
const usuario = require('./routes/usuario')
/**
 * Middleware
 */
app.use(express.json())

app.use('/api/tipoequipos',tipoEquipo)
app.use('/api/estadoEquipos',estadoEquipo)
app.use('/api/usuarios', usuario)

module.exports = app;