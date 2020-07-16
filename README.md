# paysafe-checkout-ROIIM
This is a simple E-commerce website where users can purchase products from an existing list of products and make Payments.
Payment functionality is implemented using Paysafe. (All the payments are test payments and funds are not actually deducted from cards)

Below are the instructions to deploy and use the application locall:

  Pre Requisits:
    latest version of `node`
    latest version of `nodemon`
    latest version of `npm`
    latest version of `Postgres`

There are three different parts of this project
  1. Backend (Implemented using NodeJs)
  2. Frontend (Implemented using ReactJs)
  3. Database (PostgreSQL)

To successfully deploy the application you should clone this repository, checkout `development` branch and do the following
  1. Create a Postgres user `postgres` with password `Pass@123`
  2. Create a Postgres database `e_commerce`
  3. Using the `paysafe-checkout-ROIIM/e_commerce.sql` file update the `e_commerce` database
  4. Checkout `paysafe-checkout-ROIIM/backend` directory and run the following commands
  
    `npm install`
    
    `npm start` or `nodemon`
    
  5. Checkout `paysafe-checkout-ROIIM/` directory in another terminal and run the following commands
  
    `npm install`
    
    `npm start`
    
  6. Connect to `localhost:3000` and start using the application


How to use?

  After successfull completion of the above steps you should see a list of products on `localhost:3000`.
  You can add any of those products to cart and proceed to checkout.
  You can individual products or clear the entire cart on `localhost:3000/cart`
  You can then proceed to checkout where you will need to fill all the details necessary to process the payment
  After filling those details you can proceed to payment where you'll need to fill the required payment details.
  Important thing to note here is that you have to enter your state and country code in the input i.e. for Maharashtra
  you should write `MH` and for India you should write `IN`.
  With successfull payment you will be redirected to the `localhost:3000` page where you can again do the same things.
  
  You can also login to the Application which will allow you to take advantage of the card saving functionality that paysafe provides.
  To login you should be a registered user first.
  Your can register from `localhost:3000/register` using your information such as:
    `username, email, first name, last name, phone, date of birth, password`
  After the registration you will recieve a verification email on the email address that you provided.
  Clicking on the verification link will enable you to login and use the application.
  
  After loging in with `username` and `password` when you go to the checkout page you will notice that all the details are prefilled.
  You can either use those details or use some other details to go ahead with the payment.
  While making the payment you can chose to save you card which will be visible to you as a saved card from the next transaction onwards.
  
  
  The entire application is made from scratch in just over 2 days some imperfections might be there and 
  some of the things need more working, for example: form input validations etc.
  
  
  For any queries You can contact:
  
  Faraz Saifullah
  
  Phone: +91 - 91453 82864
  
  Email: isaifullah01@gmail.com
  
  LinkedIn: https://in.linkedin.com/in/faraz-saifullah`
