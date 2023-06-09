var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

const DB_URI = process.env.DB_URI;

//connection to mongo
const mongoose = require('mongoose');

const uri ='mongodb+srv://Jrativa:TiendaUnCatalogoDB@cluster0.nbsesbc.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch(err => console.log('Error al conectar a la base de datos: ' + err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var productsClientRouter = require('./routes/productos/clientes');
var productsAdminRouter = require('./routes/productos/admins.route');
var filterRouter = require('./routes/filtro');
var searchRouter = require('./routes/search');
var categoryRouter = require('./routes/categoria');

var app = express();
//export models
const categoria = require('./models/categoria');
const producto = require('./models/producto');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admins/productos', productsAdminRouter);
app.use('/clientes/productos', productsClientRouter);
app.use('/productos/filtro', filterRouter);
app.use('/productos/busqueda', searchRouter);
app.use('/admins/categorias', categoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');  
});

module.exports = app;

