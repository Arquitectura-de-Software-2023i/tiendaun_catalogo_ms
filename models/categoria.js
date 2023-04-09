var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriaSchema = new Schema({
    idCategoria: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        unique: false
    }
});

let Categoria = mongoose.model('Categoria', CategoriaSchema);
module.exports = Categoria;