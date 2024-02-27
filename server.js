const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userData = require("./database.js");
dotenv.config();

const app = express()
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.post("/api", (req, res) => {
    res.send({ message: userData });
  });

app.post("/api/login", (req, res) => {
  const sql = `select * from users where Email='${req.body.email}' and userPassword='${req.body.password}'`
  userData.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ message: "User logged in successfully",
      user: result[0]});
    } else {
      res.send({ message: "User not found" });
    }
  });
});

app.post("/api/register", (req, res) => {
  const sql = `insert into users (Email, userPassword, FirstName, LastName, Username, isAdmin) values ('${req.body.email}', '${req.body.password}', '${req.body.firstName}', '${req.body.lastName}', '${req.body.username}', 0)`;
  const emailCheck = `select * from users where Email='${req.body.email}'`
  userData.query(emailCheck, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.send({ message: "Email already exists" });
    } else {
      userData.query(sql, (err, result) => {
        if (err) throw err;
        return res.send({ message: "User registered successfully" });
      });
    }
  });
});


app.listen(4000, () => {
  console.log("Server is running on port 4000");
});