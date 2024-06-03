
-- Department Names
INSERT INTO department (name)
VALUES  ('Finance'),
        ('Customer Service'),
        ('IT'),
        ('Human Resources'),
        ('Operations'),
        ('Research & Development');


-- Role Titles & Salary
INSERT INTO role (title, salary, department_id)
VALUES  (' Jr. Engineer', 80000, 6),
        ('Project Manager', 60000, 2),
        ('Lead', 50000, 5),
        ('Associate', 40000, 1);


-- Employee First and Last Names (Call of Duty League referencing)
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('MajorManiac', 'Szymaniak', 1, NULL),
        ('Priestahh', 'Greiner', 3, 4),
        ('Snoopy', 'Lozano', 2, NULL),
        ('Beans', 'McMellon', 2, NULL),
        ('Ghosty', 'Rothe', 3, 7),
        ('Nastie', 'Plumridge', 3, 7),
        ('Joedeceives', 'Romero', 1, NULL),
        ('Kremp', 'Haworth', 4, 6);
