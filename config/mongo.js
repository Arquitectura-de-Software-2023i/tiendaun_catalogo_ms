import {connect, connection} from "mongoose"
const mongoose = require('mongoose')    

const DB_URI = 'mongodb+srv://Jrativa:TiendaUnCatalogoDB@cluster0.nbsesbc.mongodb.net/?retryWrites=true&w=majority';
const db = mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("connected to database"))

module.exports = ()=> db;