const productController = require('../controllers/producto');
const  STATUS_CODES  = require("../utils/constants") ;
const express = require('express');
const bodyParser = require('body-parser');
const Producto = require('../models/producto');

const filterRouter = express.Router();
filterRouter.use(bodyParser.json());
const productsController = new productController();

filterRouter.route('/')
    .get(productsController.filterProducts);

module.exports = filterRouter
