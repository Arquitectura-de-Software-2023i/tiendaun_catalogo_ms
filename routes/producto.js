const express = require('express');
const bodyParser = require('body-parser');
const Producto = require('../models/producto');
const getAllProducts= async (req, res) => {
    try {
      const products = await Producto.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

const productRouter = express.Router();
productRouter.use(bodyParser.json());

productRouter.route('/')
    
    .get(getAllProducts)
    .post(async (req, res, next) => {
        const newProduct = new Producto({
            idProducto: req.body.idProducto,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            cantidadDisponible: req.body.cantidadDisponible
          });
        try {
        const savedDoc = await newProduct.save();
        console.log('El documento se ha guardado exitosamente', savedDoc);
        } catch (err) {
        console.error('Error al guardar el documento', err);
        }
        res.end('El producto con nombre: ' + req.body.nombre + ' y descripcion: ' + req.body.descripcion + 'será añadido');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /products');
    })
    .delete(function(req, res) {
        Producto.deleteMany({}, function(err) {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al borrar los productos.' });
          }
          res.json({ mensaje: 'Productos borrados exitosamente.' });
        });
      });

productRouter.route('/:productId')
    
    .get(async(req, res) => {
        const productId = req.params.productId; // obtenemos el valor del ID a partir de los parámetros de la ruta
        try {
            const product = await Producto.findOne({idProducto : productId });
            if (!product){
                
                res.json({mensaje:"Producto no encontrado"});
            }
            else{
                res.json(product);
            }
          } catch (err) {
            console.error(err);
          }
      })

    .put(async(req, res, next) => {
        const productId = req.params.productId; // obtenemos el valor del ID a partir de los parámetros de la ruta
        Producto.findOneAndUpdate({ idProducto: productId }, { nombre: req.body.nombre, descripcion: req.body.descripcion, precio: req.body.precio, cantidadDisponible: req.body.cantidadDisponible }, { new: true })
        .then((product) => {
            console.log(product);
            res.json({mensaje:"Producto actualizado exitosamente"});
        })
        .catch((err) => {
            console.error(err);
        });
    })

    .delete((req, res, next) => {
        // Borrar el producto identificado con el id dado
        Producto.findOneAndDelete({ idProducto: req.params.productId })
        .then((product) => {
          res.json({mensaje:"Producto eliminado exitosamente"});
        })
        .catch((err) => {
          console.error(err);
          res.json({mensaje:"Error al eliminar el producto"});
        });
    })
    .post(function (req, res, next)  {
        res.statusCode = 403;
        res.end('POST no esta habilitado en /productos/'+ req.params.productId);
    });
    

module.exports = productRouter;