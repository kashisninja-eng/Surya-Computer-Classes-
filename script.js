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

});// Login/Signup Functionality (Demo with localStorage)
document.getElementById('login').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        document.getElementById('login-message').textContent = 'Login successful! Welcome, ' + user.name + '.';
        // Redirect or show dashboard (for demo, just message)
    } else {
        document.getElementById('login-message').textContent = 'Invalid email or password.';
    }
});

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
    document.getElementById('signup-message').textContent = 'Signup successful! You can now login.';
});

