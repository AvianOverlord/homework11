const express = require("express");
const mysql = require("mysql");
const exphbs = require("express-handlebars");

const app = express();
let PORT = 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({host: "localhost", user: "root", password: "hello1234",database: "burgers_db"});
connection.connect(function(err) {if (err) throw err;});

let allBurgers = [];

app.get("/",function(req,res){
    selectAll(res);
});

app.post("/",function(req,res){
    let newName = req.body.burger;
    insertOne(newName, res);
});

app.post("/devour/:b",function(req,res){
    allBurgers.forEach(burger =>{
        if(burger.id === parseInt(req.params.b))
        {
            updateOne(burger, res);
        }
    });
});

function selectAll(originRes)
{
    connection.query("SELECT * FROM burgers", function(err, res)
    {
        if(err) throw err;
        allBurgers = [];
        res.forEach(burger => allBurgers.push(burger));
        let currentBurgers = [];
        let pastBurgers = [];
        res.forEach(burger => {
           if(burger.devoured)
           {
               pastBurgers.push(burger);
           } 
           else
           {
               currentBurgers.push(burger);
           }
        });
        let data = {uneaten: currentBurgers, eaten: pastBurgers};
        originRes.render("index", data);
    });
}

function insertOne(newBurger, originRes)
{
    connection.query("INSERT INTO burgers SET ?", {burger_name: newBurger, devoured: false}, function(err,res)
    {
        if(err) throw err;
        originRes.redirect("/");
    });
}

function updateOne(burgerObject, originRes)
{
    connection.query("UPDATE burgers set devoured=true WHERE id=?",[burgerObject.id],function(err,res){
        if(err) throw err;
        originRes.redirect("/");
    });
}

app.listen(PORT, function() { console.log("App listening on PORT " + PORT)});

/*
    Connection String: mysql://g7qghd263elmk9jc:twnaapa28hiwjcb8@pqxt96p7ysz6rn1f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/q143uquy7brn88z5
    Host: 	pqxt96p7ysz6rn1f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com 	
    Username: 	g7qghd263elmk9jc 	
    Password: 	twnaapa28hiwjcb8 	
    Port: 	3306 	
    Database: 	q143uquy7brn88z5
*/

