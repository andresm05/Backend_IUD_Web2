const express = require('express');

const app = express();

const tipoEquipo = require('./routes/tipoEquipo')
/**
 * Middleware
 */
app.use(express.json())

app.use('/api/tipoequipos',tipoEquipo)

module.exports = app;