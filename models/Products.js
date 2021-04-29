const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({
  manufacturer: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true }
})

module.exports = mongoose.model('Products', ProductsSchema);
  