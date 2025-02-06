// Retrieve user data from localStorage (or sessionStorage)
const username = localStorage.getItem("username") || "[Username]";
const email = localStorage.getItem("email") || "[Email]";

// Display user data on the profile page
document.getElementById("profile-username").textContent = username;
document.getElementById("profile-email").textContent = email;