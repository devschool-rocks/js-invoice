var db      = require('../services/db');
var Invoice = require('./invoice');

module.exports = db.Model.extend({
  tableName: 'customers',
  hasTimestamps: true,
  invoices: function() {
    return this.hasMany(Invoice);
  }
});
