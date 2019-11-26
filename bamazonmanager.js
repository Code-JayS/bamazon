var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Password42",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    menu();
});




function menu() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all product inventory",
                // "View all product below safety stock",
                "Add to Inventory",
                // "Add New Product",
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View all product inventory":
                    listItems();
                    break;

                case "View all product below safety stock":
                    listLowStock();
                    break;

                case "Add to Inventory":
                    orderStock();
                    break;

                case "Add New Product":
                    addProduct();
                    break;
            }
        });
}

function listItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_qty);
        }
        console.log("-----------------------------------");
    });

    menu();
}

function orderStock() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to purchase
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "What item would you like to Update?"
                },
                {
                    name: "amount",
                    type: "input",
                    message: "How much would like to add?"
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];

                    }
                }
                if (chosenItem) {
                    //there is enough in stock so update db.
                    var newStock = chosenItem.stock_qty += parseInt(answer.amount)
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_qty: newStock
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Thank You warehouse has been updated!\n\n");
                            menu();
                        }
                    );
                }
                else {
                    // not enough in stock, so apologize and start over
                    console.log("please enter a valid amount.\n\n");
                    menu();
                }
            });
    });
}