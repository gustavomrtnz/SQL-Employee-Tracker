--TODO: create in formation to be inserted into tables from schema.sql
INSERT INTO departments (name)
VALUES  ('Engineering'),
        ('Finance'),
        ('Sales'),
        ('Legal');

INSERT INTO roles (title, salary,department_id)
VALUES  ('Software Engineer', 80000, 1),
        ('Project Manager', 100000, 1),
        ('Accountant', 70000, 2),
        ('Financial Analyst', 85000, 2),
        ('Sales Representative', 60000, 3),
        ('Marketing Manager', 80000, 3),
        ('Legal Advisor', 90000, 4),
        ('Head of Legal', 120000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Doe', 1, NULL),
        ('Jane', 'Smith', 2, 1),
        ('Michael', 'Johnson', 3, 2),
        ('Sarah', 'Williams', 4, 3),
        ('David', 'Brown', 5, 4),
        ('Samantha', 'Jones', 6, 5),
        ('David', 'Garcia', 7, 6),
        ('Emily', 'Davis', 8, NULL);