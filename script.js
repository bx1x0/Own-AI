import { config } from "dotenv";
config();

import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.setPrompt("You: ");
userInterface.prompt();

userInterface.on("line", async (input) => {
  try {
    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    });
    console.log(`AI: ${response.data.choices[0].message.content}`);
    userInterface.prompt();
  } catch (error) {
    console.error("Error occurred:", error.response?.data || error.message);
    userInterface.prompt();
  }
});
