(function() {

  var pug = require('pug');
  var express = require('express');
  var bodyParser= require('body-parser');

  var app = express();

  var Customer = require('./app/models/customer');

  app.set('view engine', 'pug');
  app.set('views','./app/views');
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({extended: true}));

  var sessionInfo = {
    current_user: null
  };

  var session = function(req, res, cb) {
    req.sessionInfo = sessionInfo;
    cb();
  };

  // ROUTES
  app.get('/', function (req, res) {
    res.render('index', sessionInfo);
  });

  app.post('/sessions', function (req, res) {
    res.redirect(201, '/');
  });

  var invoiceController = require("./app/controllers/invoices");

  app.get('/invoices/new', function (req, res) {
    invoiceController.newAction(req, res, sessionInfo);
  });

  app.post('/invoices', function (req, res) {
    invoiceController.createAction(req, res, sessionInfo);
  });

  app.get('/invoices', function(req, res) {
    invoiceController.indexAction(req, res, sessionInfo);
  });

  console.log("App is listening on localhost:4000");
  app.listen(4000);

}());
