// Basic interactivity: Alert on form submit
document.querySelector('form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    // AI Chatbot Functionality
let chatOpen = false;

function toggleChat() {
    const window = document.getElementById('chat-window');
    chatOpen = !chatOpen;
    window.style.display = chatOpen ? 'block' : 'none';
    if (chatOpen) {
        addMessage('AI Assistant: Hello! Ask me anything about the ADCA course.', 'ai');
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message) {
        addMessage('You: ' + message, 'user');
        input.value = '';
        // Simulate AI response
        setTimeout(() => {
            const response = getAIResponse(message);
            addMessage('AI Assistant: ' + response, 'ai');
        }, 1000);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function addMessage(text, sender) {
    const messages = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.textContent = text;
    msgDiv.className = sender;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
}

function getAIResponse(message) {
    const responses = {
        'what is adca': 'ADCA stands for Advanced Diploma in Computer Applications. It covers programming, databases, and more!',
        'how to enroll': 'Contact us at info@adcacourse.com or call +1-234-567-890 to enroll.',
        'course duration': 'The course lasts 6-12 months, depending on your pace.',
        'features': 'Includes Python, Java, SQL, web dev, and AI modules.',
        'default': 'I\'m here to help with ADCA course info. Try asking about enrollment or features!'
    };
    const key = message.toLowerCase();
    return responses[key] || responses['default'];
}
    alert('Message sent! (Note: This is a demo; integrate with a backend for real sending.)');

});
