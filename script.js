// AI Chatbot with ChatGPT Integration
let chatOpen = false;
const API_KEY = 'YOUR_OPENAI_API_KEY_HERE'; // Replace with your actual API key (keep secret!)

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
        // Call ChatGPT API
        getChatGPTResponse(message);
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

async function getChatGPTResponse(userMessage) {
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {  // Free GPT-like model
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${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}`,  // Use Hugging Face token here
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: {
                    past_user_inputs: [],  // For conversation history (optional)
                    generated_responses: [],
                    text: userMessage
                },
                parameters: { max_length: 100, temperature: 0.7 }
            })
        });
        const data = await response.json();
        if (data && data.generated_text) {
            addMessage('AI Assistant: ' + data.generated_text, 'ai');
        } else {
            addMessage('AI Assistant: Sorry, I couldn\'t process that. Try again!', 'ai');
        }
    } catch (error) {
        console.error('Error:', error);
        addMessage('AI Assistant: Error connecting to AI. Check your token or try later.', 'ai');
    }
}// Login Protection Logic
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    } else {
        document.getElementById('auth-section').style.display = 'block';
        document.getElementById('main-content').style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    checkLoginStatus();
}

// Call on page load
window.onload = checkLoginStatus;

// Update login to set status
document.getElementById('login').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        document.getElementById('login-message').textContent = 'Login successful! Welcome, ' + user.name + '.';
        checkLoginStatus(); // Show main content
    } else {
        document.getElementById('login-message').textContent = 'Invalid email or password.';
    }
});

// Update signup to set status after signup
document.getElementById('signup').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    if (password !== confirm) {
        document.getElementById('signup-message').textContent = 'Passwords do not match.';
        return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
        document.getElementById('signup-message').textContent = 'Email already registered.';
        return;
    }
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('isLoggedIn', 'true'); // Auto-login after signup
    document.getElementById('signup-message').textContent = 'Signup successful! Logging you in...';
    checkLoginStatus(); // Show main content
});
