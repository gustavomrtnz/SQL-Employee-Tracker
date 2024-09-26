// IMPORT Dependencies
const inquirer = require("inquirer");
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from.env file

// Connect to PostgreSQL database
const db = new Pool({ // Replace with your own credentials
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: 'employee_db'
},
  console.log(`Connected to the employee_db database.`)
);
db.connect()

// Main function to handle user interactions
let startingQuestion = function() {
  inquirer.prompt([ // Prompt the user to choose an action
    {
      type: 'list',
      name: 'intro',
      message: 'What would you like to do?',
      choices: [
        'View all Departments',
        'View all Roles',
        'View all employees',
        'Add a new department',
        'Add a new role',
        'Add a new employee',
        'Update an employee role',
        'Exit',
      ]
      
    }]).then((answers) => { // Handle user's choice based on the chouces 
      // if the user chooses to view all departments
      if (answers.intro === 'View all Departments') {
        //then query the database for all departments and display them in a table
        db.query('SELECT * FROM departments').then((res) => {
          console.table(res.rows);
          startingQuestion(); // return to the main menu after displaying the data
        });
        // if the user chooses to view all roles
      } else if (answers.intro === 'View all Roles') {
        //then query the database for all roles and display them in a table
        db.query('SELECT * FROM role').then((res) => {
          console.table(res.rows);
          startingQuestion();
        });
          // if the user chooses to view all employees
      } else if (answers.intro === 'View all employees') {
        //then query the database for all employees and display them in a table
        db.query('SELECT * FROM employee').then((res) => {
          console.table(res.rows);
          startingQuestion();
        });
          // if the user chooses to update an employee role
      } else if (answers.intro === 'Add a new department') {
        // then prompt the user to enter the name of the new department and add it to the database
        inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new department:',
          }
        ]).then((answers) => {
          // Add the new department to the database
          db.query('INSERT INTO departments (name) VALUES ($1)', [answers.name]).then(() => {
            console.log('Department added successfully.');
            startingQuestion();
          });
        });
          // if the user chooses to add a new role
      } else if (answers.intro === 'Add a new role') {
        // then prompt the user to enter the title of the new role, salary, and choose a department
        db.query('SELECT * FROM departments').then((res) => {
          // use the map function to create an array of department objects for the choices
          const departments = res.rows.map((dept) => ({
            name: dept.name,
            value: dept.id
          }));
          // prompt the user to enter the title of the new role, salary, and choose a department
          inquirer.prompt([
            {
              type: 'input',
              name: 'title',
              message: 'Enter the title of the new role:',
            },
            {
              type: 'input',
              name: 'salary',
              message: 'Enter the salary of the new role:',
            },
            {
              type: 'list',
              name: 'department_id',
              message: 'Choose the department:',
              choices: departments
            }
          ]
          )
          // then add the new role to the database
            .then((answers) => {
              db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answers.title, answers.salary, answers.department_id]).then(() => {
                console.log('Role added successfully.');
                startingQuestion();
              });
            });
        })
        // 8. if the user chooses to add a new employee
      } else if (answers.intro === 'Add a new employee') {
        db.query('SELECT * FROM role').then((res) => {
          // use the map function to create an array of role objects for the choices
          const roles = res.rows.map((role) => ({
            name: role.title,
            value: role.role_id
          }));
          // use the map function to create an array of employee objects for the choices
          db.query('SELECT * FROM employee').then((res) => {
            const managers = res.rows.map((emp) => ({
              name: emp.first_name + '' + emp.last_name,
              value: emp.employee_id
            }));
            // 8. then prompt the user to enter the first name, last name, role, and manager (leave blank for none)
            inquirer.prompt([
              {
                type: 'input',
                name: 'first_name',
                message: 'Enter the first name of the new employee:',
              },
              {
                type: 'input',
                name: 'last_name',
                message: 'Enter the last name of the new employee:',
              },
              {
                type: 'input',
                name: 'role_id',
                message: 'Choose the role:',
                choices: roles
              },
              {
                type: 'list',
                name: 'manager_id',
                message: 'Choose the manager (leave blank for none):',
                choices: managers,
              },
            ])
            //then add the new employee to the database
              .then((answers) => {
                // If the manager_id is not blank, convert it to an integer
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.firs_tName}', '${answers.last_name}', ${answers.role_id}, ${answers.manager_id} )`).then(() => {
                  console.log('Employee added successfully.');
                  startingQuestion();
                });
              });
          })
        })
        // 9.if the user chooses to update an employee role
      } else if (answers.intro === 'Update an employee role') {
        db.query('SELECT * FROM employee').then((res) => {
          const employees = res.rows.map((emp) => ({
            name: emp.first_name + '' + emp.last_name,
            value: emp.employee_id
          }));
          // use the map function to create an array of role objects for the choices
          db.query('SELECT * FROM role').then((res) => {
            const roles = res.rows.map((role) => ({
              name: role.title,
              value: role.role_id
            }));
            //9. then prompt the user to enter the employee and role to update
            inquirer.prompt([
              {
                type: 'list',
                name: 'employee_id',
                message: 'Choose the employee:',
                choices: employees
              },
              {
                type: 'list',
                name: 'role_id',
                message: 'Choose the new role:',
                choices: roles
              },
            ])
            //9. then update the employee's role in the database
              .then((answers) => {
                db.query('UPDATE employee SET role_id = $1 WHERE employee_id = $2', [answers.role_id, answers.employee_id]).then(() => {
                  console.log('Employee role updated successfully.');
                  startingQuestion();
                });
              });

          })
        })
        // 10. if the user chooses to exit
      } else if (answers.intro === 'Exit') {
        console.log('Goodbye!');
        // end the connection to the database
        db.end();
      }
    })
};

startingQuestion();



      

