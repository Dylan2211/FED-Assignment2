// Get form elements
const form = document.getElementById("signup-form");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const passwordError = document.getElementById("password-error");

// RESTdb configuration
const API_KEY = "67a45d0a0b037f61c0192cb3";
const API_URL = "https://mokeselldatabase-51ca.restdb.io/rest/account";

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Check if passwords match
  if (passwordInput.value !== confirmPasswordInput.value) {
    passwordError.style.display = "block"; // Show error message
    confirmPasswordInput.focus(); // Focus on the confirm password field
    return;
  } else {
    passwordError.style.display = "none"; // Hide error message
  }

  // Retrieve user data from the form
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value; // For demo purposes, we're using plaintext

  // Create the JSON data object for RESTdb
  const jsondata = {
    username: username,
    email: email,
    password: password,
  };

  // Prepare the settings for the POST request
  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": API_KEY,
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify(jsondata),
  };

  try {
    // Send the POST request to create the new account in RESTdb
    const response = await fetch(API_URL, settings);

    if (!response.ok) {
      throw new Error("Failed to create account. Please try again.");
    }

    const data = await response.json();
    console.log("Account created:", data);

    // Provide feedback to the user and redirect to profile.html after 2 seconds
    alert("Account created successfully! Redirecting to your profile...");
    setTimeout(() => {
      window.location.href = "profile.html";
    }, 2000);
  } catch (error) {
    console.error("Signup error:", error);
    alert("An error occurred during account creation: " + error.message);
  }
});

