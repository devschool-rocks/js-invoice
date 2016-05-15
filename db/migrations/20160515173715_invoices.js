(function() {
  var createTable = function(knex) {
    return knex.schema.createTable('invoices', function(table) {

      table.increments('id').primary();
      table.integer('admin_id');
      table.integer('customer_id');
      table.decimal('amount');
      table.timestamp('created_at')
          .notNullable()
          .defaultTo(knex.raw('now()'));
      table.timestamp('updated_at')
          .notNullable()
          .defaultTo(knex.raw('now()'));
    });
  };

  var dropTable = function(knex) {
    return knex.schema.dropTable('invoices');
  };

  module.exports.up = function(knex, Promise) {
    return Promise.all([
        createTable(knex)
    ]);
  };

  module.exports.down = function(knex, Promise) {
    return Promise.all([
        dropTable(knex)
    ]);
  };
}());
