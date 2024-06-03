// Global Depenancies
const inquirer = require('inquirer');
const { Pool } = require('pg');
const fs = require('fs').promises;

// displays the data as a table
const contab = require('console.table');

// This is how we connect to the database
const pool = new Pool(
  {
    user:'postgres',
    password:'5akura',
    host: 'localhost',
    database: "employee_db"
  }, 
  console.log('Welcome to the Employee Database!')
)

function start() {
  inquirer.prompt([
  {
    type: 'list',
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
  }])

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
        case 'Quit':
        pool.end();
        break;
    }

    // console.log('testing for quesitons", response.main')

  })
}


// Display Table Funcations
// == View All Employees
viewAllEmployees = () => {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS Department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON department.id = role.department_id
  LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;

  pool.query(sql, (err, results) => {
    if (err) throw err;

    //displays the table
    console.table(results.rows);

    // brings you back to the main menue
    start();
  })
}


// == View All Roles
viewAllRoles = () => {
  const sql = `SELECT role.id, role.title, department.name AS department, role.salary
  FROM role
  LEFT JOIN department ON department.id = role.department_id;`;

  pool.query(sql, (err, results) => {
    if (err) throw err;

    //displays the table
    console.table(results.rows);

    // brings you back to the main menue
    start();
  })
}


// == View All Departments
viewAllDepartments = () => {
  const sql = `SELECT * FROM department`;

  pool.query(sql, (err, results) => {
    if (err) throw err;

    //displays the table
    console.table(results.rows);

    // brings you back to the main menue
    start();
  })
}


// Add Object Functions
// == Add Department
addDepartment = () => {
  inquirer.prompt([

    // This will ask the name of the Department
    {
      type: 'input',
      message: 'What is the new Department Name?',
      name: 'newdepart',
      validate: addDepartment => {
        if (addDepartment) {
          return true;
        } else {
          console.log('Please enter a suitable name for a Department: ');
          return false;
        }
      }
    }
  ]).then ((results) => {
    // all department names will be placed into an array
    const params = [results.newdepart];

    // $1 = is the value inputed by the user
    const sql = `INSERT INTO department (name) VALUES ($1)`; 
    
    pool.query(sql, params, (err, results) => {
      if (err) throw err;
  
      // Confirmation message to the user that the department was added
      console.log("Your New Department has been added!")

      // brings you back to the main menue
      start();
    })
  })
}
  

// == Add Role
addRole = () => { 
  
  // We need to have the Department Table available to us for us to add information to it. 
  const departmentSql = `SELECT * FROM department`;
  pool.query(departmentSql, (err, data) => {
    if (err) throw err;

    // rolepartment = role-department, its so we can add the role to the array and then maping over the array and choosing which one it will be added to the department by the user 
    const rolepartment = data.rows.map(({id, name}) => ({name: name, value: id}));
  

    inquirer.prompt([

      // This will ask the name of the Role
      {
        type: 'input',
        message: 'What is the new Role Name?',
        name: 'title',
        validate: addRole => {
          if (addRole) {
            return true;
          } else {
            console.log('Please enter a suitable name for a Role: ');
            return false;
          }
        }
      },

      // This will ask the Salary suited for the Role
      {
        type: 'input',
        message: 'What is the Salary of the new Role?',
        name: 'salary',

        // we need to make sure it returns a INTERGER
        validate: addSalary => {
          if (addSalary) {
            return true;
          } else {
            console.log('Please enter a salary for a Role: ');
            return false;
          }
        }
      },

      // This will ask the user which Department the Role belongs to. 
      {
        type: 'list',
        message: 'What Department do you want to assign this Role to?',
        name: 'department',
        choices: rolepartment
      },

    ]).then ((results) => {
      // all role titles will be placed into an array with its paired salary and department
      const params = [results.title, results.salary, results.department];

      // $1 = is the value inputed by the user, but for each paramerter, there is a new value holder ($2, $3, ect)
      const sql = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`; 

      pool.query(sql, params, (err, results) => {
        if (err) throw err;
    
        // Confirmation message to the user that the role was added
        console.log("Your New Role has been added with a Salary and assigned to a Department!")

        // brings you back to the main menue
        start();
      })
    })
  })
}


// == Add Employee
addEmployee = () => {

  //This time we need the Role Table to be available to us
  const rolesql = `SELECT * FROM role`;
  pool.query(rolesql, (err, data) => {
    if (err) throw err;

    // role- its so we can add the role to the array, then we map over the array, and then choose which employee will be added to an role by the user
    const role = data.rows.map(({id, title}) =>
    ({name: title, value: id}));

    // We need to have the Employee Table available to us for us to add information to it. 
    const employeesql = `SELECT * FROM employee`;
    pool.query(employeesql, (err, data) => {
      if (err) throw err;

      // employee - to add Manager
      const employee = data.rows.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));

    inquirer.prompt([
      {
        type: 'input',
        message: 'Please enter the First Name of the new Employee:', 
        name: 'first_name', 
        validate: addFirstName => {
          if (addFirstName) {
          return true;
          } else {
            console.log("Enter the First Name of the Employee you are trying to add to the database.");
            return false;
          }
        }
      }, 

      {
        type: 'input',
        message: 'Please enter the Last Name of the new Employee:', 
        name: 'last_name', 
        validate: addLastName => {
          if (addLastName) {
          return true;
          } else {
            console.log("Enter the Last Name of the Employee you are trying to add to the database.");
            return false;
          }
        }
      }, 

      {
        type: 'list',
        message: "What will be the new Employee's Role at the Company?", 
        name: 'emrole', 
        choices: role,
        validate: addEmRole => {
          if (addEmRole) {
          return true;
          } else {
            console.log("Enter the Role of the Employee you are trying to add to the database.");
            return false;
          }
        }
      }, 

      {
        type: 'list',
        message: 'Will there be a Manager assigned to the new Employee?', 
        name: 'manager', 
        choices: employee,
        validate: addManager => {
          if (addManager) {
          return true;
          } else {
            console.log("Enter the name of the Manager to be assignd to the Employee you are trying to add to the database.");
            return false;
          }
        }
      }
    ]).then ((results) => {
      const params = [results.first_name, results.last_name, results.emrole, results.manager];

      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;

      pool.query(sql, params, (err, results) => {
        if (err) throw err;

        // Confirmation message to the user that the employee was added
        console.log("Your New Employee has now been added to the database!")

        // brings you back to the main menue
        start();
      })
    })
  })
})},


// == Update Employee Role
updateEmployeeRole = () => {

  //
  const rolesql = `SELECT * FROM role`;
  pool.query(rolesql, (err, data) => {
    if (err) throw err;

    // role- its so we can add the role to the array, then we map over the array, and then choose which employee will be added to an role by the user
    const role = data.rows.map(({id, title}) =>
    ({name: title, value: id}));

    // We need to have the Employee Table available to us for us to add information to it. 
    const employeesql = `SELECT * FROM employee`;
    pool.query(employeesql, (err, data) => {
      if (err) throw err;

      // employee - to add Manager
      const employee = data.rows.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));

    inquirer.prompt([
      {
        type: 'list',
        message: "Which Employee's Role do we want to change?", 
        name: 'employee', 
        choices: employee
      },

      {
        type: 'list',
        message: "What Role do you want to assign?", 
        name: 'role', 
        choices: role,
      }

    ]).then ((results) => {
      const params = [results.employee, results.role];

      const sql = `UPDATE employee SET role_id = $2 WHERE id = $1`;

      pool.query(sql, params, (err, results) => {
        if (err) throw err;

        // Confirmation message to the user that the employee was added
        console.log("Your Employee has been updated to a new role!")

        // brings you back to the main menue
        start();
      })
    })
  })
})},





start();
