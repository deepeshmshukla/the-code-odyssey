// Get references to the input field, send button, and messages container
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const messagesContainer = document.getElementById('messages');

// Function to send the message
function sendMessage() {
  const messageText = messageInput.value.trim();

  if (messageText !== "") {
    // Display user's message
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user');
    userMessage.textContent = messageText;
    messagesContainer.appendChild(userMessage);

    // Clear the input field
    messageInput.value = "";

    // Scroll to the bottom of the chat
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Send message to AI API
    fetchAIResponse(messageText);
  }
}

// Listen for send button click
sendBtn.addEventListener('click', sendMessage);

// Optionally, allow sending the message by pressing Enter
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Function to fetch the AI response
async function fetchAIResponse(userMessage) {
  const apiUrl = "https://api.openai.com/v1/completions";  // OpenAI API endpoint
  const apiKey = "YOUR_OPENAI_API_KEY";  // Replace with your OpenAI API key

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };

  const data = {
    model: "text-davinci-003",  // You can use other models like gpt-3.5-turbo
    prompt: userMessage,
    max_tokens: 150,
    temperature: 0.7,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    const result = await response.json();
    const aiMessage = result.choices[0].text.trim();

    // Display AI's response
    const aiMessageDiv = document.createElement('div');
    aiMessageDiv.classList.add('message', 'ai');
    aiMessageDiv.textContent = aiMessage;
    messagesContainer.appendChild(aiMessageDiv);

    // Scroll to the bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

  } catch (error) {
    console.error('Error fetching AI response:', error);
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('message', 'ai');
    errorMessage.textContent = "Sorry, something went wrong. Please try again later.";
    messagesContainer.appendChild(errorMessage);
  }
}
