const { Schema, model } = require("mongoose");

const usuarioSchema = (items)=>{
    const schema = Schema({
        nombre:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        estado:{
            type: Boolean,
            default: true
        },
        fechaCreacion:{
            type: Date,
            default: new Date
        },
        fechaActualizacion:{
            type: Date,
            default: new Date
        }
    })
    if(items){
        schema.add(items)
    }
    return schema;
}

const UsuarioSchema = usuarioSchema();

const UsuarioAuthSchema = usuarioSchema({
    password:{
        type: String,
        required: [true, 'password required']
    },
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN','DOCENTE']
    }
})

module.exports = model('Usuario', UsuarioSchema)
module.exports = model('UsuarioAuth', UsuarioAuthSchema)