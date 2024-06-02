# 12 SQL: Employee Tracker

## The Challenge:

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called **content management systems (CMS)**. Your assignment this week is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and PostgreSQL.


## Project Conduction:

As a business owner, I want to be able to view and manage the departments, roles, and employees in my company - that way I can organize and plan my business more effectivly. 


## Acceptance Criteria

- With the command-line application that accepts user input, when the user start the application, they are  presented with the following options: 
  - view all departments
  - view all roles
  - view all employees
  - add a department
  - add a role
  - add an employee
  - update an employee role

- When the user chooses to view all departments, they are presented with a formatted table showing department names and department ids.

- When the user chooses to view all roles, they are presented with
  - job title
  - role id
  - the department that role belongs to
  - the salary for that role

- When the user chooses to view all employees, they are presented with a formatted table showing 
  - employee data
  - employee ids
  - first names
  - last names
  - job titles
  - departments
  - salaries
  - managers that the employees report to

- When the user chooses to add a department, they are  prompted to enter the name of the department and that department is added to the database.

- When the user chooses to add a role, they are prompted to enter the variables below for the role and that role is added to the database:
  - name
  - salary
  - department 

- When the user chooses to add an employee, they are  prompted to enter the employee’s information for the employee profile and that employee is added to the database:
  - first name
  - last name
  - role
  - manager

- When the user chooses to update an employee role, they are prompted to select an employee to update and their new role and this information is updated in the database 

#### Bonus List
- Application allows users to update employee managers
- Application allows users to view employees by manager 
- Application allows users to view employees by department
- Application allows users to delete departments, roles, and employees
- Application allows users to view the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.


## Technology Stacks:
- PostgreSQL


## npm Packages:
- Inquirer
- pg


## Mock-Up

The following screenshot shows an example of the application being used from the command line:

![A screenshot shows the command-line employee management application](./assets/)

- Please review the Google Drive below for a full video walkthrough.


## The Deployment:

The Repository: [Click Here.](https://github.com/NovaLanceBrittany/HW-12-SQL-Employee-Tracker)

The Google Drive: [Click Here.](https://drive.google.com/drive/folders/1aI_xm6MjSVz5ZbHi5ZtEBc2YxGKFKRR1?usp=sharing)
















## Getting Started


Design the database schema as shown in the following image:

![Database schema includes tables labeled “employee,” role,” and “department.”](./Assets/100-sql-challenge-ERD.png)

As the image illustrates, your schema should contain the following three tables:

* `department`

  * `id`: `SERIAL PRIMARY KEY`

  * `name`: `VARCHAR(30) UNIQUE NOT NULL` to hold department name

* `role`

  * `id`: `SERIAL PRIMARY KEY`

  * `title`: `VARCHAR(30) UNIQUE NOT NULL` to hold role title

  * `salary`: `DECIMAL NOT NULL` to hold role salary

  * `department_id`: `INTEGER NOT NULL` to hold reference to department role belongs to

* `employee`

  * `id`: `SERIAL PRIMARY KEY`

  * `first_name`: `VARCHAR(30) NOT NULL` to hold employee first name

  * `last_name`: `VARCHAR(30) NOT NULL` to hold employee last name

  * `role_id`: `INTEGER NOT NULL` to hold reference to employee role

  * `manager_id`: `INTEGER` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)

You might want to use a separate file that contains functions for performing specific SQL queries you'll need to use. A constructor function or class could be helpful for organizing these. You might also want to include a `seeds.sql` file to pre-populate your database, making the development of individual features much easier.




- schema.sql file, needs lots of join statements
  - create department table
  - create a role table
  - create a employee table
  - 

// the join statements
  SELECT employee,id, employee.first_name, emplyee.last_name, role.title, deparment.name, role,salary, manager.last_name, (on the last neme at the end here, look at hints)
  FROM emplyee
  JOIN role ON Employee.role_id = role.id
  JOIN department ON department.id = role.department_id


  // joining the employeee table on itself for the manager portion
JOIN emplyee AS manager ON employee.manager_id = manager.id

hints from gary: 
- want to combine manager.first_name + " " + manager.last_name
- SQL method to join these together begins with C