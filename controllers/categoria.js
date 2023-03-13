const express = require('express');
const bodyParser = require('body-parser');
const Producto = require('../models/producto');
const Categoria = require('../models/categoria');
const  STATUS_CODES  = require("../utils/constants") ;
class categoryController{
    getAllCategories= async (req, res) => {
        try {
          const categories = await Categoria.find();
          res.json(categories);
        } catch (err) {
          res.status(STATUS_CODES.INTERNAL_ERROR).json({ message: err.message });
        }
    };
    postCategory = async (req, res, next) => {
        const newCategory = new Categoria({
            idCategoria: req.body.idCategoria,
            nombre: req.body.nombre,
          });
        try {
        const savedDoc = await newCategory.save();
        console.log('El documento se ha guardado exitosamente', savedDoc);
        } catch (err) {
        console.error('Error al guardar la categoria', err);
        res.json({mensaje:'Error al guardar la categoria'});
        }
        res.json({mensaje:'La categoria: ' + req.body.nombre +  ' será añadida'});
    };
}
module.exports = categoryController;