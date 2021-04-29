const mongoose = require('mongoose');

const CustomersSchema = mongoose.Schema({
  title: { type: String, required : true },
  first_name: { type: String, required : true },
  surname: { type: String, required : true },
  mobile_number: { type: String, required : true },
  email_address: { type: String, required : true },
  address: {
    home: {
      line1: { type: String },
      line2: { type: String },
      town: { type: String },
      county: { type: String },
      eircode: { type: String }
    },
    shipping: {
      line1: { type: String },
      line2: { type: String },
      town: { type: String },
      county: { type: String },
      eircode: { type: String }
    }
  }
})

module.exports = mongoose.model('Customers', CustomersSchema);