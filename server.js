const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userData = require("./database.js");
dotenv.config();

const app = express()
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.get("/api", (req, res) => {
    res.send({ message: userData });
  });

app.post("/api/login", (req, res) => {
  const sql = `select * from customer where email='${req.body.email}' and password='${req.body.password}'`

});

app.post("/api/register", (req, res) => {
  const sql = `insert into customer (email, password) values ('${req.body.email}', '${req.body.password}')`;
  userData.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ message: "User registered successfully" });
  });
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});