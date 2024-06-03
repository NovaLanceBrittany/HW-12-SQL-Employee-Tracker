-- Joining References -- 

-- Employee Table
-- == The Employee Table has the most amount of variables and we want to add those to both the Department Table and allow for managers to be chosen for those employees with the CONCAT Function - as they are still employees too. 
SELECT employee.id, employee.first_name, employee.last_name, role.tile, department.name AS Department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON department.id = role.department_id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id


-- Roles Table 
-- == the Roles Table has title and salary originally part of thier variables. We want to add in these variable to the Department Table.
SELECT role.id, role.title, department.name AS department, role.salary
FROM role
LEFT JOIN department ON department.id = role.department_id;


-- Department Table 
-- == The Department Table only has the name as a variable, as we add more variables from the other tables, we want to select all of them with the (*). 
SELECT * FROM department;



-- Unique Viewing of the Tables: 

-- View all Employees by Manager
-- == We are grabbing everything from the original select statement from line: 17, as we are selecting the same information but just displaying it in a different order, this time by Manager. 
SELECT employee.id, employee.first_name, employee.last_name, role.tile, department.name AS Department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id
ORDER BY manager.id;


-- View all Employees by Department
-- == Just like before we are grabbing everything from line 17 but this time wanting to view everything by department. 
SELECT employee.id, employee.first_name, employee.last_name, role.tile, department.name AS Department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id
ORDER BY department.id;


-- ======================= --

-- -- Updating Information

-- -- Update the Managers to the Employees (Manager: Joedeceives)
-- UPDATE employee
-- SET manager_id = NULL
-- WHERE id = 7;


-- -- ======================= --

-- -- Deleting Information

-- -- Delete a Department 
-- DELETE FROM department_id
-- WHERE id = 6;

-- -- Delete a Role
-- DELETE FROM role_id
-- WHERE id = 4;

-- -- Delete a Employee
-- DELETE FROM employee_id
-- WHERE id = 3;

