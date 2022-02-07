//main code for inquirer goes here 
//present user with options

const inquirer = require('inquirer');
const fs = require('fs');
const connection = require('./db/connection.js');
const options = [
    {
        type: "list",
        name: "options",
        message: "What would you like to do? ",
        choices: [
            "view all departments",
            "view all roles",
            "view all employees",
            "add a department",
            "add a role",
            "add an employee",
            "update an employee",
            "exit"
        ]
    }
];


//only if we are connected the function runs
connection.connect((err) => {
    if (err) throw err
    showOptions();
});

function showOptions() {
    inquirer
        .prompt(options)
        .then((answers) => {
            console.log(answers);
            if (answers.options == 'view all departments') {
                viewDepartments()
            }
            else if (answers.options == 'view all roles') {
                viewRoles()
            }
            else if (answers.options == 'view all employees') {
                viewEmployees()
            }
            else if (answers.options == 'add a department') {
                addDepartment()
            }
            else if (answers.options == 'add a role') {
                addRole()
            }
            else if (answers.options == 'add an employee') {
                addEmployee()
            }
            else if (answers.options == 'exit') {
                closeAll()
                
            }
            else if (answers.option == 'update an employee'){
                updateEmployee()
            }
        });
}

//view all departments - READ METHODS 
function viewDepartments() {
    //add connection.query
    connection.query('SELECT * FROM department', function (err, results) {
        if (err) {
            connection.end();
            return console.error(err.message);
        }
        console.table(results)
        showOptions()
    })
};

//view all roles

function viewRoles() {
    connection.query('SELECT * FROM role', function (err, results) {
        if (err) {
            connection.end();
            return console.error(err.message);
        }
        console.table(results)
        showOptions()
    })
};


//view all employees

function viewEmployees() {
    connection.query('SELECT * FROM employee', function (err, results) {
        if (err) {
            connection.end();
            return console.error(err.message);
        }
        console.table(results)
        showOptions()
    })
};


//CREATE DEPARTMENT


function addDepartment() {
    const questions = [{
        type: 'input',
        message: 'Which department would you like to add?',
        name: 'department'
    }]
    // call prompt here
    inquirer
        .prompt(questions)
        .then((answers) => {
            console.log(answers);

            connection.query(`INSERT INTO department (name) VALUES (?)`, answers.department, (err, result) => {
                if (err) {
                    connection.end();
                    return console.error(err.message);
                }
                console.log('Added ' + answers.department + " to departments!");
                viewDepartments();
            });
        })
}

const sql = `INSERT INTO role (id, title, salary,department_id)
                  VALUES (?)`;
// CREATE A NEW ROLE
//SELECT the exisiting roles out from the department table. We will be presented with an array of objects 
//.map() the results from 'roles' to question data for inquirer
//Then promplt the user for role info - inquirer
//Take the user's answers and go insert them into the 'role' table


function addRole() {
    const roleQuestions = [{
        type: 'input',
        message: 'Which role would you like to add?',
        name: 'title'
    },
    {
        type: 'input',
        message: 'What is the salary for this role?',
        name: 'salary'
    },
    {
        type: 'input',
        message: 'Which department does this role belongs to?',
        name: 'departmentName'
    }
    ]
    inquirer
        .prompt(roleQuestions)
        .then((answers) => {
            // take each of the values from the answers varaible and put it into a variable
            const title = answers.title;
            const salary = answers.salary;

            connection.query(`SELECT id FROM department WHERE name = ?`, answers.departmentName, (err, result) => {
                if (err) {
                    connection.end();
                    return console.error(err.message);
                }
                console.log("test: ", result[0].id);
                dId = result[0].id;
                connection.query(`INSERT INTO role (title, salary,department_id) VALUES (?,?,?)`, [answers.title, answers.salary, dId], (err, result) => {
                    if (err) {
                        connection.end();
                        return console.error(err.message);
                    }
                    viewRoles();
                });
            });
        });
}

//Add an employee
// Change the queries for employee the way you want.
function addEmployee() {
    const employeeQuestions = [{
        type: 'input',
        message: 'Please add the first name of the employee you want to add',
        name: 'firstName'
    },
    {
        type: 'input',
        message: 'Please enter the last name of the employee you want to add',
        name: 'lastName'
    },
    {
        type: 'input',
        message: 'What is the employees role?',
        name: 'employeeRole'
    },
    {
        type: 'input',
        message: 'what is the first Name of the manager for this role?',
        name: 'mfirstname'
    },
    {
        type: 'input',
        message: 'what is the last Name of the manager for this role?',
        name: 'mlastname'
    }
    ]
    inquirer
        .prompt(employeeQuestions)
        .then((answers) => {
            // take each of the values from the answers varaible and put it into a variable
            const name1 = answers.firstName;
            const name2 = answers.lastName;
            const employeeRole = answers.employeeRole;
            const managerFirstName = answers.mfirstname;
            const managerLastName = answers.mlastname;

            // SELECT id FROM role WHERE title = ?`, answers.employeeRole, 

            connection.query(`SELECT id FROM employee WHERE first_name = ? and last_name = ?`, [managerFirstName, managerLastName], (err, result) => {
                if (err) {
                    connection.end();
                    return console.error(err.message);
                }
                console.log("manager id: ", result[0].id);
                mId = result[0].id;
                connection.query(`INSERT INTO employee (first_name, last_name,role_id,manager_id) 
                VALUES (?,?,(SELECT id FROM role WHERE title = ?),?)`,
                    [answers.firstName, answers.lastName, employeeRole, mId], (err, result) => {
                    if (err) {
                        connection.end();
                        return console.error(err.message);
                    }
                    viewEmployees();
                });
            });
        });
}


    function closeAll(){
    connection.end();
    process.exit()
}






//Delete an employee
