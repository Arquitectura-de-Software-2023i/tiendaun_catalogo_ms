const express = require('express');
const bodyParser = require('body-parser');
const Producto = require('../models/producto');
const  STATUS_CODES  = require("../utils/constants") ;
function filtrarPorAtributo(arreglo, atributo, valor) {
    return arreglo.filter((objeto) => objeto[atributo].includes(valor));
  }
class productController{
    constructor() {   
    };

    getAllProducts= async (req, res) => {
        try {
          const products = await Producto.find();
          res.json(products);
        } catch (err) {
          res.status(STATUS_CODES.INTERNAL_ERROR).json({ message: err.message });
        }
    };

    getProduct = async(req,res)=>{
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
    };

    postProduct = async (req, res, next) => {
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
        console.error('Error al guardar el producto', err);
        res.json({mensaje:'Error al guardar el producto'});
        }
        res.json({mensaje:'El producto con nombre: ' + req.body.nombre + ' y descripcion: ' + req.body.descripcion + 'será añadido'});
    };

    updateProduct = async(req, res, next) => {
        const productId = req.params.productId; // obtenemos el valor del ID a partir de los parámetros de la ruta
        Producto.findOneAndUpdate({ idProducto: productId }, { nombre: req.body.nombre, descripcion: req.body.descripcion, precio: req.body.precio, cantidadDisponible: req.body.cantidadDisponible }, { new: true })
        .then((product) => {
            console.log(product);
            if (product){
                res.json({mensaje:"Producto actualizado exitosamente"});
            }
            else{
            res.json({mensaje:"No se encontró el producto a actualizar"}).status(STATUS_CODES.NOT_FOUND);
            }
        })
        .catch((err) => {
            console.error(err);
            res.json({mensaje:`Error al actualizar el producto. Error: ${err}`});
        });
    };

    deleteProduct = (req, res, next) => {
        // Borrar el producto identificado con el id dado
        Producto.findOneAndDelete({ idProducto: req.params.productId })
        .then((product) => {
           // Verificar si el documento fue encontrado y eliminado
            if (product) {
                res.json({mensaje:`Producto ${req.params.productId} eliminado exitosamente`});
            } else {
                res.json({mensaje:`No se encontró el producto a eliminar`}).status(STATUS_CODES.NOT_FOUND);
            }
         
        })
        .catch((err) => {
          console.error(err);
          res.json({mensaje:"Error al eliminar el producto"});
        });
    };

    filterProducts = async (req,res,next)=>{
        try{
            //Obtener productos
            let productsFiltered = await Producto.find();
            
            //Obtener parametros de precio y categorias
            const maxPrice = parseInt(req.query.maxPrice);
            const minPrice = parseInt(req.query.minPrice);
            let categories= req.query.categorias;

            //filtrar por rango de precio
            if (maxPrice && minPrice){
                productsFiltered=productsFiltered.filter(product=>product.precio>=minPrice && product.precio<=maxPrice );   
            }
            else if (maxPrice){
                productsFiltered=productsFiltered.filter(product=>product.precio<=maxPrice );   
            }
            else{
                productsFiltered=productsFiltered.filter(product=>product.precio>=minPrice );   
            }

            // //filtar por categoria
            // if (categories){
            //     categories = categories.split(',');
            //     console.log(productsFiltered[1].categorias);
            //     productsFiltered = filtrarPorAtributo(productsFiltered,'categorias',categories);
            // }

            res.json(productsFiltered);
        }
        catch(err) {
          res.status(STATUS_CODES.INTERNAL_ERROR).json({ message: err.message });
        }
    };

}
module.exports= productController;