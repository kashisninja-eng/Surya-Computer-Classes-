// Login Protection
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const authOverlay = document.getElementById('auth-overlay');
const mainContent = document.getElementById('main-content');

function checkAuth() {
    if (isLoggedIn) {
        authOverlay.style.display = 'none';
        mainContent.style.display = 'block';
    } else {
        authOverlay.style.display = 'flex';
        mainContent.style.display = 'none';
    }
}

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        checkAuth();
    } else {
        document.getElementById('auth-message').textContent = 'Invalid credentials';
    }
});

document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    checkAuth();
});

document.getElementById('logout-btn').addEventListener('click', () => {
    isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    checkAuth();
});

checkAuth(); // Initial check

// AI Chatbot
let chatOpen = false;
let conversationHistory = [];

function toggleChat() {
    const window = document.getElementById('chat-window');
    chatOpen = !chatOpen;
    window.style.display = chatOpen ? 'block' : 'none';
    if (chatOpen) {
        addMessage('AI Assistant: Hello! Ask about ADCA.', 'ai');
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim().toLowerCase();
    if (message) {
        addMessage('You: ' + input.value, 'user');
        conversationHistory.push('User: ' + input.value);
        input.value = '';
        const response = getAIResponse(message);
        setTimeout(() => {
            addMessage('AI Assistant: ' + response, 'ai');
            conversationHistory.push('AI: ' + response);
        }, 500);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') sendMessage();
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
        'hello': 'Hi! How can I help with ADCA?',
        'what is adca': 'ADCA is Advanced Diploma in Computer Applications.',
        'enroll': 'Contact us to enroll!',
        'default': 'Ask about features or contact.'
    };
    for (let key in responses) {
        if (message.includes(key)) return responses[key];
    }
    return responses['default'];
}

// AI Tools
function generateQuiz() {
    const quiz = '<h3>AI Quiz: What is Python?</h3><p>A) Snake B) Language C) Food</p><p>Answer: B</p>';
    document.getElementById('quiz-output').innerHTML = quiz;
}

function suggestImage() {
    const suggestion = 'AI Suggestion: A computer with code on screen.';
    document.getElementById('image-suggestion').innerHTML = `<p>${suggestion}</p>`;
}

// Contact Form
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! (Demo)');
});
