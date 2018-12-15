require("console.table");
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();
    
});

function readProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        console.table(res);
        selectProduct();
        // continueShopping();
        // connection.end();
    });
};

function selectProduct() {
    inquirer.prompt([
       {
           type: "input",
           name: "userInput",
           message: "id of product you wish to purchase"
       } ,
       {
           type: "input",
           name: "userQuantity",
           message: "How many would you like to purchase?"
       }
    ]).then(function(res) {
        // console.log(res);
        buyProduct(res.userInput, res.userQuantity);
    })
}

function continueShopping() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "continue",
            message: "Continue shopping?"
        }
    ]).then(function(res) {
        if (res.continue === true) {
            readProducts();
        } else if (res.continue === false) {
            connection.end()
        }
    });
}

function buyProduct(product, amount) {
    // console.log(product);
    connection.query("SELECT * FROM products WHERE ?", 
        {item_id: product}, 
        function(err, res){
            // console.log(res[0]);
            if (amount > res[0].stock) {
               console.log("\n\nInsufficient quantity!\n\n");
               continueShopping()
           } else {
                var totalCost = amount * res[0].price;
                var inventory = res[0].stock - amount;
                var id = res[0].item_id;
                updateProduct(id, inventory);
                console.log("\n\nYour total will be: $" + totalCost + "\n\n");
                
           }
            
        })
};

function updateProduct(id, inv) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock: inv
            },
            {
                item_id: id
            }
        ],
        function(err, res) {
            // console.log(res.affectedRows + " products updated!\n");
            continueShopping();
        }
    );
    // console.log(query.sql);
};


