-- This is for when rebuilding the schema, that postgres has a db to switch off too to be able to select the correct db to drop
\c postgres;
DROP DATABASE IF EXISTS employee_db;

-- Creates the "employee_db" database --
CREATE DATABASE employee_db;

-- We now need to switch to our new db to make it active for the code to interact with --
\c employee_db;


-- Creates the table "department" within employee_db --
CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);


-- Creates the table "role" within employee_db --
CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);


-- Creates the table "employee" within employee_db --
CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL
  manager_id INTEGER

  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL,

  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);


