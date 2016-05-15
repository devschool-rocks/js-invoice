(function() {
  var Invoice  = require('./app/models/invoice');
  var Admin    = require('./app/models/admin');
  var Customer = require('./app/models/customer');

  Invoice.fetchAll({withRelated: ['customer']}).then(function(data) {
    console.log("There were " + data.length + " invoices in the database.");
    data.forEach(function(invoice) {
      console.log(invoice.toString());
    });
  });
}());
