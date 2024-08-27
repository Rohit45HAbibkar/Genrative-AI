// Make sure to include these imports:
import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
const app = express();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/",(req,res)=>{
    res.send("working...")
});


const result = async(prompt)=>{
    const res = await model.generateContent(prompt);
    console.log(res.response.text());
}

result("give me 5 random names of  star");
app.listen(8080,()=>{
    console.log("Port 8080 is running...")
})