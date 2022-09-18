const express = require('express');

const app = express();

const tipoEquipo = require('./routes/tipoEquipo')
const estadoEquipo = require('./routes/estado')
/**
 * Middleware
 */
app.use(express.json())

app.use('/api/tipoequipos',tipoEquipo)
app.use('/api/estadoEquipos',estadoEquipo)

module.exports = app;