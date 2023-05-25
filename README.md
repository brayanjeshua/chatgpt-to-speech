# 🗣️ GPT-4 Text-to-Speech Application

This is an interactive application that uses the OpenAI API to generate responses from GPT-4, and then converts them to speech using the Eleven Labs API. 🎙️

## 🛠️ Prerequisites

You will need the following tools installed:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)

And you'll also need API keys for the following services:

- [OpenAI](https://beta.openai.com/)
- [Eleven Labs](https://www.elevenlabs.ai/)

## 🚀 Getting Started

Follow these steps to get the app up and running! 🏃‍♀️

### 1️⃣ Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/brayanjeshua/chatgpt-to-speech.git
cd chatgpt-to-speech
```

2️⃣ Install Dependencies
Install the necessary dependencies:

```bash
npm install
```

3️⃣ Configure Environment Variables
Create a .env file in the project root and populate it with your API keys:

```bash
touch .env
```

Then, open the .env file and add the following, replacing your_key_here with your actual keys:

.env
```bash
OPENAI_API_KEY=your_key_here
ELEVEN_API_KEY=your_key_here
VOICE_ID=your_voice_id_here
CHATGPT_MODEL=your_model_here
```
4️⃣ Run the Application
Start your application:

```bash
node server.js
```

The server is now running at http://localhost:3000 🎉

You can now send a POST request to http://localhost:3000/chat with a JSON body containing a 'prompt' key. The server will return an audio file containing the AI's response!

Additionally you can set the temperature and the modality

5️⃣ Example:
You can use curl to test the API:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"modality":"Be ironic and acid in a short response", "prompt":"Hello, world!", "temperature":0.9 }' http://localhost:3000/chat --output response.mp3
```

This command will download a response.mp3 file with the response from GPT-4 converted to speech! 🗣️🎶
