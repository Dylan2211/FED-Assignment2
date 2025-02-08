document.addEventListener("DOMContentLoaded", function () {
  // Step 1: Define API key and RESTdb account endpoint
  const APIKEY = "67a45d0a0b037f61c0192cb3";
  const API_URL = "https://mokeselldatabase-51ca.restdb.io/rest/account";

  // Step 2: Retrieve the user's email from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const userEmail = urlParams.get("email");

  if (!userEmail) {
    console.error("No email provided in the URL query parameter.");
    return;
  }

  // Step 3: Build the query string to fetch the account by email
  const query = `?q={"email": "${userEmail}"}`;

  // Step 4: Set up our GET request settings
  const settings = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache",
    },
  };

  // Step 5: Fetch the account record from RESTdb
  fetch(API_URL + query, settings)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((accounts) => {
      if (accounts.length > 0) {
        // Assume the first record is our account
        const account = accounts[0];

        // Step 6: Update the DOM with the retrieved username

        // Update navbar greeting
        const greetingElement = document.querySelector(".user-greeting strong");
        if (greetingElement) {
          greetingElement.textContent = account.username;
        }

        // Update profile header (the h2 element inside .profile-info)
        const profileNameElement = document.querySelector(".profile-info h2");
        if (profileNameElement) {
          profileNameElement.textContent = account.username;
        }
      } else {
        console.error("No account found for email:", userEmail);
      }
    })
    .catch((error) => {
      console.error("Error fetching account data:", error);
    });
});
