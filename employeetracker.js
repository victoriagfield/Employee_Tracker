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
  console.log("connected as id " + connection.threadId);
  //function to start the questions
  userPrompt(); 
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
    name: "name",
    message: "Please input the employee's name."
    }).then(employeeAnswer =>{
    connection.query("INSERT INTO employee SET ?", 
    {
      employee_name: employeeAnswer.name,
    }, function (err) {
      if (err) {
        throw err;
      } else {
        console.log("New Employee Added");
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
    connection.query("INSERT INTO department SET ?", 
    {
      name: answer.addDepartment
    }, function (err) {
      if (err) {
        throw err;
      } else {
        console.log("New Department Added");
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
    connection.query("INSERT INTO role SET ?", 
    {
      title: roleAnswer.roleChoices,
      salary: roleAnswer.salary,
      department_id: roleAnswer.departmentID
    }, function (err) {
      if (err) {
        throw err;
      } else {
        console.log("New Role Added")
        promptUser();
      }
    });
  });
}

//function to view all employees
function viewEmployees(){
  connection.query("SELECT employee_name FROM employee", function (err, result){
    if (err) {
      throw err
    } else {
      console.log(result);
      console.table(result);
      promptUser();
    }
  });
}

//function to view all by department
function viewByDepartment(){
  connection.query("SELECT name FROM department", function(err, result){
    if (err) {
      throw err 
      } else {
        console.log(result);
        console.table(result);
        promptUser();
      }
  });
}


//function to view employee role
function viewRole(){
  connection.query("SELECT title FROM role", function (err, result){
    if(err){
      throw err
    } else {
      console.log(result);
      console.table(result);
      promptUser();
    }
  });
}


//function to delete employee
function employeeDelete(){

}