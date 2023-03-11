const productController = require('../controllers/producto');
const  STATUS_CODES  = require("../utils/constants") ;
const express = require('express');
const bodyParser = require('body-parser');

const searchRouter = express.Router();
searchRouter.use(bodyParser.json());
const productsController = new productController();

searchRouter.route('/')
    .get(productsController.searchProduct)
    .post(async (req, res, next) => {
        res.statusCode = STATUS_CODES.FORBIDDEN;
        res.json({mensaje:'Operacion POST no permitida en /productos/busqueda'});
    })
    .put((req, res, next) => {
        res.statusCode = STATUS_CODES.FORBIDDEN;
        res.json({mensaje:'Operacion PUT no permitida en /productos/busqueda'});
    })
    .delete(function(req, res) {
        res.statusCode = STATUS_CODES.FORBIDDEN;
        res.json({mensaje:'Operacion DELETE no permitida en /productos/busqueda'});
      });

module.exports = searchRouter