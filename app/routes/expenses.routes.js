module.exports = app => {
   const expenses = require("../controllers/expense.controller.js");
 
   var router = require("express").Router();
 
   // Create a new expense
   router.post("/", expenses.create);
 
   // Retrieve all expenses
   // home page for expenses api
   router.get("/", expenses.findAll);
 
   // Retrieve a single expense with id
   router.get("/:id", expenses.findOne);
 
   // Update a expense with id
   router.put("/:id", expenses.update);
 
   // Delete a expense with id
   router.delete("/:id", expenses.delete);
 
   // Delete all expenses
   router.delete("/", expenses.deleteAll);
 
   app.use('/api/expenses', router);
 };