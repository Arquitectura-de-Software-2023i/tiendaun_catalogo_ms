const productController = require('../../controllers/producto');
const STATUS_CODES  = require("../../utils/constants") ;
const express = require('express');
const bodyParser = require('body-parser');
const productRouterAdmin = express.Router();
productRouterAdmin.use(bodyParser.json());
const productsController = new productController();

productRouterAdmin.route('/') 
    .get(productsController.getAllProducts)
    .post(productsController.postProduct)
    .put((req, res, next) => {
        res.statusCode = STATUS_CODES.FORBIDDEN;
        res.json({mensaje:'Operacion PUT no permitida en /admins/productos'});
    })
    .delete(function(req, res) {
      res.json({ mensaje: 'DELETE no soportada en admins/productos' });
      });

productRouterAdmin.route('/:productId')
    
    .get(productsController.getProduct)
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct)
    .post(function (req, res, next)  {
        res.statusCode = STATUS_CODES.FORBIDDEN;
        res.json({mensaje:'POST no esta habilitado en /admins/productos/'+ req.params.productId});
    });

module.exports = productRouterAdmin;