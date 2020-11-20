
// inherit the employee class to extend
const Employee = require("./Employee");
// for user input collection
const inquirer = require('inquirer');
// for user input validation
const validate = require("./validate");

// Engineer class 
class Engineer extends Employee {
    constructor(name, id, email, github = "") {
        super(name, id, email);
        this.github = github;
    }
    getRole() { return "Engineer" };
    getGithub() { return this.github }
}

//Engineer data collection function

let engineers = [];
const getEngineer = async () => {
    let engineer = new Engineer();

    // set of questions. App collects and sets attributes
    const name = await inquirer.prompt(
        {
            message: "What's name of Engineer?",
            type: "input",
            name: "name",
            validate: validate.validateString
        })
        .then(function (ans) {
            engineer.name = ans.name;
        })

    const id = await inquirer.prompt(
        {
            message: "What's ID of Engineer?",
            type: "input",
            name: "id",
            validate: validate.validateNumber
        })
        .then(function (ans) {
            engineer.id = ans.id;
        })

    const email = await inquirer.prompt(
        {
            message: "What's the email?",
            type: "input",
            name: "email",
            validate: validate.validateEmail
        })
        .then(function (ans) {
            engineer.email = ans.email;
        })
    // asking special question that belongs to engineer

    const github = await inquirer.prompt(
        {
            message: "What's Git name of Engineer?",
            type: "input",
            name: "github",
            validate: validate.validateString
        })
        .then(function (ans) {
            engineer.github = ans.github;
        })

    engineer.role = engineer.getRole();
    engineers.push(engineer);

    //asking question whether to repeat

    const repeat = await inquirer.prompt(
        {
            type: 'confirm',
            name: 'again',
            message: 'Enter another Engineer? ',
            default: true
        })
        .then(function (ans) {
            return ans.again;
        })

    // console.log("engineer" + JSON.stringify(engineer));
    // console.log("engineers------" + JSON.stringify(engineers));

    //return the engineers array, when user confirms all the engineers are entered
    return repeat ? getEngineer() : engineers;
}

// getEngineer();


//exports the functions
module.exports = {
    Engineer: Engineer,
    getEngineer: getEngineer
};
