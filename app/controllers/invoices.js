module.exports = (function() {
  var Customer = require('../models/customer');
  var Invoice  = require('../models/invoice');

  var newAction = function(req, res, sessionInfo) {
    Customer.fetchAll().then(function(data) {
      sessionInfo.customers = data.map(function(customer) {
        return { id: customer.id, name: customer.attributes.name };
      });

      res.render('invoices/new', sessionInfo);
    });
  };

  var createAction = function(req, res, sessionInfo) {
    Invoice.forge({
      amount: req.body.amount,
      customer_id: req.body.customer_id
    }).save().tap(function(invoice) {
      console.log("Created invoice: " + invoice.id);
    }).then(function() {
      res.redirect('/invoices');
    });
  };

  var indexAction = function(req, res, sessionInfo) {
    Invoice.fetchAll({
      withRelated: ['customer', 'admin']
    }).then(function(data) {
      sessionInfo.invoices = data.map(function(invoice) {
        return { id: invoice.id, amount: invoice.attributes.amount,
                 customer: {
                   name: invoice.related('customer').attributes.name
                 }
        };
      });

      res.render('invoices/index', sessionInfo);
    });
  };

  return {
    indexAction: indexAction,
    newAction: newAction,
    createAction: createAction
  };
}());
