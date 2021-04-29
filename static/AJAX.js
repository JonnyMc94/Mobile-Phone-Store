
      let userID = '';

     // Handle "Delete customer" button click from dynamically renderred html
      const deleteCustomer = (id) => {
        console.log(id);
        userID = id;
        $.ajax({
          type: 'DELETE',
          url: `http://localhost:8000/customers/deleteCustomer/${userID}`
        }).done( () => {
          $.ajax({
            type: 'GET',
            url: 'http://localhost:8000/customers/'
          }).done((data) => {
              let html = '';
              data.forEach(function (customer) {

                html +=
                  `<div class="collection-item customer-card">
                  <div class="row">
                    <div class="pull-left customer-details" style="font-size: 1.8rem">
                      ${customer.first_name} ${customer.surname}
                    </div>
                    <p hidden>${customer._id}</p>
                    <div class="pull-right customer buttons" style="margin-top: 20px">
                      <button name="update-customer" class="btn btn-warning updateCustomerButton">
                        Update customer &nbsp;<span class="fa fa-edit fa-lg"></span>
                      </button>
                      <button name="delete-customer" 
                      class="btn btn-danger deleteCustomerButton" onclick="deleteCustomer('${customer._id}')">
                        Delete customer &nbsp;<span class="fa fa-trash-o fa-lg"></span>
                      </button>
                    </div>
                  </div>
                  <div class="row" style="margin-bottom: 20px">
                    <div class="col-3 customer-number" style="font-size: 1.2rem">
                        <em>${customer.mobile_number}</em>
                    </div>
                    <div class="col-3 customer-email" style="font-size: 1.2rem">
                        <em>${customer.email_address}</em>
                    </div>
                    </div>
                </div>
                `
              })
              document.querySelector('.customer-collection').innerHTML = html;
        
            })
        //id.preventDefault();
      })
    }

    // Handle "Delete product" button click from dynamically renderred html
      const deleteProduct = (id) => {
        console.log(id);
        let productID = id;
        $.ajax({
          type: 'DELETE',
          url: `http://localhost:8000/products/deleteProduct/${productID}`
        }).done((data) => {
          console.log(`Product ${data.maunfacturer} ${data.model} has been deleted`)
          document.querySelector('.product-collection').innerHTML = html;
        
        })
     }
      
     // This function displays the update customer form on button click
      const displayUpdateForCustomer = () => {

          console.log('clicked');
          //userID = id;

          $("#customer-data-show").hide();
          $("#product-data-show").hide();
          $("#order-data-show").hide();
          $('#update-customer-form').show();

          $.ajax({
          type: 'GET',
          url: 'http://localhost:8000/customers/'
        })
          .done(function (data) {
            let html = '';
            data.forEach(function (customer) {

              $('#customerSel').append(
                `<option value="${customer._id}">${customer.first_name} ${customer.surname}</option>`);

          })
        })
      }
      // This function handles updating the customer information
      $('#update-customer-form').submit( e => {

          // Handle "Update User" form submission
          var user = {
            id: $('select[name=customerSel]').val(),
            firstname: $('input[name=update-fname]').val(),
            mobile: $('input[name=update-mobile]').val(),
            title: $('input[name=update-title]').val(),
            email: $('input[name=update-email]').val(),
            eircode: $('input[name=update-eircode]').val(),
            town: $('input[name=update-town]').val()
          };

          console.log(user);

          
          $.ajax({
            type: 'PATCH',
            url: `http://localhost:8000/customers/updateCustomer`,
            data: user
          }).done(() => {

            alert(`${$('input[name=update-fname]').val()}'s number, title, email and eircode have been updated`);
            // reset the form for next time!
            $('input[name=update-fname]').val('');
            $('input[name=update-mobile]').val('');
            $('input[name=update-title]').val('');
            $('input[name=update-email]').val('');
            $('input[name=update-eircode]').val('');


            $('#update-customer-form').hide();
            $("#customer-data-show").show();
            $("#product-data-show").show();
            $("#order-data-show").show();

            });
          e.preventDefault();
          
        
     })

     // This function displays the product update form on button click
      const displayUpdateFormProduct = (e) => {

          console.log('clicked');
          //let productID = id;

          $("#customer-data-show").hide();
          $("#product-data-show").hide();
          $("#order-data-show").hide();
          $('#update-product-form').show();

          $.ajax({
          type: 'GET',
          url: 'http://localhost:8000/products/'
        })
          .done((data) => {
           
            data.forEach((product) => {
              $('#productSel').append(
                `<option value="${product._id}">${product.manufacturer} ${product.model}</option>`);

            })
          })
      }

      // This function handles updating the product information
      $('#update-product-form').submit(e => {
        var product = {
          id: $('select[name=productSel]').val(),
          manufacturer: $('#update-manufacturer').val(),
          model: $('#update-model').val(),
          price: $('#update-price').val(),
        };

        $('#productSel').html('');
        console.log(product);
          let productID = product.id;

          alert(`${product.manufacturer} ${product.model} information has been updated`);
          $.ajax({
            type: 'PATCH',
            url: `http://localhost:8000/products/updateProduct`,
            data: product
          }).done((data) => {

            //alert(`${data.manufacturer} ${data.model} has been added to the database`);
            // reset the form for next time!
            $('input[name=manufacturer]').val(''),
            $('input[name=model]').val(''),
            $('input[name=price]').val(''),


            $('#update-product-form').hide();
            $("#customer-data-show").show();
            $("#product-data-show").show();
            $("#order-data-show").show();

          });

          e.preventDefault(); 

      });

    $(document).ready( () => {

      //On page load the three forms are hidden
      $('#add-customer').hide();
      $('#add-phone-form').hide();
      $('#add-order-form').hide();
      $('#update-customer-form').hide();
      $('#update-product-form').hide();
      
      // This function handles adding a new customer to the database
      $('#add-customer').submit( e => {
        
        let formData = Object.fromEntries(new FormData(e.target));
        alert("A new user has been added to the database");
        $.ajax({
          type: 'POST',
          url: 'http://localhost:8000/customers/addCustomer',
          contentType: 'application/json',
          data: JSON.stringify(formData)
        }).done( () => {
          document.querySelector('#customer-collection').innerHTML = '';
            // reset the form for next time!
            $('select[name=title]').val('');
            $('input[name=firstname]').val('');
            $('input[name=lastname]').val('');
            $('input[name=mobilenumber]').val('');
            $('input[name=email]').val('');
            $('input[name=homeaddressline1]').val('');
            $('input[name=homeaddressline2]').val('');
            $('input[name=town]').val('');
            $('input[name=county]').val('');
            $('input[name=eircode]').val('');
            $('input[name=shippingaddressline1]').val('');
            $('input[name=shippingaddressline2]').val('');
            $('input[name=townShipAdd]').val('');
            $('input[name=countyShipAdd]').val('');
            $('input[name=eircodeShipAdd]').val('');
        
            // https://www.w3schools.com/jquery/jquery_css.asp
            $('#add-customer').hide();
            $('#addCustomerButton').show();
            $("#customer-data-show").show();
            $("#product-data-show").show();
            $("#order-data-show").show();
            
          });
          e.preventDefault();
      
      });

      // This method handles adding a new product to the database
      $('#add-phone-form').submit(e => {

        let formData = Object.fromEntries(new FormData(e.target));
        
        $.ajax({
          type: 'POST',
          url: 'http://localhost:8000/products/addProduct',
          contentType: 'application/json',
          data: JSON.stringify(formData)
        }).done((data) => {

          alert(`${data.manufacturer} ${data.model} has been added to the database`);
          // reset the form for next time!
          $('input[name=manufacturer]').val('');
          $('input[name=model]').val('');
          $('input[name=price]').val('');

          // https://www.w3schools.com/jquery/jquery_css.asp
          $('#add-phone-form').hide();
          $('#addProductButton').show();
          $("#customer-data-show").show();
          $("#product-data-show").show();
          $("#order-data-show").show();
          document.querySelector('.product-collection').innerHTML = '';
        });
        e.preventDefault();
      });

      $('#add-order-form').submit(e => {
        // https://stackoverflow.com/questions/8563240/how-to-get-all-checked-checkboxes/31113246
        let checkboxes = document.getElementsByName("checkboxes");
        let selectedProducts = Array.prototype.slice.call(checkboxes).filter(ch => ch.checked == true);
        let boxValues = [];

        // Adds selected products to array 
        selectedProducts.forEach(product => {
          boxValues.push(product.value)
        })
       
     
      
        let order = {
          customer_id: $('select[name=customerOrderSel]').val(),
          products: boxValues,
        }
        $.ajax({
          type: 'POST',
          url: 'http://localhost:8000/orders/addOrder',
          contentType: 'application/json',
          data: JSON.stringify(order)
        }).done((data) => {
          console.log(order);
          alert(`User ${data.customer_id}'s order has been added to the database`);
          // reset the form for next time!
          $('select[name=manufacturer]').val('');
          $('input[name=model]').val('');
          $('input[name=price]').val('');

          // https://www.w3schools.com/jquery/jquery_css.asp
          $('#add-order-form').hide();
          $('#addOrderButton').show();
          $("#customer-data-show").show();
          $("#product-data-show").show();
          $("#order-data-show").show();
          // document.querySelector('.product-collection').innerHTML = '';
        });
        e.preventDefault();
      });


      // This function displays the customers data on screen 
      // handle "Show Customer Data" submit button click
      $('#show-cust').click(e => {
        $.ajax({
          type: 'GET',
          url: 'http://localhost:8000/customers/'
        })
          .done(function (data) {
            let html = '';
            data.forEach(function (customer) {
             
               html +=
                `  <div class="col-lg-2 col-md-3 col-sm-4 col-6" id="customer-details" style="margin: 20px">
                    <div class="card text-center" style="width: 18rem;">
                      <div class="card-body bg-light mb-3">
                        <div class="card-title">
                          <h1>${customer.first_name} </br> ${customer.surname}</h1> 
                        </div>
                        <div class="card-text">
                          <em>${customer.mobile_number}</em> 
                          </br> <em>${customer.email_address}</em> </br>
                          <em>${customer.address.home.line1}, ${customer.address.home.town}</em> </br>
                          <em>${customer.address.home.county}, ${customer.address.home.eircode}</em> </br>
                          <em>${customer.address.shipping.line1}, ${customer.address.shipping.town}</em> </br>
                          <em>${customer.address.shipping.county}, ${customer.address.shipping.eircode}</em> </br>
                          </div>
                        </div>
                        <div class="customer buttons" style="margin-top: 20px">
                          <button name="delete-customer"
                          class="btn btn-danger deleteCustomerButton" onclick="deleteCustomer('${customer._id}')">
                            Delete customer &nbsp;<span class="fa fa-trash-o fa-lg"></span>
                          </button>
                        </div>
                      </div>
                  </div>
                `
            })
            document.querySelector('#customer-collection').innerHTML = html;
          });
        e.preventDefault(); 
      });

      
      // This function displays the current product data on screen 
      // handle "Show Product Data" submit button click
      $('#show-product').click(e => {
        $.ajax({
          type: 'GET',
          url: 'http://localhost:8000/products/'
        })
          .done( (data) => {
            let html = '';
             data.forEach( (product) => {

               html += 
               `<div class="col-lg-2 col-md-3 col-sm-4 col-6" id="customer-details" style="margin: 20px">
                    <div class="card text-center" style="width: 18rem;">
                      <div class="card-body bg-light mb-3">
                        <div class="card-title">
                          <h1><strong>${product.manufacturer}</strong></h1>
                        </div>
                        <div class="card-text" style="font-size: 1.6rem">
                          <em>${product.model}</em> </br>
                          <em>${product.price}</em>
                        </div>
                        <div class="product-buttons" style="margin-top: 20px;">
                          <button id="deleteProductButton" name="delete-product" class="btn btn-danger"
                          onclick="deleteProduct('${product._id}')">
                            Delete product &nbsp;<span class="fa fa-trash-o fa-lg"></span>
                          </button>
                        </div>
                      </div>
                  </div>
                </div>`

             }) // display the database in the textarea and trigger an input change event
             document.querySelector('#product-collection').innerHTML = html;
          });
          e.preventDefault();
       });


       // This my starting attempt at showing orders -- I didn't get time to finish it
      // handle "Show Order Data" submit button click
      $('#show-order').click(e => {

        e.preventDefault();
        let customers;
        let html = '';
        $.ajax({
          type: 'GET',
          url: 'http://localhost:8000/customers/'
        })
          .done(function (data) {
            customers = data;
            customers.map(async (c) => {
              let orders;
              
              $.ajax({
                type: 'GET',
                url: `http://localhost:8000/orders/${c._id}`
              }).done((res) => {
                
                orders = res
                console.log(orders)
                html +=
                  `<div class="col-lg-2 col-md-3 col-sm-4 col-6" id="order-details" style="margin: 20px">
                    <div class="card text-center" style="width: 18rem;">
                      <div class="card-body bg-light mb-3">
                        <div class="card-title">
                          <h1> Order number </br>${orders._id} </h1>
                        </div>
                        <div class="card-text">
                          Customer <em>${customers.customer_id}</em> 
                          Name <em>${customers.first_name} ${customer.surname}</em>
                        </div>
                        <div class="order-buttons" style="margin-top: 20px">
                          <button name="delete-order"
                          class="btn btn-danger deleteOrderButton" onclick="deleteOrder('${orderID}')">
                            Delete Order &nbsp;<span class="fa fa-trash-o fa-lg"></span>
                          </button>
                        </div>
                      </div>
                  </div>`

              })
              //document.querySelector('.product-collection').innerHTML = html;
            })
          })
            
            
              
          
            
         });
        
      

      // Handles "Hide Customer Data" button click
      $('#hide-cust').click(e => {
        document.querySelector('#customer-collection').innerHTML = '';
        e.preventDefault();
      })

      // Handles "Hide ProductData" button click
      $('#hide-product').click(e => {
        document.querySelector('#product-collection').innerHTML = '';
        e.preventDefault();
      })

      // Handles "Hide Order Data" button click
      $('#hide-order').click(e => {
        document.querySelector('.order-collection').innerHTML = '';
        e.preventDefault();
      })

      // The following funcitons handle different button clicks and hide/display the appropriate forms/buttons
      $("#addCustomerButton").click( e => {
        //console.log('clicked');
        e.preventDefault();
        $('#add-customer').show();
        $('#addCustomerButton').hide();
        $("#customer-data-show").hide();
        $("#product-data-show").hide();
        $("#order-data-show").hide();
      })

      $("#addProductButton").click(e => {
        //console.log('clicked');
        e.preventDefault();
        $('#add-phone-form').show();
        $('#addProductButton').hide();
        $("#customer-data-show").hide();
        $("#product-data-show").hide();
        $("#order-data-show").hide();
      })


      // This function displays the products adn customer options when the user wants to make an order
      $("#addOrderButton").click(e => {
        //console.log('clicked');
        e.preventDefault();
        $('#add-order-form').show();
        $('#addOrderButton').hide();
        $("#customer-data-show").hide();
        $("#product-data-show").hide();
        $("#order-data-show").hide();


        // AJAX call to retrieve products from database
        $.ajax({
          type: 'GET',
          url: 'http://localhost:8000/products/'
        })
          .done((data) => {
            let html = '';
            data.forEach((product) => {
              $('#productChoice').append(
                
                `<div class="d-flex justify-content-center">
                    <div class="checkbox">
                      <label for="checkboxes-0">
                        <input type="checkbox" name="checkboxes" class="productChecks" value="${product._id}">
                          ${product.manufacturer} ${product.model} &nbsp;<em>€${product.price}<em>
                      </label>
                      </div>
                    </div>`
              )
        })
      }).done(() => {
        // AJAX call to retrieve custoemr options from database
        $.ajax({
          type: 'GET',
          url: 'http://localhost:8000/customers/'
        }).done((data) => {
          let html = '';
          data.forEach( (customer) => {

             $('#customerOrderSel').append(
              `<option value="${customer._id}">${customer.first_name} ${customer.surname}</option>`);

          })
        })
      })
    })

  });
