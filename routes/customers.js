const express = require('express');
const router = express.Router();
const Customer = require('../models/Customers');

// This endpoint returns all customer details from the collection
router.get('/', async (req, res) => {
  
  try {
    const customer = await Customer.find();
    res.json(customer);
    console.log(customer);
  } catch (err) {
    console.log(err);
  }
  
});

// This endpoint returns a customer by id
router.get('/:id', async (req, res) => {
  
  try {
    const customer = await Customer.findById(req.params.id);
    res.json(customer);
    console.log(customer);
  } catch (err) {
    console.log(err);
  }
  
});

// This endpoint adds a new customer to the collection
router.post('/addCustomer', async (req, res) => {
  console.log(req.body);

  //Initializes variables recieved from the FormData object
let {
  title,
  firstname,
  lastname,
  mobilenumber,
  email,
  homeaddressline1,
  homeaddressline2,
  town,
  county,
  eircode,
  shippingaddressline1,
  shippingaddressline2,
  townShipAdd,
  countyShipAdd,
  eircodeShipAdd,
} = req.body;
            
  
  const customer = new Customer({
    title: title,
    first_name: firstname,
    surname: lastname,
    mobile_number: mobilenumber,
    email_address: email,
    address: {
      home: {
        line1: homeaddressline1,
        line2: homeaddressline2,
        town: town,
        county: county,
        eircode: eircode,
      },
      shipping: {
        line1: shippingaddressline1,
        line2: shippingaddressline2,
        town: townShipAdd,
        county: countyShipAdd,
        eircode: eircodeShipAdd
      }
    }
  })
  try {
    const savedCust = await customer.save();
    res.status(200).json(savedCust);
    console.log("Customer information added" + savedCust);
  } catch (err) {
    res.json({ message: err })
    console.log(err);
  }
  
  
})

// This endpoint deletes a customer by id from the collection
router.delete('/deleteCustomer/:id', async (req, res) => {
  try {
    const deletedCustomer = await Customer.remove({
      _id: req.params.id
    });
    res.status(200).json(deletedCustomer);
    console.log("Customer information successfully deleted");
  } catch (err) {
    console.log(err);
  }
  
});

// https://stackoverflow.com/questions/1145956/updating-nested-documents-in-mongodb 
// I was having a lot of trouble with this query as I was overwriting all data in the sub-docs
// Turns out the PATCH method and using the dot operator in my query to traverse the document worked

router.patch('/updateCustomer', async (req, res) => {

  //const customer = await Customer.findById(req.params.id)
  let id = req.body.id;
  //console.log(id);
  try {
    const updatedCustomer = await Customer.updateOne({
      _id: id },
      {
        $set: {
          'title': req.body.title,
          'first_name': req.body.firstname,
          'mobile_number': req.body.mobile,
          'email_address': req.body.email,
          'address.home.town': req.body.town, 
          'address.home.eircode': req.body.eircode
          }
        }
      );
    console.log(`Customer ${id}'s information has been updated successfully`);
    res.status(200).json(updatedCustomer);
  } catch (err) {
    console.log(err);
  }
})



module.exports = router;