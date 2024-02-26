import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express()
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send({ message: "Welcome to iSummarize" });
  });


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});