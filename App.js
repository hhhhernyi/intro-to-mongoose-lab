// imports
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const prompt = require("prompt-sync")();
const CustomerController = require('./controllers/CustomerController')
dotenv.config();
let newChoice='';

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  prompt("Hello and welcome to the Customer Management System! Please press enter to continue.");
  const username = prompt("What is your name? ");
  console.log(`Good day to you ${username}, what would you like to do today? 
    \n 1. Create new customer 
    \n 2. View all customers 
    \n 3. Update a customer 
    \n 4. Delete a customer
    \n Please enter options 1 - 4: `);
  const userChoice = prompt('Your choice: ')
  await runQueries(userChoice);
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
  process.exit();
};

// create a function to handle the next steps after the user is done with their main task
async function chooseNextAction() {
  console.log(`What else would you like to do? 
    \n 1. Create new customer 
    \n 2. View all customers 
    \n 3. Update a customer 
    \n 4. Delete a customer
    \n 5. Quit app
    \n Please enter options 1 - 5: `);
     newChoice = prompt('Your choice: ')
     await runQueries(newChoice);

}

async function runQueries(userChoice) {
  switch (userChoice) {
    case "1": // CREATE
      prompt("Welcome to the Create customer page! Please press enter to get started.");
      const customerName = prompt("What is the customer's name? ");
      const customerAge = prompt("What s the customer's age? ");
      prompt( `The customer name is ${customerName} and their age is ${customerAge}, Please press enter to confirm and create customer`);
      await CustomerController.createCustomer(customerName, customerAge); // separation of concern by putting this into a controllers folder
      await chooseNextAction(); // after we are done creating the user, choose next action
      break;

    case "2": // READ
      prompt("Welcome to view all customers page! Please press enter to get started");
      await CustomerController.viewCustomers();
      await chooseNextAction(); // after we see all customer, choose next action
      break;

    case "3": // UPDATE
      prompt("Welcome to the update customers page. Please press enter to continue.")
      await CustomerController.viewCustomers(); // this is to see the full list of customers again
      const updateId = prompt('Copy and paste the id of the customer you would like to update here: ')
      const newName = prompt('What is the customers new name? Leave blank if you do not want to update. ')
      const newAge = prompt('What is the customers new age? Leave blank if you do not want to update.  ')
      prompt(`User: ${updateId} name is being updated to '${newName}' and age is being updated to '${newAge}'. Please press enter to confirm and update customer`)
      await CustomerController.updateCustomer(updateId,newName,newAge);
      await chooseNextAction(); // after updating customer, choose next action
      break;

    case "4": // DELETE
      prompt("Welcome to the delete customers page. Please press enter to continue.")
      await CustomerController.viewCustomers(); // this is to see the full list of customers again
      const deleteId = prompt('Copy and paste the id of the customer you would like to update here: ')
      prompt(`you have chosen to delete user ${deleteId}. Please press enter to continue.`)
      await CustomerController.deleteCustomer(deleteId);
      await chooseNextAction(); // after deleting customer, choose next action
      break;

    case "5":
      prompt('Thank you, we hope to see you again! Please press enter to quit.')
      mongoose.connection.close()
      break;
    }
  }

connect();