var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriaSchema = new Schema({
    nombre: String
});

module.exports = mongoose.model('Categoria', CategoriaSchema);