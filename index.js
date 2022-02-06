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
            "update an employee role",

        ]
    }
];

function showOptions() {
    inquirer
        .prompt(options)
        .then((answers) => {
            console.log(answers);
            if (answers.options == 'view all departments') {
                viewDepartments()
            }
            if (answers.options == 'view all roles') {
                viewRoles()
            }
            if (answers.options == 'view all employees') {
                viewEmployees()
            }
            if (answers.options == 'add a department') {
                addDepartment()
            }
            if (answers.options == 'add a role') {
                addRole()
            }

        });
}
//only if we are connected the function runs
connection.connect((err) => {
    if (err) throw err
    showOptions();
});


//view all departments - READ METHODS 
function viewDepartments() {
    //add connection.query
    connection.query('SELECT * FROM department', function (err, results) {
        if (err) throw err
        console.table(results)
        showOptions()
    })
};

//view all roles

function viewRoles() {
    connection.query('SELECT * FROM role', function (err, results) {
        if (err) throw err
        console.table(results)
        showOptions()
    })
};


//view all employees

function viewEmployees() {
    connection.query('SELECT * FROM employee', function (err, results) {
        if (err) throw err
        console.table(results)
        showOptions()
    })
};


//CREATE DEPARTMENT

const questions = [{
    type: 'input',
    message: 'Which department would you like to add?',
    name: 'department'
}]
function addDepartment() {
    // call prompt here
    inquirer
        .prompt(questions)
        .then((answers) => {
            console.log(answers);

            connection.query(`INSERT INTO department (name) VALUES (?)`, answers.department, (err, result) => {
                if (err) throw err;
                console.log('Added ' + answers.department + " to departments!");
                viewDepartments();
            });
        })
}

const sql = `INSERT INTO role (id, title, salary,department_id)
                  VALUES (?)`;
// CREATE A NEW ROLE
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
function addRole() {
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


    //SELECT the exisiting roles out from the department table. We will be presented with an array of objects 


    //.map() the results from 'roles' to question data for inquirer


    //Then promplt the user for role info - inquirer


    //Take the user's answers and go insert them into the 'role' table


//Add an employee


// update an employee