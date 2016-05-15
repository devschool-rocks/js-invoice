var db       = require('../services/db');
var Customer = require('./customer');
var Admin    = require('./admin');

module.exports = db.Model.extend({
  tableName: 'invoices',
  hasTimestamps: true,
  admin: function() {
    return this.belongsTo(Admin);
  },
  customer: function() {
    return this.belongsTo(Customer);
  },
  toString: function() {
    return [
      "Invoice", "#", this.id, "for",
      this.related('customer').attributes.name,
      "for", this.attributes.amount
    ].join(" ");
  }
});
