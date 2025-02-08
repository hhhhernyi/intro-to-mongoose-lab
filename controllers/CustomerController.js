// i need to import the model here to use it
const Customer = require("../models/Customer");

async function createCustomer(customerName, customerAge) {
    const customerInfo = {
        name: customerName,
        age: customerAge,
    };
    const createdCustomer = await Customer.create(customerInfo);
    console.log('new customer!: ', createdCustomer)
}

async function viewCustomers() {
    const allCustomers = await Customer.find({})
    console.log('Here is the list of all our customers: \n ')
    for (let i=0; i<allCustomers.length; i++) {
     console.log(`id:  ${allCustomers[i]._id.toString()} ----- Customer Name: ${allCustomers[i].name}, Customer Age: ${allCustomers[i].age} `)
    }
    
 }

async function updateCustomer(updateId,newName,newAge ) {
    const chosenCustomer = await Customer.findById(updateId)
    const updateData = {
        name: newName? newName: chosenCustomer.name,
        age: newAge? newAge: chosenCustomer.age,
    }
    const updatedCustomer = await Customer.findByIdAndUpdate(
        updateId,
        updateData,
        {new: true}

    );
    console.log('updated customer: ', updatedCustomer)
}
async function deleteCustomer(deleteId) {
    const deletedCustomer = await Customer.findByIdAndDelete(deleteId)
    console.log(deletedCustomer)
}

module.exports = {
    createCustomer,
    viewCustomers,
    updateCustomer,
    deleteCustomer
}