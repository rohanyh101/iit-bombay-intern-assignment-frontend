const apiBase = "http://localhost:8080"; // Backend API Base URL

// Login Function
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${apiBase}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.role);
      window.location.href = "dashboard.html";
    } else {
      alert(result.error);
    }
  });

// Sign Up Function
document
  .getElementById("signupForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;
    const role = document.getElementById("role").value;

    const response = await fetch(`${apiBase}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: newUsername,
        password: newPassword,
        role,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Sign up successful! Please login.");
    } else {
      alert(result.error);
    }
  });

// Dashboard Logic
if (window.location.pathname.includes("dashboard.html")) {
  const role = localStorage.getItem("role");
  const welcomeMessage = `Welcome, ${role}!`;
  document.getElementById("welcomeMessage").textContent = welcomeMessage;

  if (role === "LIBRARIAN") {
    document.getElementById("librarianSection").style.display = "block";
  } else if (role === "MEMBER") {
    document.getElementById("memberSection").style.display = "block";
  }
}

// View Books (Both Member and Librarian)
async function viewBooks() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${apiBase}/books`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const books = await response.json();
  console.log("Books:", books);
}

// Add Book (Librarian Only)
async function addBook() {
  const title = prompt("Enter book title:");
  const author = prompt("Enter book author:");
  const token = localStorage.getItem("token");

  const response = await fetch(`${apiBase}/books`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, author }),
  });

  const result = await response.json();
  if (response.ok) {
    alert("Book added successfully!");
  } else {
    alert(result.error);
  }
}

// View Members (Librarian Only)
async function viewMembers() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${apiBase}/members`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const members = await response.json();
  console.log("Members:", members);
}

// Logout
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
