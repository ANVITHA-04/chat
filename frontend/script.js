// Connect frontend to backend (backend runs on port 8080)
fetch("http://localhost:8080/")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("status").textContent = data;
  })
  .catch((err) => {
    document.getElementById("status").textContent =
      "⚠️ Unable to connect to backend!";
  });
