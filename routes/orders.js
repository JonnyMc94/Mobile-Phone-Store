const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order = require('../models/Orders');
const Product = require('../models/Products');

// This endpoint adds an order to the collection
router.post("/addOrder", async (req, res) => {

  const productList = req.body.products;
  const customerID = req.body.customer_id;

  // This maps through the id array sent from AJAX and stores the product ids in an array
  const fullOrder = productList.map((phone => {
    return {
      phoneId : mongoose.Types.ObjectId(phone.phoneId),
    };
  }));
 
  const order = new Order({
    customer_id: customerID,
    order_contents: fullOrder,
  })

  try {
    const newOrder = await order.save();
    res.json(newOrder)
  } catch(error) {
    console.log(error)
    res.json({ message: error });
  }

});

// This endpoint gets all orders from the collection
router.get("/", async function(req, res){
  try {
    const order = await Order.find();
    res.json(order);
    console.log(order);
  } catch (err) {
    console.log(err);
  }
})

// This endpoint gets an order from teh collection by id
router.get("/:id", async function(req, res){
  try {
    const order = await Order.findById(req.params.id);
    res.json(order);
    console.log(order);
  } catch (err) {
    console.log(err);
  }
})

// This endpoint deletes an order from the collection by id
router.delete('/deleteOrder/:id', async (req, res) => {
  try {
    const deletedOrder = await Product.remove({ _id: req.params.id });
    res.status(200).json(deletedOrder);
    console.log("Product information successfully deleted");
  } catch (err) {
    console.log(err);
  }
  
})
module.exports = router;