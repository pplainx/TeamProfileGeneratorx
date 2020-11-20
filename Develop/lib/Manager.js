// import classes and inquirer package

const Employee = require("./Employee");
const inquirer = require('inquirer');
//inheriting for user input validation
const validate = require("./validate");

//class definition

class Manager extends Employee {
    constructor(name, id, email, officeNumber = "") {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getOfficeNumber() { return this.officeNumber }
    getRole() {return "Manager"};
}


let managers = []; // to hold the objects. for now only one manager is collected. useful when more than one manager is ther
const getManager = async () => {
    let manager = new Manager();//declare an object to collect all the values
    const name = await inquirer.prompt(
        {
            message: "What's name of Manager?",
            type: "input",
            name: "name",
            validate: validate.validateString // for error validation
        })
        .then(function (ans) {
            manager.name = ans.name;
        })

    const id = await inquirer.prompt(
        {
            message: "What's ID of Manager?",
            type: "input",
            name: "id",
            validate: validate.validateNumber // for error validation
        })
        .then(function (ans) {
            manager.id = ans.id;
        })

    const email = await inquirer.prompt(
        {
            message: "What's the email?",
            type: "input",
            name: "email",
            validate: validate.validateEmail // for error validation
        })
        .then(function (ans) {
            manager.email = ans.email;
        })

    const officeNumber = await inquirer.prompt(
        {
            message: "What's office number of Manager?",
            type: "input",
            name: "officeNumber",
            validate: validate.validateNumber // for error validation
        })
        .then(function (ans) {
            manager.officeNumber = ans.officeNumber;
        })

    manager.role = manager.getRole();
    managers.push(manager);

    // console.log("manager" + JSON.stringify(manager));
    // console.log("managers------" + JSON.stringify(managers));
    return managers;
}

// getManager();



module.exports = {
    Manager: Manager,
    getManager: getManager
}