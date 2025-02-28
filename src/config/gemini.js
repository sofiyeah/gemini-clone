// node --version # Should be >= 18
// npm install @google/generative-ai
import axios from 'axios';
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai"

const MODEL_NAME = import.meta.env.VITE_REACT_APP_MODEL_NAME;

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

async function runChat(prompt, setLoading, setResultData) {
    
    const url = "http://192.168.1.37:8080/api/" + prompt;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
        console.log("Event Source Message: ", typeof(event.data));
        setLoading(false);
        setResultData(event.data);
    }

    eventSource.onerror = (error) => {
        console.error("Event Source Failed: ", error);
        eventSource.close();
    }

    return "";
}
// async function runChatOld(prompt) {
//     const genAI = new GoogleGenerativeAI(API_KEY);
//     const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//     const generationConfig = {
//         temperature: 0.9,
//         topK: 1,
//         topP: 1,
//         maxOutputTokens: 2048,
//     };

//     const safetySettings = [
//         {
//             category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//             threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//         },
//         {
//             category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//             threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//         },
//         {
//             category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//             threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//         },
//         {
//             category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//             threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//         },
//     ];

//     const chat = model.startChat({
//         generationConfig,
//         safetySettings,
//         history: [
//         ],
//     });

//     const result = await chat.sendMessage(prompt);
//     const response = result.response;
//     return response.text();
// }

export default runChat;
