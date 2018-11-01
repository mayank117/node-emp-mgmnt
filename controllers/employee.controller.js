const fs = require('fs');

// Retrieve and return all notes from the database.
var findAll = (req, res) => {	
	return res.send(getAllEmployees());
};

// Find a single note with a noteId
var findById = (req, res) => {	
	var employee = findOne(req.params.id);
	if (employee){	
		res.send(employee);
	}else{
		res.status(404).send({
            message: "Employee does not exist."
        });
	}
};

// Update a note identified by the noteId in the request
var update = (req, res) => {
	var employee = findOne(req.params.id);	
	if (employee){
		employee.id =req.body.id;
    	employee.name= req.body.name;
    	employee.age= req.body.age;
    	employee.salary= req.body.salary;
    	var employees = getAllEmployees();
    	var finalEmployees = employees.filter((emp) => emp.id !== req.params.id);
    	finalEmployees.push(employee);
    	saveEmployees(finalEmployees);
    	res.send(employee);
	}else{
		res.status(500).send({
			message: "Unique employee not found."
		});
	}
};

// Delete a note with the specified noteId in the request
var deleteEmployee = (req, res) => {
	var employees = getAllEmployees();
	var finalEmployees = employees.filter((employee) => employee.id !== req.params.id);
	saveEmployees(finalEmployees);
	var deleted = employees.length !== finalEmployees.length;
	if (deleted){
		res.send({
            message: "Employee deleted successfully"
        });
	}else{
		res.status(500).send({
            message: "Employee id does not exist."
        });
	}

};

var getAllEmployees = () => {
	var employees = [];
	try{
		employeesString = fs.readFileSync('employees.json');
		employees = JSON.parse(employeesString);
	}catch(e){

	}
	return employees;
};

var saveEmployees = (employees) => {
	fs.writeFileSync('employees.json',JSON.stringify(employees));
}

var findOne = (id) =>{
	var employees = getAllEmployees();
	var filteredEmployees = employees.filter((employee) => employee.id === id);	
	if (filteredEmployees.length !== 0){
		return filteredEmployees[0];
	}

};

// Create and Save a new Employee
var create = (req, res) => {
	
	// Validate request
    if(!req.body.id) {
        return res.status(400).send({
            message: "Employee id can not be empty"
        });
    }

    var id = req.body.id;
    var name = req.body.name;
    var age = req.body.age;
    var salary = req.body.salary;

    // Save Employee
    var employees = getAllEmployees();

    var newEmployee={
    	id,
    	name,
    	age,
    	salary
    };

    var duplicateEmployees = employees.filter((employee) => employee.id === req.body.id);

    if (duplicateEmployees.length === 0){
    	employees.push(newEmployee);
    	saveEmployees(employees);
    	res.status(201).send(newEmployee);
    }else{
    	res.status(400).send({
            message: "Employee id already exists."
        });
    }

};

module.exports = {
	create,
	findAll,
	findById,
	update,
	deleteEmployee
}