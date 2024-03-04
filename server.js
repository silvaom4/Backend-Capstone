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


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});