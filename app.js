const mysql2 = require("mysql2");
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static("public"));

const dbconnection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "loginsystem_using_nodejs_mysql",
});

dbconnection.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("Connected to the database successfully");
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username, password); // Check the received username and password
  
    dbconnection.query(
      "INSERT INTO userloginsystem (user_name, user_pass) VALUES (?, ?)",
      [username, password],
      (error, results) => {
        if (error) {
          console.log(error); // Log any error that occurs during the query execution
          res.redirect("/");
        } else {
          console.log("User registered successfully");
    
          res.redirect("/welcome?username=" + username); 
        }
      }
    );
  });
  
  

app.get("/welcome", (req, res) => {
  res.sendFile(__dirname + "/welcome.html");
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});

