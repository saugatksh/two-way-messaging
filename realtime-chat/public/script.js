document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    // Add a message to the chat box
    function addMessage(message, fromUser) {
        const messageElement = document.createElement('div');
        messageElement.className = fromUser ? 'message user' : 'message other';
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
    }

    // Listen for messages from the server
    socket.on('receiveMessage', (message) => {
        addMessage(message, false); // Message from others
    });

    // Send a message
    function handleSendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, true); // User message
            socket.emit('sendMessage', message);
            messageInput.value = '';
        }
    }

    // Handle send button click
    sendButton.addEventListener('click', handleSendMessage);

    // Handle Enter key press
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    });
});
