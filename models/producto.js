const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productos = new Schema({
    idProducto: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        unique: false
    },
    descripcion: {
        type: String,
        required: false
    },
    precio: {
        type: Number,
        required: true
    },
    cantidadDisponible: {
        type: Number,
        required: true
    },
    imagen:{
        type:String,
        required:false
    },
    categoria:
        {type: Schema.Types.ObjectId, ref: 'Categoria'}
},{
    timestamps: true
});

let Producto = mongoose.model('Producto', productos);

module.exports = Producto;