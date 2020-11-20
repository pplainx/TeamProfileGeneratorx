// all the module imports
const Employee = require("./lib/Employee"); // not used

// imported to get all the use data
const { Manager, getManager } = require("./lib/Manager");
const { Engineer, getEngineer } = require("./lib/Engineer");
const { Intern, getIntern } = require("./lib/Intern");

// imported to generate html body for individual type of users
const managerHtmlFile = require("./lib/managerHtml");
const engineerHtmlFile = require("./lib/engineerHtml");
const internHtmlFile = require("./lib/internHtml");

//for constructing the body of main html file
const mainHtmlFile = require("./lib/mainHtml");

const fs = require("fs"); // for writing into a file
const util = require("util"); // for promisifying

const writeFileAsync = util.promisify(fs.writeFile);

const main = async () => {

    // empty array to hold all the employee html data
    let employeeHtmlArray = [];


    //get manager data
    const managerObj = await getManager();

    // console.log(managerObj);


    // fill the user data for interns and push to employee html array
    managerObj.forEach(element => {
        employeeHtmlArray.push(managerHtmlFile.generateHtml(element))
    });


    //get engineer data (one or more)
    let engineerHtml = await getEngineer();


    // fill the user data for interns and push to employee html array
    engineerHtml.forEach(element => {
        employeeHtmlArray.push(engineerHtmlFile.generateHtml(element))
    });


    // collect intern data (one or more interns)
    let internrHtml = await getIntern();


    // fill the user data for interns and push to employee html array
    internrHtml.forEach(element => {
        employeeHtmlArray.push(internHtmlFile.generateHtml(element))
    });

    
    // combining all the htmls for emplouyees
    let employeeHtml = employeeHtmlArray.join("\n");

    // generate main html with all the employees data
    let htmlFile = mainHtmlFile.generateHtml(employeeHtml);

    // console.log("all---" + JSON.stringify(htmlFile));


    //writing to html file
    await writeFileAsync(`./output/team.html`, htmlFile);

};


main(); // invoke main function

