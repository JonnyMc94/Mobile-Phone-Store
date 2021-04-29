const mongoose = require('mongoose');
const Customers = require('./Customers');
const Products = require('./Products');

const ordersSchema = mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: Customers },
  order_contents: [{
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: Products },
  }],
  date_purchased: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Orders', ordersSchema);