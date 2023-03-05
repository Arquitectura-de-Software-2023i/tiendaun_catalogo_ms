const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productos = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: false
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    CantidadDisponible: {
        type: Number,
        required: true
    },
    Categorias:[
        {type: Schema.Types.ObjectId, ref: 'Categoria'}
      ]
},{
    timestamps: true
});

let Producto = mongoose.model('Producto', productos);

module.exports = Producto;