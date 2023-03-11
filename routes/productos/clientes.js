const productController = require('../../controllers/producto');
const  STATUS_CODES  = require("../../utils/constants") ;
const express = require('express');
const bodyParser = require('body-parser');
const Producto = require('../../models/producto');

const productRouterCliente = express.Router();
productRouterCliente.use(bodyParser.json());
const productsController = new productController();


productRouterCliente.route('/')
    
    .get(productsController.getAllProducts)
    .post(async (req, res, next) => {
        res.statusCode = STATUS_CODES.FORBIDDEN;
        res.json({mensaje:'Operacion POST no permitida en /clientes/productos'});
    })
    .put((req, res, next) => {
        res.statusCode = STATUS_CODES.FORBIDDEN;
        res.json({mensaje:'Operacion PUT no permitida en /clientes/productos'});
    })
    .delete(function(req, res) {
        res.statusCode = STATUS_CODES.FORBIDDEN;
        res.json({mensaje:'Operacion DELETE no permitida en /clientes/productos'});
      });

productRouterCliente.route('/:productId')
    
    .get(productsController.getProduct)
    .post(function (req, res, next)  {
        res.statusCode = STATUS_CODES.FORBIDDEN;
        res.json({"mensaje":'POST no esta habilitado en clientes/productos/'+ req.params.productId});
    })
    .put(function (req, res, next)  {
        res.statusCode = STATUS_CODES.FORBIDDEN;
        res.json({"mensaje":'PUT no esta habilitado en clientes/productos/'+ req.params.productId});
    })

    .delete(function (req, res, next)  {
        res.statusCode = STATUS_CODES.FORBIDDEN;
        res.json({"mensaje":'DELETE no esta habilitado en clientes/productos/'+ req.params.productId});
    });
    
    

module.exports = productRouterCliente;