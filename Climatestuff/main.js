// Chatbot implementation with Node.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let chatHistory = [];

app.post('/chat', (req, res) => {
    const userMessage = req.body.message;
    chatHistory.push({ sender: 'user', message: userMessage });

    // Simple chatbot logic (This can be expanded with more complex logic)
    let botMessage = '';
    if (userMessage.toLowerCase().includes('climate change')) {
        botMessage = 'Climate change is a significant and lasting change in the statistical distribution of weather patterns over periods ranging from decades to millions of years.';
    } else if (userMessage.toLowerCase().includes('heat waves')) {
        botMessage = 'Heat waves are prolonged periods of excessively hot weather, which may be accompanied by high humidity. They can pose serious health risks and contribute to the spread of wildfires.';
    } else {
        botMessage = 'I am here to help you understand more about climate change and heat waves. Please ask me specific questions about these topics.';
    }

    chatHistory.push({ sender: 'bot', message: botMessage });
    res.json({ message: botMessage });
});

app.get('/chat-history', (req, res) => {
    res.json(chatHistory);
});

app.listen(port, () => {
    console.log(`Chatbot server running at http://localhost:${port}`);
});

// Front-end interaction
const chatForm = document.querySelector('#chat-form');
const chatInput = document.querySelector('#chat-input');
const chatMessages = document.querySelector('#chat-messages');

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = chatInput.value;
    chatMessages.innerHTML += `<div class="message user-message">${userMessage}</div>`;
    chatInput.value = '';

    const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();
    const botMessage = data.message;
    chatMessages.innerHTML += `<div class="message bot-message">${botMessage}</div>`;
});

document.addEventListener("DOMContentLoaded", function() {
    const chatbotButton = document.getElementById('chatbot-toggle-btn');
    const chatbotPopup = document.getElementById('chatbot-popup');
    const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotSendBtn = document.getElementById('chatbot-send-btn');

    // Toggle chatbot popup
    chatbotButton.addEventListener('click', function() {
        chatbotPopup.style.display = 'block';
    });

    // Close chatbot popup
    chatbotCloseBtn.addEventListener('click', function() {
        chatbotPopup.style.display = 'none';
    });

    // Handle user input
    chatbotSendBtn.addEventListener('click', function() {
        const userMessage = chatbotInput.value.trim();
        if (userMessage === '') return;

        displayUserMessage(userMessage);
        // Simulate bot response after a short delay
        setTimeout(() => {
            simulateBotResponse(userMessage);
        }, 500); // Simulate typing delay

        chatbotInput.value = '';
    });

    function displayBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chatbot-message', 'bot');
        messageElement.innerHTML = `<p>${message}</p>`;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function displayUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chatbot-message', 'user');
        messageElement.innerHTML = `<p>${message}</p>`;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function simulateBotResponse(message) {
        let response;
        if (message.toLowerCase().includes('climate') || message.toLowerCase().includes('change')) {
            response = "Climate change is a critical issue affecting our planet's ecosystems and weather patterns.";
        } else if (message.toLowerCase().includes('impact') || message.toLowerCase().includes('effects')) {
            response = "The impacts of climate change include rising sea levels, extreme weather events, and biodiversity loss.";
        } else if (message.toLowerCase().includes('solution') || message.toLowerCase().includes('mitigation')) {
            response = "Mitigating climate change requires reducing greenhouse gas emissions and adopting sustainable practices.";
        } else {
            response = "I'm sorry, I don't understand that. Please ask me something related to climate change.";
        }

        displayBotMessage(response);
    }
});
