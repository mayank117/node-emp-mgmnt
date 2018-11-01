// BASE SETUP
// =============================================================================
const employeeController = require('./controllers/employee.controller.js');
// call the packages we need
var express    = require('express');     
var app        = express();                 
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.route("/employees")
    .get(employeeController.findAll)
    .post(employeeController.create);
app.route("/employees/:id")
    .get(employeeController.findById)
    .put(employeeController.update)
    .delete(employeeController.deleteEmployee);

// app.get('/employees',function(req,res){employeeController.findAll(req,res)});
// app.post('/employees',function(req,res){employeeController.create(req,res)});
// app.get('/employees/:id',function(req,res){employeeController.findById(req,res)});
// app.put('/employees/:id',function(req,res){employeeController.update(req,res)});
// app.delete('/employees/:id',function(req,res){employeeController.deleteEmployee(req,res)});

app.listen(9899);