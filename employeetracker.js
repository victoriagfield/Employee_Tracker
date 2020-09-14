//Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

//creates connection for the SQL Database
const connection = mysql.createConnection({
  host: "localhost",

  //sets up the port
  port: 3306,

  //username
  user: "root",

  //password
  password: "12345678",
  database: "employee_trackerDB"
});

//connects to MySQL server and database
connection.connect(function (err) {
  if (err) throw err;
  userPrompt(); //function here
});

//Prompts initial employee questions
function userPrompt() {
  inquirer.prompt({
    type: "list",
    name: "firstQuestion",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Employees by Department",
      "Add Employee",
      "Add Employee Role",
      "Update Employee Role",
      "View Employee Roll",
      "Add Employee Department",
      "Remove Employee",
      "Exit"
    ]
  }).then(userInput => {
    switch (userInput.firstQuestion) {
      case "View All Employees":
        viewEmployees(userInput);
        break;
      case "View All Employees by Department":
        viewByDepartment(userInput);
        break;
      case "Add Employee":
        addEmployee(userInput);
        break;
      case "Add Employee Role":
        addRole(userInput);
        break;
      case "View Employee Role":
        viewRole(userInput);
        break;
      case "Add Employee Department":
        addDepartment(userInput);
        break;
      case "Remove Employee":
        employeeDelete(userInput);
        break;
      case "Exit":
        connection.end(userInput);
        break;
    }
  });
};

//function to add new employee
function addEmployee() {
  inquirer.prompt({
    type: "input",
    name: "firstName",
    message: "Please input the employee's first name."
  }, {
    type: "input",
    name: "lastName",
    message: "Please input the employee's last name."
  }).then(employeeAnswer =>{
    connection.query("INSERT INTO employee SET ?", {
      firstName: employeeAnswer.firstName,
      lastName: employeeAnswer.lastName}, function (error, result) {
      if (error) {
        throw error;
      } else {
        console.log("New Employee Added");
        console.table(employeeAnswer);
        promptUser();
      }
    });
  });
}

//function to add new department
function addDepartment() {
  inquirer.prompt({
    type: "input",
    name: "addDepartment",
    message: "What department does the employee work in?",
    choices: [
      "Sales",
      "Engineering",
      "Finance",
      "Legal",
    ]
  }).then(answer => {
    connection.query("INSERT INTO department SET ?", {
      department: answer.addDepartment
    }, function (error, result) {
      if (error) {
        throw error;
      } else {
        console.log("New Department Added");
        console.table(answer);
        promptUser();
      }
    });
  });
}

//function to add new role
function addRole() {
  inquirer.prompt({
    type: "list",
    name: "roleChoices",
    message: "What is the employee's title?",
    choices: [
      "Sales Lead",
      "Salesperson",
      "Software Engineer",
      "Account Manager",
      "Accountant",
      "Legal Team Lead"
    ]
  }, {
    type: "input",
    name: "salary",
    message: "What is the salary for this role?"
  }, {
    type: "input",
    name: "departmentID",
    message: "Please input the department ID for this role."
  }).then(roleAnswer => {
    connection.query("INSERT INTO role SET ?", {
      role: roleAnswer.roleChoices,
      salary: roleAnswer.salary,
      departmentID: roleAnswer.departmentID
    }, function (error, result) {
      if (error) {
        throw error;
      } else {
        console.log("New Role Added")
        console.table(roleAnswer);
        promptUser();
      }
    });
  });
}

//function to view all employees


//function to view all by department


//function to view employee role


//function to delete employee