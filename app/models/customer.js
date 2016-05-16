var db      = require('../services/db');

module.exports = db.Model.extend({
  tableName: 'customers',
  hasTimestamps: true,
  invoices: function() {
    return this.hasMany("Invoice");
  }
});
