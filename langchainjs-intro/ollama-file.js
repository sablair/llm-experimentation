import { ChatPromptTemplate } from "@langchain/core/prompts";
import { tool } from "@langchain/core/tools";
import { ChatOllama } from "@langchain/ollama";
import math from "./math.js";
import { z } from "zod";

const llm = new ChatOllama({
  model: "llama3.2",
  temperature: 0.7,
  maxRetries: 3,
});

// Example using a simple invoke function
async function compliment() {
  return await llm.invoke([
    [
      "system",
      "You are clever with your words and give the best compliments. Give a compliment when prompted",
    ],
    ["human", "compliment me please"]
  ]);
}

async function translate(sentence, input_language, output_language) {
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are an assistant who translates {input_language} to {output_language}. If you cannot do the translation respond I do not know how"
    ],
    [
      "human",
      "{input}"
    ]
  ])

  const chain = prompt.pipe(llm);
  return await chain.invoke({
    input: sentence,
    input_language,
    output_language
  });
}

const mathTool = tool(math, {
  name: "get_math_result",
  description: "Get the result of a math expression",
  schema: z.object({
    a: z.number().describe("The first number"),
    b: z.number().describe("The second number"),
    operator: z.enum(["+", "-", "*", "/"]).describe("The operator"),
  })
});

const llmForMath = llm.bindTools([mathTool]);

async function getMathResult(request) {
  return await llmForMath.invoke([
    [
      "system",
      "When given a mathematical expression you extract the variables (a and b) and the operation. Use the 'get_math_result' tool"
    ],
    [
      "human",
      request
    ]
  ]);
}

export {
  compliment, translate, getMathResult
};