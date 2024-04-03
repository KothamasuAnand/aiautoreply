const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

exports.getAiResponse = async (content,opinion) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const detailsToAi = "we are a company named REACHINBOX we are trying to sell out websites subscription yo our customers here the link to the website https://www.reachinbox.ai/ go through it and analyze it and we received a response of "+ opinion+" now generate a body of gmail to attract the customer based on the response you received";

  const result = await model.generateContent(detailsToAi);
  const response = await result.response;
  const text = response.text();
  return text;
};
