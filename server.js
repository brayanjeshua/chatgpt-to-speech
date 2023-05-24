require("dotenv").config();
const express = require("express");
const axios = require("axios");
const tmp = require("tmp");
const fs = require("fs");
const app = express();

app.use(express.json());

app.post("/chat", async (req, res) => {
  const prompt = req.body.prompt;
  const modality = req.body.modality;
  const temperature = req.body.temperature;

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
  };

  const data = {
    model: String(process.env.CHATGPT_MODEL),
    temperature: Number(temperature),
    messages: [
      { role: "system", content: String(modality) },
      { role: "user", content: String(prompt) },
    ],
  };

  const gptResponse = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    data,
    { headers }
  );

  console.log("GPT Response", gptResponse.data);

  const gpt4Text = gptResponse.data.choices[0].message.content;

  // Convert text to speech
  const ttsResponse = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${process.env.VOICE_ID}`,
    {
      text: gpt4Text,
      model_id: "eleven_multilingual_v1",
      voice_settings: {
        stability: 0.4,
        similarity_boost: 1.0,
      },
    },
    {
      headers: {
        "xi-api-key": process.env.ELEVEN_API_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      responseType: "arraybuffer",
    }
  );

  console.log("TTS Response", ttsResponse);

  const tmpobj = tmp.fileSync({ postfix: ".mp3" });
  fs.writeFileSync(tmpobj.name, ttsResponse.data);

  res.download(tmpobj.name, "response.mp3");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
