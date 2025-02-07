// login_app.js

// Replace with your actual API key and account endpoint from restdb.io
const API_KEY = "67a45d0a0b037f61c0192cb3";
const API_URL = "https://mokeselldatabase-51ca.restdb.io/rest/account";

document.addEventListener("DOMContentLoaded", function () {
  // Attach listener to the login form's submit event
  document
    .getElementById("login-form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      // Retrieve the email and password entered by the user
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const statusDiv = document.getElementById("login-status");

      try {
        // [STEP 1]: Query the database for an account with the provided email
        const getSettings = {
          method: "GET",
          headers: {
            "x-apikey": API_KEY,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
        };

        const response = await fetch(
          `${API_URL}?q={"email": "${email}"}`,
          getSettings
        );
        const accounts = await response.json();

        // [STEP 2]: Check if an account exists with that email
        if (accounts.length === 0) {
          statusDiv.textContent = "Account not found.";
          statusDiv.style.color = "red";
          return;
        }

        const account = accounts[0];

        // [STEP 3]: Compare the provided password (plaintext demo only)
        if (account.password !== password) {
          statusDiv.textContent = "Invalid password.";
          statusDiv.style.color = "red";
          return;
        }

        // [STEP 4]: Login successful. Update status, and redirect.
        statusDiv.style.color = "green";
        statusDiv.textContent = "Login successful! Redirecting...";

        // Redirect to the Lottie animation page.
        setTimeout(() => {
          window.location.href = "redirect.html";
        }, 2000);
      } catch (error) {
        console.error("Login error:", error);
        statusDiv.textContent =
          "An error occurred during login: " + error.message;
        statusDiv.style.color = "red";
      }
    });
});
