const express = require("express");
const mysql = require("mysql");
const handlebars = require("express-handlebars");

const app = express();
let PORT = 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({host: "localhost", user: "root", password: "hello1234",database: "burgers_db"});
connection.connect(function(err) {if (err) throw err;});

/*
    Connection String: mysql://g7qghd263elmk9jc:twnaapa28hiwjcb8@pqxt96p7ysz6rn1f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/q143uquy7brn88z5
    Host: 	pqxt96p7ysz6rn1f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com 	
    Username: 	g7qghd263elmk9jc 	
    Password: 	twnaapa28hiwjcb8 	
    Port: 	3306 	
    Database: 	q143uquy7brn88z5
*/

