const Employee = require("../Employee");
var inquirer = require('inquirer');

class Intern extends Employee {
    constructor(name,id,email,school = "") {
        super(name,id,email);
        this.school = school;
    }    
    getSchool(){return this.school}
    getRole(){return "Intern"};
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
            message: "What's name of Intern?",
            type: "input",
            name: "name",
            validate: validateString
        },
        {
            message: "What's ID of Intern?",
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
            message: "What's school name of Intern?",
            type: "input",
            name: "school",
            validate: validateString
        },
        {
            type: 'confirm',
            name: 'again',
            message: 'Enter another intern? ',
            default: true
        }
 
    ];

    const { again, ...answers } = await inquirer.prompt(prompts);

    const newInputs = [...inputs, answers];

    return again ? collectInputs(newInputs) : newInputs;
};

const getIntern = async () => {

    let internDetails = await collectInputs();

    let type = { type: "intern" };

    internData = internDetails.map(element => {
        return { ...type, ...element };
    });

    // console.log("inputs---"+JSON.stringify(internData));

    return internData;

}

// getIntern();

module.exports = {
    Intern,
    getIntern};

