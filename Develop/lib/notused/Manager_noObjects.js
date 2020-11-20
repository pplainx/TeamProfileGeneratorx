const Employee = require("./Employee");
var inquirer = require('inquirer');


class Manager extends Employee {
    constructor(name,id,email,officeNumber = "") {
        super(name,id,email);
        this.officeNumber = officeNumber;
    }    
    getOfficeNumber(){return this.officeNumber}
    getRole(){return "Manager"};
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
            message: "What's name of Manager?",
            type: "input",
            name: "name",
            validate: validateString
        },
        {
            message: "What's ID of Manager?",
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
            message: "What's office number of Manager?",
            type: "input",
            name: "officeNumber",
            validate: validateNumber
        }
 
    ];

    const { again, ...answers } = await inquirer.prompt(prompts);

    const newInputs = [...inputs, answers];

    return newInputs;
};

const getManager = async () => {

    let managerDetails = await collectInputs();

    let type = { type: "Manager" };

    managerData = managerDetails.map(element => {
        return { ...type, ...element };
    });

    // console.log("inputs---"+JSON.stringify(managerData));

    return managerData;

}

// getManager();

module.exports = {
    Manager,
    getManager}