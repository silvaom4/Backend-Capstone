const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userData = require("./database.js");
const { OpenAI } = require("openai");

dotenv.config();

const API_KEY = process.env.API_KEY;

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});


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

app.post("/chat", async (req, res) => {
  const question = req.query.question;
  const history = req.query.history;

  const prompt = `Respond to the following question: ${question} and use ${history} as a reference
   point for the conversation. 
   If the user asks you to remember something , reference the ${history}.
   But dont include ${history} in the response
   Don't include that references ${history}the array in the response. 
   `;


   const prompt2 = `
    Hello and Welcome. You are a chatbot for a document sumaarization app.
    You main job is to assist users with any questions they may have about the app or anything they have concerns with.
    Respond to this question: ${question} .
    Some questions may seem ireelevant but you should always try to answer the question to the best of your ability.
    Some questions may seem irrelevant but you should still be nice and answer appropriately.

    This is what they have said so far: ${history}. 
    You will be receiving an array of strings that you will have to read and understand to continue the conversation.
    That array of strings is the history of the conversation.
    That array of strings is ${history}
    Remember every ddetail ${history} of the conversation and use it to continue the conversation.
    
    THE RESPONSE CAN REFERENCE ${history} BUT SHOULD NOT INCLUDE BRACKETS OR ANY CODING SYMBOLS.

    Remebmber, you are a chatbot, answer to the best of your ability.

    ${question} is the what you should respond to.
    ${history} is the history of the conversation and what you should use incase the user asks you to remember something.
   
   `

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt2 }],
      max_tokens: 300,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    console.log(data);
    console.log({prompt});
    console.log(JSON.stringify(data.choices[0].message));
    res.send(data.choices[0].message);
  } catch (error) {
    console.error(error);
  }


});


app.listen(4000, () => {
  console.log("Server is running on port 4000");
});