//TODO: Import necessary modules
const inquire = require('inquirer');
const mySql = require('mysql');
const consoleTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'postgres',
        password: 'Elfurcio2011',
        database: 'employees_db',
    },
    console.log(`Connected to employees_db!`)
);

cli_prompt();
const mainPrompt = [
    
    {

        name: "action",
        type: "list",
        message: "Select an action",
        choices: [
            
            "View employees",
            "View roles",
            "View departments",
            "Add department",
            "Add role",
            "Add employee",
            "Edit employee",
            "Remove employee",
            "EXIT"
            
        ]
        
    }

];

function cli_prompt() {
    inquire.prompt(mainPrompt).then((answers) => {
        switch (answers.action) {
            case "View employees":
                viewEmployees();
                break;
            case "View roles":
                viewRoles();
                break;
            case "View departments":
                viewDepartments();
                break;
            case "Add department":
                addDepartment();
                break;
            case "Add role":
                addRole();
                break;
            case "Add employee":
                addEmployee();
                break;
            case "Edit employee":
                editEmployee();
                break;
            case "Remove employee":
                removeEmployee();
                break;
            case "EXIT":
                db.end();
                break;
        }
        cli_prompt();
    });
}

function viewEmployees() {
    const query = "SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department_name FROM employees e LEFT JOIN roles r ON e.role_id = r.id LEFT JOIN departments d ON e.department_id = d.id ORDER BY e.id;";
    db.query(query, (err, results) => {
        if (err) throw err;
        console.table(results);
    });
}

function viewRoles() {
    const query = "SELECT id, title, salary FROM roles ORDER BY id;";
    db.query(query, (err, results) => {
        if (err) throw err;
        console.table(results);
    });
}

function viewDepartments() {
    const query = "SELECT id, name FROM departments ORDER BY id;";
    db.query(query, (err, results) => {
        if (err) throw err;
        console.table(results);
    });
}

function addDepartment() {
    inquire.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter the department name:"
        }
    ]).then((answers) => {
        const query = "INSERT INTO departments (name) VALUES (?);";
        db.query(query, [answers.name], (err, result) => {
            if (err) throw err;
            console.log(`Added department with id: ${result.insertId}`);
        });
    });
}

function addRole() {
    inquire.prompt([
        {
            name: "title",
            type: "input",
            message: "Enter the role title:"
        },
        {
            name: "salary",
            type: "input",
            message: "Enter the role salary:",
            validate: (value) => {
                if (isNaN(value) || value <= 0) {
                    return "Salary must be a positive number.";
                }
                return true;
            }
        }
    ]).then((answers) => {
        const query = "INSERT INTO roles (title, salary) VALUES (?, ?);";
        db.query(query, [answers.title, answers.salary], (err, result) => {
            if (err) throw err;
            console.log(`Added role with id: ${result.insertId}`);
        });
    });
}

function addEmployee() {
    inquire.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Enter the employee's first name:"
        },
        {
            name: "last_name",
            type: "input",
            message: "Enter the employee's last name:"
        },
        {
            name: "role_id",
            type: "input",
            message: "Enter the employee's role id:",
            validate: (value) => {
                if (isNaN(value) || value <= 0) {
                    return "Role id must be a positive number.";
                }
                return true;
            }
        },
        {
            name: "department_id",
            type: "input",
            message: "Enter the employee's department id:",
            validate: (value) => {
                if (isNaN(value) || value <= 0) {
                    return "Department id must be a positive number.";
                }
                return true;
            }
        }   ])};