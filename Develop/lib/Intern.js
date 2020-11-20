
// import classes and inquirer package
const Employee = require("./Employee");
const inquirer = require('inquirer');
//inheriting for user input validation
const validate = require("./validate");

//class definition

class Intern extends Employee {
    constructor(name,id,email,school = "") {
        super(name,id,email);
        this.school = school;
    }    
    getSchool(){return this.school};
    getRole() {return "Intern"};
}



let interns = []; // to hold the objects
const getIntern = async () => {
    //declare an object to collect all the values
    let intern = new Intern();
    const name = await inquirer.prompt(
        {
            message: "What's name of intern?",
            type: "input",
            name: "name",
            validate: validate.validateString // for error validation
        })
        .then(function (ans) {
            intern.name = ans.name;
        })

    const id = await inquirer.prompt(
        {
            message: "What's ID of intern?",
            type: "input",
            name: "id",
            validate: validate.validateNumber // for error validation
        })
        .then(function (ans) {
            intern.id = ans.id;
        })

    const email = await inquirer.prompt(
        {
            message: "What's the email?",
            type: "input",
            name: "email",
            validate: validate.validateEmail // for error validation
        })
        .then(function (ans) {
            intern.email = ans.email;
        })

    //asking special input for intern (school)

    const school = await inquirer.prompt(
        {
            message: "What's school name of Intern?",
            type: "input",
            name: "school",
            validate: validate.validateString // for error validation
        })
        .then(function (ans) {
            intern.school = ans.school;
        })

    intern.role = intern.getRole();
    interns.push(intern);
    
    //asking user whether to collect another intern

    const repeat = await inquirer.prompt(
        {
            type: 'confirm',
            name: 'again',
            message: 'Enter another intern? ',
            default: true
        })
        .then(function (ans) {
            return ans.again;
        })

    // console.log("intern" + JSON.stringify(intern));
    // console.log("interns------" + JSON.stringify(interns));
    return repeat ? getIntern() : interns;
}

// getIntern();

// exports the class and method

module.exports = {
    Intern: Intern,
    getIntern: getIntern};

