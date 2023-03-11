var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriaSchema = new Schema({
    idCategoria: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: String
});

module.exports = mongoose.model('Categoria', CategoriaSchema);