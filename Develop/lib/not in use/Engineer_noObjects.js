const Employee = require("../Employee");
var inquirer = require('inquirer');

class Engineer extends Employee {
    constructor(name,id,email,github = "") {
        super(name,id,email);
        this.github = github;
        this.role = "";
    }    
    
    getGithub(){return this.github}
    getRole(){return "Engineer"};
}

function validateEmail(mail) {
    mail = mail.trim();
    var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(mail) || "Not a valid email, Please try again";
}

function validateNumber(id) {
    id = id.trim();
    var pattern = /^\d+$/;
    return pattern.test(id) || "Not a valid number, Please try again";
}

function validateString(name) {
    name = name.trim();
    var pattern = /^[a-zA-Z ]{3,30}$/;
    return pattern.test(name) || "Not a valid string, Please try again";
}


const collectInputs = async (inputs = []) => {
    const prompts = [
        {
            message: "What's name of Engineer?",
            type: "input",
            name: "name",
            validate: validateString
        },
        {
            message: "What's ID of Engineer?",
            type: "input",
            name: "id",
            validate: validateNumber
        },
        {
            message: "What's the email?",
            type: "input",
            name: "email",
            validate: validateEmail
        },
        {
            message: "What's Git name of Engineer?",
            type: "input",
            name: "github",
            validate: validateString
        },
        {
            type: 'confirm',
            name: 'again',
            message: 'Enter another Engineer? ',
            default: true
        }
 
    ];

    const { again, ...answers } = await inquirer.prompt(prompts);

    const newInputs = [...inputs, answers];

    return again ? collectInputs(newInputs) : newInputs;
};

const getEngineer = async () => {

    let engineerDetails = await collectInputs();

    let engineersList = [];

    engineerDetails.forEach(element => {
            let engineer = new Engineer(element.name,element.id,element.email,element.github);
            engineer.role = engineer.getRole();
            engineersList.push(engineer);
        });

    // let type = { type: "Engineer" };

    // engineerData = engineerDetails.map(element => {
    //     return { ...type, ...element };
    // });

    console.log("inputs---"+JSON.stringify(engineersList));

    // return engineersList;

}

getEngineer();

module.exports = {
    Engineer,
    getEngineer};

