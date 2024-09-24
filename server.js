// IMPORT Dependencies
const inquirer = require("inquirer");
const { Pool } = require('pg');

// Connect to PostgreSQL database
const pool = new Pool({ // Replace with your own credentials
  user: 'your_username',
  password: 'your_password',
  host: 'localhost',
  database: 'your_database_name'
});

// Main function to handle user interactions
function startingQuestion() {
  inquirer.prompt([ // Prompt the user to choose an action
      {
          type: 'list',
          name: 'intro',
          message: 'What would you like to do?',
          choices:[
              'View All Employees',
              'Add Employee',
              'Update Employee Role',
              'View All Roles',
              'Add Role',
              'View All Departments',
              'Add Department',
              'Quit'
          ]
      }
  ])
  .then(answers => { // Switch based on the user's choice
    switch(answers.intro) {
      case 'View All Employees':
        viewEmployees();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Update Employee Role':
        updateEmployeeRole();
        break;
      case 'View All Roles':
        viewRoles();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'View All Departments':
        viewDepartments();
        break;
      case 'Add Department':
        addDepartment();
        break;
      case 'Quit':
        pool.end();
        break;
    }
  });
};

function viewDepartments() { // Function to view all departments
  pool.query('SELECT id, name FROM departments', (err, res) => { // Query the database for all departments
    if (err) throw err;
    console.table(res.rows); // Display the results in a table
    startingQuestion();
  });
};

function viewRoles() {
  pool.query('SELECT id, title, salary FROM roles', (err, res) => { //
    if (err) throw err;
    console.table(res.rows);
    startingQuestion();
  });
};

function viewEmployees() { // Function to view all employees
  pool.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON employees.department_id = departments.id', (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    startingQuestion();
  });
};

function addDepartment() { // Function to add a new department
  inquirer.prompt([
      {
          type: 'input',
          name: 'department',
          message: 'Enter the name of the department you would like to add:'
      }
  ])
 .then(answers => { // Insert the new department into the database
   pool.query('INSERT INTO departments (name) VALUES ($1)', [answers.department], (err, res) => {
     if (err) throw err;
     console.log('Department added successfully!');
     startingQuestion();
   });
  });
};

function addRole() { // Function to add a new role
  inquirer.prompt([
      {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role you would like to add:'
      },
      {
          type: 'input',
          name:'salary',
          message: 'Enter the salary for this role:',
          validate: function(value) {
            if (!isNaN(parseFloat(value)) && isFinite(value)) { // Check if the input is a valid number
              return true;
            }
            return 'Please enter a valid number.';
          }
      }
  ])
 .then(answers => {
   pool.query('INSERT INTO roles (title, salary) VALUES ($1, $2)', [answers.title, answers.salary], (err, res) => {
     if (err) throw err;
     console.log('Role added successfully!');
     startingQuestion();
   });
  });
};

function addEmployee() { // Function to add a new employee
  inquirer.prompt([
      {
          type: 'input',
          name: 'first_name',
          message: 'Enter the first name of the employee:'
      },
      {
          type: 'input',
          name: 'last_name',
          message: 'Enter the last name of the employee:'
      },
      {
          type: 'list',
          name: 'role_id',
          message: 'Choose the role for this employee:',
          choices: function() {
            return pool.query('SELECT id, title FROM roles') // Query the database for all roles
             .then(res => res.rows.map(row => ({name: row.title, value: row.id })));
          }
      },
      {
          type: 'list',
          name: 'department_id',
          message: 'Choose the department for this employee:',
          choices: function() {
            return pool.query('SELECT id, name FROM departments')
             .then(res => res.row.map(row => ({name: row.name, value: row.id })));
          }
      }])
      .then(answers => {
        pool.query('INSERT INTO employees (first_name, last_name, role_id, department_id) VALUES ($1, $2, $3, $4)', [answers.first_name, answers.last_name, answers.role_id, answers.department_id], (err, res) => {
          if (err) throw err;
          console.log('Employee added successfully!');
          startingQuestion();
        });
      });
    };

    startingQuestion();

    // Close the database connection when the script ends
    // pool.end();

// TODO: Implement updating employee role

      
      

