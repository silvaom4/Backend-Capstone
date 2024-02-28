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

app.post("/api/forum/posts", (req, res) => {
  // const sql = `select * from forum`
  const sql = `select forum.forumID, forum.Content, forum.userID, forum.HeaderContent, users.Username, users.ProfilePicture from forum inner join users on forum.userID = users.UserID`
  userData.query(sql, (err, result) => {
    if (err) throw err;
    return res.send({ message: "Forum posts retrieved successfully", posts: result });
  });
});

app.post("/api/forum/post", (req, res) => {
  const sql = `insert into forum (Content, userID, HeaderContent) values ('${req.body.post}', '${req.body.userID}', '${req.body.header}')`
  userData.query(sql, (err, result) => {
    if (err) throw err;
    return res.send({ message: "Forum post created successfully" });
  });
});

app.post("/api/forum/reply", (req, res) => {
  const sql = `insert into reply (UserID, forumID, Content) values ('${req.body.userID}', '${req.body.postID}', "${req.body.reply}")`
  userData.query(sql, (err, result) => {
    if (err) throw err;
    return res.send({ message: "Forum reply created successfully" });
  });
});

app.post("/api/forum/replies", (req, res) => {
  const sql = `select * from reply where forumID='${req.body.postID}'`
  userData.query(sql, (err, result) => {
    if (err) throw err;
    return res.send({ message: "Forum replies retrieved successfully", replies: result });
  });
});

app.post("/api/forum/delete", (req, res) => {
  const sql = `delete from forum where PostID='${req.body.postID}'`
  userData.query(sql, (err, result) => {
    if (err) throw err;
    return res.send({ message: "Forum post deleted successfully" });
  });
});


app.listen(4000, () => {
  console.log("Server is running on port 4000");
});