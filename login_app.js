// Replace with your actual API key from restdb.io
const API_KEY = "67a45d0a0b037f61c0192cb3";
const API_URL = "https://mokeselldatabase-51ca.restdb.io/rest/account";

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const statusDiv = document.getElementById("login-status");

  try {
    // Query the database for an account with the given email
    const response = await fetch(`${API_URL}?q={"email": "${email}"}`, {
      method: "GET",
      headers: {
        "x-apikey": API_KEY,
        "Content-Type": "application/json",
      },
    });
    const accounts = await response.json();

    // Check if account exists
    if (accounts.length === 0) {
      statusDiv.textContent = "Account not found.";
      statusDiv.style.color = "red";
      return;
    }

    const account = accounts[0];

    // IMPORTANT: This example uses plaintext password comparison.
    // In production, NEVER store or compare plaintext passwords.
    if (account.password === password) {
      // Prepare the updated account data.
      // Here we update (or add) a field called "lastLogin" with the current timestamp.
      const updatedAccount = {
        ...account,
        lastLogin: new Date().toISOString(),
      };

      // Use PUT to update the account record on RESTdb.
      const putResponse = await fetch(`${API_URL}/${account._id}`, {
        method: "PUT",
        headers: {
          "x-apikey": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAccount),
      });

      if (!putResponse.ok) {
        throw new Error("Failed to update account information on the server.");
      }

      statusDiv.style.color = "green";
      statusDiv.textContent = "Login successful! Redirecting...";
      setTimeout(() => {
        window.location.href = "profile.html";
      }, 1000);
    } else {
      statusDiv.textContent = "Invalid password.";
      statusDiv.style.color = "red";
    }
  } catch (error) {
    console.error("Login error:", error);
    statusDiv.textContent = "An error occurred during login: " + error.message;
    statusDiv.style.color = "red";
  }
});
