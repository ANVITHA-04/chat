// Connect to backend socket.io
const socket = io();

// DOM elements
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Send message on button click
sendBtn.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    socket.emit("chatMessage", input.value);
    input.value = "";
  }
});

// Send on Enter key
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

// Receive messages from server
socket.on("chatMessage", (msg) => {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.textContent = msg;
  messagesDiv.appendChild(messageDiv);

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
