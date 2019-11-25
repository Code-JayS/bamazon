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
    listItems();
});


function listItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_qty);
        }
        console.log("-----------------------------------");
    });

    queryId();
}


function queryId() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
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
                    message: "What item would you like to buy?"
                },
                {
                    name: "amount",
                    type: "input",
                    message: "How many would you like to buy?"
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
                if (chosenItem.stock_qty > parseInt(answer.amount)) {
                    //there is enough in stock so update db.
                    var newStock = chosenItem.stock_qty -= answer.amount
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
                            console.log("Thank You for your order!");
                            listItems();
                        }
                    );
                }
                else {
                    // not enough in stock, so apologize and start over
                    console.log("There is not enough in stock, please retry your order with a lower quantity.");
                    listItems();
                }
            });
    });

}
