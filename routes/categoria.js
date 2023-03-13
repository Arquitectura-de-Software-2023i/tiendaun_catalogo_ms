const categoryController = require('../controllers/categoria');
const express = require('express');
const bodyParser = require('body-parser');
const Categoria = require('../models/categoria');

const categoryRouterAdmin = express.Router();
categoryRouterAdmin.use(bodyParser.json());
const categoriesController = new categoryController();

categoryRouterAdmin.route('/') 
    .get(categoriesController.getAllCategories)
    .post(categoriesController.postCategory);

module.exports = categoryRouterAdmin;