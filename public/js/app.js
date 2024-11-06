let token = '';

async function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Registration successful! Please login.');
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        alert('Error during registration');
    }
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            token = data.token;
            document.getElementById('auth-section').classList.add('hidden');
            document.getElementById('chat-section').classList.remove('hidden');
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        alert('Error during login');
    }
}

async function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value;
    if (!message) return;

    // Add user message to chat
    addMessageToChat('You', message);
    messageInput.value = '';

    try {
        const response = await fetch('http://localhost:3000/chat/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        if (response.ok) {
            addMessageToChat('AI', data.response);
        } else {
            alert(data.message || 'Failed to send message');
        }
    } catch (error) {
        alert('Error sending message');
    }
}

function addMessageToChat(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'p-3 rounded ' + 
        (sender === 'You' ? 'bg-blue-100 ml-8' : 'bg-gray-100 mr-8');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}