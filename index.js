//main code for inquirer goes here 
//present user with options

const inquirer = require('inquirer');
const fs = require('fs');
const connection = require('./db/connection.js');
const options =[
    {
        type: "list",
        name: "options",
        message: "What would you like to do? ",
        choices: [
            "view all departments",
            "view all roles",
            "view all employees",
            "view all employees by department",
            "view all employees by manager",
            "add employee",
            "remove employee",
            "update employee role",
            "update employee manager"
        ]
    }
];

function showOptions(){
    inquirer
        .prompt(options)
        .then((answers) => {
           console.log(answers);
            if (answers.options =='view all departments'){
                viewDepartments()
            }
        });  
}
//only if we are connected the function runs
connection.connect((err)=>{
if (err) throw err
    showOptions();
})


//view all departments - READ METHODS 
function viewDepartments(){
    //add connection.query
 connection.query('SELECT * FROM department', function(err,results){
     if (err) throw err
     console.table(results) 
     showOptions() 
 })   
}

//view all roles


//view all employees


//Add a department  - CREATE METHOD


// Add a role 

    //SELECT the exisiting roles out for the 'roles' table


    //.map() the results from 'roles' to question data for inquirer


    //Then promplt the user for role info - inquirer


    //Take the user's answers and go insert them into the 'role' table


//Add an employee


// update an employee