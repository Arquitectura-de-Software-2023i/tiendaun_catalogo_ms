const express = require('express');
const Producto = require('../models/producto');
const  STATUS_CODES  = require("../utils/constants") ;

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
            cantidadDisponible: req.body.cantidadDisponible,
            categoria: req.body.categoria
          });
        try {
        const savedDoc = await newProduct.save();
        res.json({mensaje:'El producto con nombre: ' + req.body.nombre + ' y descripcion: ' + req.body.descripcion + ' será añadido'});
        } catch (err) {
        res.json({mensaje:'Error al guardar el producto'});
        }
        
    };

    updateProduct = async(req, res, next) => {
        const productId = req.params.productId; // obtenemos el valor del ID a partir de los parámetros de la ruta
        Producto.findOneAndUpdate({ idProducto: productId }, { nombre: req.body.nombre, descripcion: req.body.descripcion, precio: req.body.precio, cantidadDisponible: req.body.cantidadDisponible }, { new: true })
        .then((product) => {
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
    updateQuantity = async(req, res, next) => {
        const productId = req.params.productId; 
        Producto.findOneAndUpdate({ idProducto: productId }, {cantidadDisponible: req.body.cantidadDisponible }, { new: true })
        .then((product) => {
            console.log(product);
            if (product){
                res.json({mensaje:"Cantidad del producto actualizada exitosamente"});
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
            else if (minPrice){
                productsFiltered=productsFiltered.filter(product=>product.precio>=minPrice );   
            }

            //filtar por categoria
            if (categories){
                categories = categories.split(',');
                console.log(categories);
                let productsFilteredCat=[];
                for (let i=0;i<categories.length;i++){
                    productsFiltered = productsFiltered.filter(product=>product.categoria==categories[i] );  
                    productsFilteredCat = [...productsFilteredCat, ...productsFiltered];
                }
                res.json(productsFilteredCat);
            }else{
                res.json(productsFiltered);
            }

            
        }
        catch(err) {
          res.status(STATUS_CODES.INTERNAL_ERROR).json({ message: err.message });
        }
    };

    searchProduct = async(req,res,next)=>{
        const { nombre } = req.query;
        try {
            const productos = await Producto.find({ nombre: { $regex: new RegExp(nombre, 'i') } }).populate('categoria');
            if (productos.length>0){
            
                res.json(productos);
            }
            else{
                res.json({ mensaje: 'No hay coincidencias' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Hubo un error al buscar los productos.' });
        }
    }

}
module.exports= productController;