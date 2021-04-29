const express = require('express');
const router = express.Router();
const Product = require('../models/Products');


// This endpoint gets all products from the Products collection
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
    console.log(products);
  } catch (err) {
    res.json({ message: err })
    console.log(err);
  }
});

// This endpoint gets a product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
    console.log(product);
  } catch (err) {
    console.log(err);
  }
});

// This endpoint adds a product to the collection
router.post('/addProduct', async (req, res) => {
  console.log(req.body);

  // Initialising variables from formData
  let {
    manufacturer,
    model,
    price
  } = req.body;

  const product = new Product({
    
    manufacturer: manufacturer,
    model: model,
    price: price
  })
  try {
    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
    console.log(`${savedProduct.manufacturer} ${savedProduct.model} has been added to the product database`);
  } catch (err) {
    res.json({ message: err })
    console.log(err);
  }
});


// This ewndpoint deletes a product by id from the Products collection
router.delete('/deleteProduct/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.remove({ _id: req.params.id });
    res.status(200).json(deletedProduct);
    console.log("Product information successfully deleted");
  } catch (err) {
    console.log(err);
  }
  
});


// This endpoint updates a product in the collection by id
router.patch('/updateProduct', async (req, res) => {
  let productID = req.body.id;
  try {
    const updatedProduct = await Product.updateOne({ _id: productID },
      {
        $set:
        {
          manufacturer: req.body.manufacturer,
          model: req.body.model,
          price: req.body.price,
        }
      }, {new: true});
    console.log(`Product information updated successfully ${updatedProduct}`);
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
  }
})


module.exports = router;
