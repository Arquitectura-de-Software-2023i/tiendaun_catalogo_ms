const productController = require('../controllers/producto');
const  STATUS_CODES  = require("../utils/constants") ;
const express = require('express');
const bodyParser = require('body-parser');


const filterRouter = express.Router();
filterRouter.use(bodyParser.json());
const productsController = new productController();

filterRouter.route('/')
    .get(productsController.filterProducts)
    .post(async (req, res, next) => {
        res.statusCode = STATUS_CODES.FORBIDDEN;
        res.json({mensaje:'Operacion POST no permitida en /productos/filtro'});
    })
    .put((req, res, next) => {
        res.statusCode = STATUS_CODES.FORBIDDEN;
        res.json({mensaje:'Operacion PUT no permitida en /productos/filtro'});
    })
    .delete(function(req, res) {
        res.statusCode = STATUS_CODES.FORBIDDEN;
        res.json({mensaje:'Operacion DELETE no permitida en /productos/filtro'});
      });

module.exports = filterRouter
