// Global Depenancies

const inquirer = require('inquirer');
const { Pool } = require('pg');
const fs = require('fs').promises;

// displays the data as a table
const contab = require('console.table');

// This is how we connect to the database
const pool = new Pool(
  {
    user:'psql postgres',
    password:'5akura',
    host: 'localhost',
    database: "employee_db"
  }, 
  console.log('Welcome to the Employee Database!')
)

pool.connect();
function start() {
  inquirer.prompt([
  {
    type: 'lsit',
    message: 'Main Menue: Please select from the list below.',
    name: 'main',
    choices: [
      'View All Employees', 
      'View All Roles',
      'View All Departments',
      'Add Employee',
      'Add Role',
      'Add Department',
      'Update Employee Role',
      'Quit'
    ] 
  }

  .then((response) => {
    const { main } = response;

    switch (main) {
      case 'View All Employees':
        viewAllEmployees();
        break;
        case 'View All Roles':
        viewAllRoles();
        break;
        case 'View All Departments':
        viewAllDepartments();
        break;
        case 'Add Employee':
        addEmployee();
        break;
        case 'Add Role':
        addRole();
        break;
        case 'Add Department':
        addDepartment();
        break;
        case 'Update Employee Role':
        updateEmployeeRole();
        break;
    }

    console.log('testing for quesitons", response.main')

  })
])}


// Display Table Funcations

viewAllEmployees = () => {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.tile, department.name AS Department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON department.id = role.department_id
  LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;

  pool.query(sql, (err, results) => {
    if (err) throw err;

    //displays the table
    contab (results.rows);

    // brings you back to the main menue
    start();
  })
}

start();
