const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
// Allows importing of the URL+pw so as it is hidden from outside viewers
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const customersRoute = require('./routes/customers');
const productRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');
const app = express();

// parse JSON and URL Encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/customers', customersRoute);
app.use('/products', productRoute);
app.use('/orders', ordersRoute);

const port = 8000; // port the server app with listen on

// watch for Ctrl-C and then close database connection!
process.on("SIGINT", function () {
  console.log("\nDatabase Disconnected!\n");
  process.exit();
});

// Connect to db
mongoose.connect(
  process.env.DB_Connection,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
  console.log("Connected to database");
  })


//ROUTES
app.get('/', (req, res) => {
  fs.readFile(__dirname + "/index.html", (err, data) => {
      // get the file and add to data
      const headers = {
        // set the appropriate headers
        "Content-Type": "text/html",
      };
      res.writeHead(200, headers);
      res.end(data); // return the data (index.html)
        }); // as part of the response
})



app.listen(port);