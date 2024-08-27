import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/", (req, res) => {
    res.render("index", { result: null });
});

app.post("/", async (req, res) => {
    const userPrompt = req.body.prompt;
    try {
        const response = await model.generateContent(userPrompt);
        const aiResult = response.response.text(); // Assuming this is the correct method to access the AI response
        res.render("index", { result: aiResult });
    } catch (error) {
        console.error("Error generating content:", error);
        res.render("index", { result: "An error occurred while processing your request." });
    }
});

app.listen(8080, () => {
    console.log("Port 8080 is running...");
});
