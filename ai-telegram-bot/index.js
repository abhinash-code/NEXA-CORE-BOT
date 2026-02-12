const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const http = require("http");

// ===============================
// 🌐 FREE RENDER FIX (Dummy Port)
// ===============================
// Yeh Render ko "Live" rakhega bina paise diye
http.createServer((req, res) => {
  res.write("NEXA AI is online and free!");
  res.end();
}).listen(process.env.PORT || 3000);

// ===============================
// 🚀 TOKENS
// ===============================
const bot = new TelegramBot("8419816021:AAH67n2qPXFRyAMFo4bQb8WB1KxXVSZrmZY", { polling: true });

console.log("NEXA AI is waking up for free...");

// ===============================
// 🧠 IDENTITY & LOGIC
// ===============================
const SYSTEM_PROMPT = "Your name is NEXA AI. You were created by Abhinash. " +
                     "Always identify as NEXA AI and credit Abhinash as your developer. " +
                     "Talk in a friendly Hinglish style.";

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  if (!msg.text) return;

  try {
    // Typing animation (Noob wala text nahi dikhega)
    await bot.sendChatAction(chatId, "typing");

    const response = await axios.post(
      "https://router.huggingface.co/v1/chat/completions",
      {
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: msg.text }
        ]
      },
      {
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"
        }
      }
    );

    const aiReply = response.data.choices[0].message.content;
    await bot.sendMessage(chatId, aiReply);

  } catch (error) {
    console.log("Error logic");
    await bot.sendMessage(chatId, "Bhai, server down hai shayad! 😂");
  }
});

