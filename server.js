const express = require('express');

const app = express();

const tiposEquipo = [{
    nombre:'juan',
    estado: true,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date()
}]
app.get('/tiposEquipo',(req, res)=>{
    return res.json(tiposEquipo)
})

app.listen(3000, ()=>{
    console.log("servidor arrancó por puerto 3000")
})
