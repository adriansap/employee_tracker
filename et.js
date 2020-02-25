var mysql = require("mysql");
var inquirer = require("inquirer")

function appMenu() {

    actions();
    function actions() {
        inquirer.prompt([

            {
                type: "list",
                name: "choice",
                message: "Please choose:",
                choices: ['Add Employee', 'Another thing',]
            }
        ])
            .then(function (answers) {

                if (answers.choice === "Add Employee") {
                    addEmployee();

                }
                else if (answers.choice === "Bid") {
                    bidItem();
                }

                else {

                    console.log("thanks for using this program!")
                }

            });
    }
}


appMenu();

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Please enter employee's department:"
        },

        {
            type: "input",
            name: "title",
            message: "Please enter employee's title:"
        },
        {
            type: "input",
            name: "salary",
            message: "Please enter employee's salary:"
        },
        {
            type: "input",
            name: "departmentId",
            message: "Please enter employee's department ID:"
        },
        {
            type: "input",
            name: "firstName",
            message: "Please enter employee's First Name:"
        },
        {
            type: "input",
            name: "lastName",
            message: "Please enter employee's Last Name:"
        },
        {
            type: "input",
            name: "roleId",
            message: "Please enter employee's Role ID:"
        },
        {
            type: "input",
            name: "managerId",
            message: "Please enter employee's Manager ID:"
        }


    ])
        .then(function (answers) {

            var department = answers.department;
            var title = answers.title;
            var salary = answers.salary;
            var departmentId = answers.departmentId
            var firstName = answers.firstName;
            var lastName = answers.lastName;
            var roleId = answers.roleId;
            var managerId = answers.managerId;

            // console.log(itemToPost)
            connectToDb(department, title, salary, departmentId, firstName, lastName, roleId, managerId);


        });
}


function connectToDb(department, title, salary, departmentId, firstName, lastName, roleId, managerId) {
    var connection = mysql.createConnection({
        host: "localhost",

        // Your port; if not 3306
        port: 3306,

        // Your username
        user: "root",

        // Your password
        password: "basedata321!",
        database: "employee_trackerDB"
    });

    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId + "\n");
        insertEmployeeTable1(department, title, salary, departmentId, firstName, lastName, roleId, managerId);
        insertEmployeeTable2(title, salary, departmentId);
        insertEmployeeTable3(firstName, lastName, roleId, managerId);
    });

    //1.insert info into table1
    function insertEmployeeTable1(department, title, salary, departmentId, firstName, lastName, roleId, managerId) {
        console.log("Inserting a new employee...\n");
        var query = connection.query(
            "INSERT INTO department SET ?",
            {
                name: department
            },

            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " product inserted!\n");
                // Call updateProduct AFTER the INSERT completes
                // updateProduct();
            }
        );
    }
    //2. insert info into table2
    function insertEmployeeTable2(title, salary, departmentId) {
        console.log("Inserting a new employee...\n");
        var query = connection.query(

            "INSERT INTO role SET ?",
            {
                title: title,
                salary: salary,
                department_id: departmentId
            },

            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " employee inserted!\n");
                // Call updateProduct AFTER the INSERT completes
                // updateProduct();
            }
        );
    }
    //3. insert info into table3
    function insertEmployeeTable3(firstName, lastName, roleId, managerId) {
        console.log("Inserting a new employee...\n");
        var query = connection.query(

            "INSERT into employee SET ?",
            {
                first_name: firstName,
                last_name: lastName,
                role_id: roleId,
                manager_id: managerId
            },

            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " product inserted!\n");
                // Call updateProduct AFTER the INSERT completes
                // updateProduct();
            }
        );
    }
}

//************************************************************************************ */

//function that retrieves info from database

function retrieveAllEmployeeInfo() {

    
}
