const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL Username
    user: 'root',
    // TODO: Add MySQL Password
    password: 'password',
    database: 'employees_db'
  },
  // console.log(`Connected to the employees_db database.`)
);

function start() {
inquirer
  .prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'menu',
        choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department'],
      },
  ])
  .then((response) => {
    if (response.menu === 'View Departments') {
      viewDepartments();
    } else if (response.menu === 'Add Department') {
      addDepartment();
    } else if (response.menu === 'View Roles') {
      viewRoles();
    } else if (response.menu === 'View Employees') {
      viewEmployees();
    }
  });
}

function viewDepartments() {
  db.query('SELECT * FROM departments', function (err, results) {
    console.table(results);
    start();
  });
}

function viewRoles() {
  db.query('SELECT * FROM roles', function (err, results) {
    console.table(results);
    start();
  });
}

function viewEmployees() {
  db.query('SELECT * FROM employees', function (err, results) {
    console.table(results);
    start();
  });
}

function addDepartment() {
inquirer
  .prompt([
    {
      type: 'input',
      message: 'Type in department name.',
      name: 'department',
    }
  ])
  .then((response) => {
    console.log(response)
    const sql = `INSERT INTO departments (department_name)
    VALUES (?)`;
    const params = [response.department];
  
  db.query(sql, params, (err, result) => {
   console.log("Success!")
  });
  })
  
}

start();