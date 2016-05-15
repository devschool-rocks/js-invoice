exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('invoices').del(),
    knex('invoices').insert({admin_id: 1, customer_id: 1, amount: 420.69}),
    knex('invoices').insert({admin_id: 1, customer_id: 2, amount: 12345.35})
  );
};
