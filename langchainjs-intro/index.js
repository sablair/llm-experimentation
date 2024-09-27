import express from "express";
import { compliment, translate, getMathResult } from "./ollama-file.js";

const app = express();
const port = 3000;

app.get("/compliment", async (req, res) => {
  const answer = await compliment();
  res.send(answer);
});

app.get("/translate", async (req, res) => {
  const { sentence, input, output } = req.query;
  const answer = await translate(sentence, input, output);

  res.send(answer);
});

app.get("/math", async (req, res) => {
  const { problem } = req.query;
  const answer = await getMathResult(problem);
  res.send(answer);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});