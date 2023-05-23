require('dotenv').config();
const express = require('express');
const axios = require('axios');
const tmp = require('tmp');
const fs = require('fs');
const app = express();

app.use(express.json());

app.post('/chat', async (req, res) => {
    const prompt = req.body.prompt;

    // Generate GPT-4 response
    const gpt4Response = await axios.post('https://api.openai.com/v1/completions', {
        model: "gpt-3.5-turbo",
        messages: [
            {role: "system", content: "You are a helpful assistant on a conversation. Answer should be not too long. Be ironic and acid."},
            {role: "user", content: prompt}
        ],
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        }
    });
    
    const gpt4Text = gpt4Response.data.choices[0].message.content;

    // Convert text to speech
    const ttsResponse = await axios.post(`https://api.elevenlabs.io/v1/text-to-speech/${process.env.VOICE_ID}`, {
        text: gpt4Text,
        model_id : "eleven_multilingual_v1",
        voice_settings: {
            "stability": 0.4,
            "similarity_boost": 1.0
        }
    }, {
        headers: {
            'xi-api-key': process.env.ELEVEN_API_KEY,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg'
        },
        responseType: 'arraybuffer'
    });
    
    const tmpobj = tmp.fileSync({ postfix: '.mp3' });
    fs.writeFileSync(tmpobj.name, ttsResponse.data);
    
    res.download(tmpobj.name, 'response.mp3');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
